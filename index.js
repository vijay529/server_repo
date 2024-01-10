import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Meme from './model.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

const mongodb = process.env.MONGO

const connect = async()=>{
    try {
        await mongoose.connect(`${mongodb}`);
        console.log('db connected');
    } catch (error) {
        console.log('error in connecting to db');
    }
}

mongoose.connection.on('disconnected', ()=>{
    console.log('disconnected from db');
})

app.use(express.json());
app.use(cors({}));

app.use('/upload', async(req, res, next)=>{

  const meme = new Meme(req.body);
  try {
      const savedMeme = await meme.save();    
      res.status(200).json({ message: 'meme saved successfully!', 'meme':savedMeme});
      next();
  } catch (error) {
    console.log(error)
  }
});

app.listen(5100, ()=>{
    connect();
    console.log('server running at port 5100');
})