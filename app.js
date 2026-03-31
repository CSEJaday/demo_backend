const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(cors());
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

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
//listen for incoming requests
app.listen(3001, ()=> {
    console.log("Server is up and running");
});