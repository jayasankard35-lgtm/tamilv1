const BACKEND =
"https://YOUR-RENDER-URL.onrender.com/chat";



const mic =
document.getElementById("mic");


const chat =
document.getElementById("chat");


const status =
document.getElementById("status");




const recognition =
new(window.SpeechRecognition ||
window.webkitSpeechRecognition)();



recognition.lang="ta-IN";

recognition.continuous=false;



mic.onclick=()=>{


status.innerText="கேட்கிறேன்...";


recognition.start();

}




recognition.onresult=(event)=>{


let text =
event.results[0][0].transcript;



chat.innerHTML=

"<b>நீங்கள்:</b><br>"+text;



sendMessage(text);


};







async function sendMessage(text){


status.innerText=
"பதில் வருகிறது...";



try{


let controller =
new AbortController();


setTimeout(
()=>controller.abort(),
15000
);



let response =
await fetch(

BACKEND,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


signal:controller.signal,


body:JSON.stringify({

message:text

})


});



let data =
await response.json();




chat.innerHTML +=


"<br><br><b>AI:</b><br>"+
data.reply;



speak(data.reply);



status.innerText="முடிந்தது";


}



catch(e){


chat.innerHTML +=

"<br><br>Server error";


status.innerText=
"மீண்டும் முயற்சிக்கவும்";


}



}







function speak(text){


let voice =
new SpeechSynthesisUtterance(text);


voice.lang="ta-IN";

voice.rate=1;


speechSynthesis.speak(voice);


}