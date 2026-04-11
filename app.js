const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
  
  /*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });*/

  /*const validateTestimonial = (testimonial) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      rating: Joi.number().min(0).max(5).required(),
      date: Joi.string().required(),
      text: Joi.string().min(1).required()
    });
  
    return schema.validate(testimonial);
  };*/

  let testimonials =

  [
    {
      "id": 1,
      "name": "Hannah Kennedy",
      "rating": 5,
      "date": "June 9, 2025",
      "text": "Excellent service, reasonable prices and courteous crew! Definitely recommend."
    },
    {
      "id": 2,
      "name": "Randy Brown",
      "rating": 5,
      "date": "July 4, 2024",
      "text": "Thank you for helping make our event a success. Quality service and product!"
    },
    {
      "id": 3,
      "name": "James Rice",
      "rating": 5,
      "date": "May 15, 2025",
      "text": "Very professional and punctual. The tent setup was flawless and exactly what we asked for."
    },
    {
      "id": 4,
      "name": "Tim Lance",
      "rating": 5,
      "date": "June 9, 2025",
      "text": "Excellent service, reasonable prices and courteous crew! Definitely recommend."
    },
    {
      "id": 5,
      "name": "Sam Truth",
      "rating": 5,
      "date": "August 1, 2024",
      "text": "Great communication and a smooth setup. Our guests loved the space."
    },
    {
      "id": 6,
      "name": "Alyssa Moore",
      "rating": 5,
      "date": "September 20, 2024",
      "text": "Highly recommend MVP Tents — friendly crew, clean equipment, and on-time delivery."
    }
  ]

app.get("/api/testimonials", (req,res)=>{
    res.send(testimonials)
});

app.get("/api/testimonials/:id", (req,res)=>{
    const testimonial =testimonials.find((t)=>t.id===parseInt(req.params.id));
    res.send(testimonial);
});

app.post("/api/testimonials", (req,res)=>{
    console.log("In post request");
    console.log(req.body);
    const result = validateTestimonial(req.body);

    if(result.error){
        console.log("Error in validation");
        res.status(400).send(result.error.details[0].message);
        return;
    }
    console.log("Passed Validation!");

    const testimonial = {
        _id: testimonials.length + 1,
        name:req.body.name,
        rating:Number(req.body.rating),
        date:req.body.date,
        text:req.body.text
    };

    testimonials.push(testimonial);
    res.status(201).send(testimonial);
});

const validateTestimonial = (testimonial) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name:Joi.string().min(3).required(),
        rating:Joi.number().min(0).max(5).required(),
        date:Joi.string().required(),
        text:Joi.string().required()
    });

    return schema.validate(testimonial);
};
//listen for incoming requests
app.listen(3001, ()=> {
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