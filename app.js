console.log("APP JS LOADED");


const BACKEND =
"https://tamilv1.onrender.com/chat";



const mic =
document.getElementById("mic");


const text =
document.getElementById("text");


const status =
document.getElementById("status");



const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

status.innerHTML =
"Chrome browser பயன்படுத்தவும்";


}

else{


const recognition =
new SpeechRecognition();



recognition.lang="ta-IN";


recognition.continuous=false;


recognition.interimResults=false;



mic.onclick=()=>{


status.innerHTML =
"கேட்கிறேன்...";


recognition.start();


};





recognition.onresult=(event)=>{


let question =
event.results[0][0].transcript;



text.innerHTML =
"நீங்கள்:<br>"+question;



sendMessage(question);


};





recognition.onerror=(e)=>{


status.innerHTML =
"Mic error";

console.log(e);


};



}




async function sendMessage(question){


status.innerHTML =
"பதில் வருகிறது...";


try{


let response =
await fetch(

BACKEND,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:question

})

});


let data =
await response.json();



text.innerHTML +=

"<br><br>AI:<br>"+data.reply;



speak(data.reply);



status.innerHTML =
"முடிந்தது";


}

catch(error){


console.log(error);


status.innerHTML =
"Server error";


}


}




function speak(message){


let speech =
new SpeechSynthesisUtterance(message);


speech.lang="ta-IN";


speech.rate=1;


speechSynthesis.speak(speech);


}
