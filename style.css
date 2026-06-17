console.log("JS WORKING");


const BACKEND =
"https://tamilv1.onrender.com/chat";



function startMic(){


alert("MIC BUTTON WORKING");


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Chrome browser required");

return;

}



let recognition =
new SpeechRecognition();



recognition.lang="ta-IN";


recognition.start();



document.getElementById("status").innerHTML =
"கேட்கிறேன்...";



recognition.onresult=function(event){


let question =
event.results[0][0].transcript;



document.getElementById("text").innerHTML =
"நீங்கள்:<br>"+question;



sendMessage(question);



}



}



async function sendMessage(question){


const res =
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
await res.json();



document.getElementById("text").innerHTML +=

"<br><br>AI:<br>"+data.reply;



let speech =
new SpeechSynthesisUtterance(data.reply);


speech.lang="ta-IN";


speechSynthesis.speak(speech);



}
