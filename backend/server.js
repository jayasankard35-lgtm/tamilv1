const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{

res.send("Tamil Voice AI Backend Running");

});





app.post("/chat", async(req,res)=>{


try{


const userMessage =
req.body.message;



const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`,

{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({


contents:[

{

parts:[

{

text:

`
You are a Tamil voice assistant.

Rules:
- Reply only in Tamil
- Use simple Tamil
- Give short answers
- Do not use English

User question:

${userMessage}

`

}

]

}

]

})


});





const data =
await response.json();



const answer =
data.candidates[0]
.content.parts[0].text;



res.json({

reply:answer

});



}

catch(error){


console.log(error);


res.json({

reply:"மன்னிக்கவும், பதில் கிடைக்கவில்லை"

});


}


});





app.listen(

process.env.PORT || 5000,

()=>{

console.log("Server running");

}

);
