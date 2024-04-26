document.body.style.backgroundImage="url('"+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+".jpg')";
let portrait = 1;
document.getElementById('body_portrait').onclick = () =>{
let bodyPortrait = document.getElementById('body_portrait');
bodyPortrait.style.transition="0.5s"; 
bodyPortrait.style.width="0px";
bodyPortrait.style.height="0px";
setTimeout(function(){
bodyPortrait.src="portrait"+portrait+".jpg";
bodyPortrait.onload = () =>{
bodyPortrait.style.width="80px";
bodyPortrait.style.height="80px";
}
},500)
portrait++;
if(portrait===3){
portrait = 1;
}
}