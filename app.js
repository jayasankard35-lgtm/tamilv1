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


status.innerText =
"Browser microphone support இல்லை";


}



else{



const recognition =
new SpeechRecognition();



recognition.lang="ta-IN";


recognition.continuous=false;


recognition.interimResults=false;




mic.addEventListener("click",()=>{


console.log("MIC CLICKED");


status.innerText =
"கேட்கிறேன்...";


recognition.start();


});





recognition.onresult=(event)=>{


let question =
event.results[0][0].transcript;



console.log(question);



text.innerHTML =

"நீங்கள்:<br>"+
question;




sendMessage(question);


};





recognition.onerror=(event)=>{


console.log(event.error);


status.innerText =
"Mic error";


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







function speak(message){


const speech =
new SpeechSynthesisUtterance(message);



speech.lang="ta-IN";


speech.rate=1;



speechSynthesis.speak(speech);



}
