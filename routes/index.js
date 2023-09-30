var express = require('express');
var router = express.Router();

const db = [
  {
    // count: 1,
    img:'https://m.media-amazon.com/images/I/71reBu3iJ6L._AC_UF1000,1000_QL80_.jpg',
    heading:'English Book',
    para:'Best book to Learning .',
  },
  {
    // count: 2,
    img:'https://quotationwalls.com/img/motivational/work-sweat-achieve-wallpaper.jpg',
    heading:'Motivational Book',
    para:'Stay Motivated',
  }
  
]

const User = require('../models/userModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

// sign-up

router.get('/sign-up', function(req,res,next){
  res.render('sign-up',{
    title: 'sign up',
  }
  )
})


router.post('/sign-up', async function(req,res,next){
  try {
    const newuser = new User(req.body)
    await newuser.save()
    res.redirect('/sign-in')
  } catch (error) {
    res.send(error)
  }

})

// sign-in

router.get('/sign-in', function(req,res,next){
  res.render('sign-in',{
    title: 'sign in',
  }
  )
})

router.post('/sign-in', async function (req,res,next) {
  try {
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    if (user === null) {
      return res.send(`invalid user <a href='/sign-in'>sign-in</a>`)
    }
    if (password !== user.password) {
      return res.send(`invalid password <a href='/sign-in'>sign-in</a>`)
    }
    res.redirect('/profile')
  } catch (error) {
    res.send(error)
  }
})

// profile

router.get('/profile', async function (req,res,next){
try {
  const user = await User.find()
  res.render('profile',{
    title:"profile",
    users:user,
    posts:db
  })
} catch (error) {
  res.send(error)
}
})

// update

router.get('/update/:id', async function(req,res,next){
  try {
    const users = await User.findById(req.params.id)
    res.render('update',{
      title:"update",
      user:users
    })
  } catch (error) {
    res.send(error)
  }
})

router.post('/update/:id', async function(req,res,next){
  try {
    await User.findByIdAndUpdate(req.params.id , req.body)
    res.redirect('/profile')
  } catch (error) {
    res.send(error)
  }
})

// delete

router.get('/delete/:id', async function(req,res,next){
  try {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/profile')
  } catch (error) {
    res.send(error)
  }
})

// get-email


router.get('/get-email', function(req,res,next){
  res.render('get-email',{
    title: 'forget password',
  }
  )
})

router.post('/get-email', async function(req,res,next){
  try {
    const {username,email} = req.body
    const user = await User.findOne({email:email})
    if (user === null) {
      return res.send(`invalid user <a href='/get-email'>forget password</a>`)
    }
    res.redirect('/create/'+ user._id)
  } catch (error) {
    res.send(error)
  }

})

// create

router.get('/create/:id', async function(req,res,next){
 try {
  res.render('create',{
    title: 'create passowrd',
    id: req.params.id
  }
  )
 } catch (error) {
  res.send(error)
 }
})

router.post('/create/:id', async function(req,res,next){
  try {
    await User.findByIdAndUpdate(req.params.id , req.body)
    res.redirect('/sign-in')
  } catch (error) {
    res.send(error)
  }
})

// reset

router.get('/reset/:id', async function(req,res,next){
  try {
   res.render('reset',{
     title: 'reset passowrd',
     id: req.params.id
   }
   )
  } catch (error) {
   res.send(error)
  }
 })

 router.post('/reset/:id', async function(req,res,next){
  try {
    const {oldpassword,password} = req.body
    const user = await User.findById(req.params.id)
    if (oldpassword !== user.password) {
      return res.send(`invalid user <a href='/reset/${user._id}'>reset password</a>`)
    }
   
    await User.findByIdAndUpdate(req.params.id , req.body)
    res.redirect('/sign-in')
  } catch (error) {
    res.send(error)
  }

})

// create-task

router.get('/create-task', function(req,res,next){
  res.render('create-task',{
    title: 'create',
  }
  )
})

router.post('/create-task', function(req,res,next){
  db.push(req.body)
  res.redirect('/profile')
})

// delete

router.get('/delete-task/:index', function (req,res,next) {
    db.splice(req.params.index,1)
    res.redirect('/profile')
})

// update

router.get('/update-task/:index', function(req,res,next){

  res.render('update-task',{
    title: 'update-task',
    post: db[req.params.index],
    index:req.params.index
  }
  )
})

router.post('/update-task/:index', function(req,res,next){
   db[req.params.index] = req.body
   res.redirect('/profile')
})




module.exports = router;
