const express=require('express');
const mongoose =require('mongoose');
const shortUrl = require('./models/shortUrl');
const ShortUrl=require('./models/shortUrl');
const app=express();


mongoose
  .connect(
    'mongodb+srv://vasu786beri:lbXqWT3vEBt9MT21@cluster0.jkylfad.mongodb.net/',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('MongoDb is connected'))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.get('/',async (req,res)=>{
    const shortUrls=await shortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})
app.post('/shortUrls',async (req,res)=>{
shortUrl.create({full:req.body.fullUrl})
await ShortUrl.create({full:req.body.fullUrl})
res.redirect('/')
})
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
app.listen(process.env.PORT ||5001);