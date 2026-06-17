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



mic.onclick=function(){


console.log("MIC CLICK");


status.innerHTML =
"கேட்கிறேன்...";


recognition.start();


};




recognition.onresult=function(event){



const question =
event.results[0][0].transcript;



text.innerHTML =
"நீங்கள்:<br>"+question;



sendMessage(question);



};




recognition.onerror=function(error){


console.log(error);


status.innerHTML =
"Mic error";


};


}





async function sendMessage(question){



status.innerHTML =
"பதில் வருகிறது...";



const response =
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

}

);



const data =
await response.json();



text.innerHTML +=

"<br><br>AI:<br>"+

data.reply;



speak(data.reply);



status.innerHTML =
"முடிந்தது";


}





function speak(message){



const speech =
new SpeechSynthesisUtterance(message);



speech.lang="ta-IN";


speech.rate=1;



speechSynthesis.speak(speech);


}
