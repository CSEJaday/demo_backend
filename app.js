require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
  
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("could not connect ot mongodb...", err));

const testSchema = new mongoose.Schema({
    name:String,
    rating:Number,
    date:String,
    text:String
});

const Testimonial = mongoose.model("Testimonial", testSchema);

  let testimonials =

  [
    {
      "id": 1,
      "name": "Hannah Kennedy",
      "rating": 5,
      "date": "June 9, 2025",
      "text": "Excellent service, reasonable prices and courteous crew! Definitely recommend."
    },
  ]

const getTestimonialId = (t) => t.id || t._id;

app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await Testimonial.find();
      res.send(testimonials);
    } catch (err) {
      console.error("GET /api/testimonials failed:", err);
      res.status(500).send("Server error getting testimonials");
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
  
      if (!testimonial) {
        return res.status(404).send("Testimonial not found");
      }
  
      res.send(testimonial);
    } catch (err) {
      console.error("GET /api/testimonials/:id failed:", err);
      res.status(500).send("Server error getting testimonial");
    }
  });

app.post("/api/testimonials", async (req,res)=>{
    console.log("In post request");
    const result = validateTestimonial(req.body);

    if(result.error){
        //console.log("Error in validation");
        return res.status(400).send(result.error.details[0].message);
    }
    //console.log("Passed Validation!");

    const testimonial = new Testimonial ({
        name: req.body.name,
        rating: Number(req.body.rating),
        date: req.body.date,
        text: req.body.text
    });

    const newTestimonial = await testimonial.save();
    res.status(201).send(newTestimonial);
});

app.put("/api/testimonials/:id", async (req, res) => {
    const result = validateTestimonial(req.body);

    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const fieldsToUpdate = {
      name: req.body.name,
      rating: Number(req.body.rating),
      date: req.body.date,
      text: req.body.text
    };

    const success = await Testimonial.updateOne({_id:req.params.id}, fieldsToUpdate);
    if(!success) {
        res.status(404).send("We couldnt find the review");
    } else {
        const testimonial = await Testimonial.findById(req.params.id);
        res.status(200).send(testimonial);
    }
});
  
  app.delete("/api/testimonials/:id", async(req, res) => {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
   
    if (!testimonial) {
      return res.status(404).send("Testimonial not found");
    }
  
    res.status(200).send(testimonial);
  });

const validateTestimonial = (testimonial) => {
    const schema = Joi.object({
        id: Joi.allow(""),
        name:Joi.string().min(3).required(),
        rating:Joi.number().min(0).max(5).required(),
        date:Joi.string().required(),
        text:Joi.string().required()
    });

    return schema.validate(testimonial);
};
//listen for incoming requests

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log("Server is up and running");
});

let tents =
[
    {
        "_id": 1,
        "title": "Weddings",
        "category": "Weddings",
        "featured": true,
        "img_name": "images/weddingeventpic.jpg"
    },
    {
        "_id": 2,
        "title": "Sport Events",
        "category": "Sport Events",
        "featured": true,
        "img_name": "images/sportingeventpic.png"
    },
    {
        "_id": 3,
        "title": "Corporate Events",
        "category": "Corporate",
        "featured": true,
        "img_name": "images/corpeventpic.jpg"
    },
    {
        "_id": 4,
        "title": "40' x 60' Wedding Tent",
        "sub-title": "Spacious and elegant, perfect for your special day. Includes setup with lighting, tables and chairs available.",
        "category": "Weddings",
        "startingPrice": 1200,
        "dimensions": "40 feet by 60 feet",
        "capacity": "Up to 200 guests",
        "materials": "High-peak farme tent, white fabric",
        "description": "Our 40’ x 60’ wedding tent can accommodate up to 200 guests, providing an ideal space for ceremony, receptions and celebrations. Enjoy the peace of mind with our full set up lighting, tables, and chairs, ensuring a beautiful and stress-free experience for your special day.",
        "extraFeeServices": "Lighting, tables, chairs",
        "img_name": "images/weddingpic.png"
    },
    {
        "_id": 5,
        "title": "60' x 100' Festival Tent",
        "category": "Sport Events",
        "startingPrice": 2500,
        "dimensions": "60 feet by 100 feet",
        "capacity": "Up to 600 guests",
        "materials": "Pole tent, heavy-duty fabric",
        "description": "Large tent suited for sporting events, expos, and festivals.",
        "extraFeeServices": "Staging, portable restrooms, security anchors",
        "img_name": "images/sportingeventpic.png"
    },
    {
        "_id": 6,
        "title": "40' x 80' Reception Tent",
        "category": "Corporate",
        "startingPrice": 1600,
        "dimensions": "40 feet by 80 feet",
        "capacity": "Up to 300 guests",
        "materials": "High-peak frame tent",
        "description": "Elegant setup for corporate dinners, awards, and gatherings.",
        "extraFeeServices": "AV package, carpeting",
        "img_name": "images/corpeventpic.jpg"
    },
    {
        "_id": 7,
        "title": "Corporate Event Tent - 30' x 40' Frame Tent",
        "sub-title": "Ideal for business functions, company picnics and more.",
        "category": "Corporate",
        "startingPrice": 2500,
        "dimensions": "30 feet by 40 feet",
        "capacity": "Up to 120 guests",
        "materials": "Frame tent, white fabric",
        "description": "Our 30’ x 40’ frame tent is perfect for corporate gatherings, company picnics, and other business functions. It can comfortably accommodate up to 120 guests, offering a professional and elegant space for your event.",
        "extraFeeServices": "Tables, chairs, lighting",
        "img_name": "images/corporateeventpic.png"
    },
    {
        "_id": 8,
        "title": "Wedding Rentals",
        "category": "Wedding",
        "description": "Make your special day unforgettable with our gorgeous wedding tents.",
        "img_name": "images/weddingeventpic.png"
    },
    {
        "_id": 9,
        "title": "Corporate Event Rentals",
        "category": "Corporate",
        "description": "Perfect for corporate gatherings, company pick-nicks, and other business functions.",
        "img_name": "images/corporateeventpic.png"
    },
    {
        "_id": 10,
        "title": "Festival & Sport Event Tents",
        "category": "Festival & Sports",
        "description": "Ideal for festivals, fairs, sports tournaments, and other large outdoor gatherings.",
        "img_name": "images/sportingeventpic.png"
    }

]

app.get("/api/tents", (req,res)=>{
    res.send(tents)
});

app.get("/api/tent/:_id", (req,res)=>{
    const tent =tents.find((t)=>t._id===parseInt(req.params._id));
    res.send(tent);
});

let aboutCards =
{
    "aboutCards": [
        {
            "id": 1,
            "title": "Who are we?",
            "image": "images/Working man 1.png",
            "text": "We are a team of tent providers, originally from South Carolina. We started our business in 2024!"
        },
        {
            "id": 2,
            "title": "Why choose MVP Tents",
            "image": "images/People Talking 2.png",
            "text": "We have top quality and elegant tents, our customer service is like no other, and we have options to fit your needs!"
        }
    ],
    "owners": [
        {
            "id": 1,
            "name": "David Griffin",
            "role": "Owner & Operations Director",
            "photo": "images/davidgriffin.png",
            "bio": "Dave handles quotes and leads the tent setup. Dave also has 3+ years in event layout planning — he makes sure every tent is perfect.",
            "email": "dave@example.com"
        },
        {
            "id": 2,
            "name": "Jack Simpson",
            "role": "Owner & Operations Director",
            "photo": "images/Family pic.png",
            "bio": "Jack handles quotes and tent setup. With 3+ years in event planning, he makes sure every tent is perfect.",
            "email": "jack@example.com"
        }
    ],
    "quoteText": "Our mission is to make your outdoor event truly special and stress-free, with a beautiful tent that exceeds your expectations."
}

app.get("/api/aboutCards", (req,res)=>{
    res.send(aboutCards)
});

app.get("/api/aboutCards/:id", (req,res)=>{
    const aboutCard = aboutCards.aboutCards.find((t)=>t.id===parseInt(req.params.id));
    res.send(aboutCard);
});