const BACKEND =
"https://tamilv1.onrender.com/chat";


const mic = document.getElementById("mic");
const text = document.getElementById("text");
const status = document.getElementById("status");


// Check browser support
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


if(!SpeechRecognition){

status.innerText =
"இந்த browser microphone support இல்லை";

mic.disabled = true;

}
else{


const recognition = new SpeechRecognition();


recognition.lang = "ta-IN";

recognition.continuous = false;

recognition.interimResults = false;



mic.onclick = function(){


status.innerText =
"கேட்கிறேன்...";


text.innerHTML =
"பேசுங்கள்...";


recognition.start();


};





recognition.onstart = ()=>{

console.log("Mic started");

};





recognition.onresult = (event)=>{


const question =
event.results[0][0].transcript;


console.log(question);



text.innerHTML =
"நீங்கள்:<br>"+question;



sendMessage(question);


};





recognition.onerror = (event)=>{


console.log(event.error);


status.innerText =
"Mic error: "+event.error;


};





recognition.onend = ()=>{


console.log("Mic stopped");


};




}





async function sendMessage(question){


status.innerText =
"AI பதில் வருகிறது...";



try{


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

});


const data =
await response.json();



text.innerHTML +=


"<br><br>AI:<br>"+
data.reply;



speak(data.reply);



status.innerText =
"முடிந்தது";


}

catch(error){


console.log(error);


status.innerText =
"Server error";


}


}





function speak(answer){


const speech =
new SpeechSynthesisUtterance(answer);


speech.lang =
"ta-IN";


speech.rate = 1;


window.speechSynthesis.speak(speech);


}
