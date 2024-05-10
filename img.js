const params = new URLSearchParams(location.search);
const textp=params.get('src');
if(textp!=null&textp!=""){
document.getElementById('blackA').src = textp;
document.getElementById('img_a').href = textp;
}



var ha=1;
let hu=null;
function hb(){
clearTimeout(hu);
hu=setTimeout(function () {
none();
clearTimeout(hu);
},300);
}
function h(){
clearTimeout(hu);
if (screen.width < 640) {
ha=ha+1;
if(ha==3){
ha=1;
}
if(ha==2){

var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.width = "150vw";
var e = event || window.event;
var x = e.screenX;
var y = document.body.scrollWidth/3;  
var ya=y+y;
var yb=ya+y;
if(x < y && x>0){
var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.marginLeft = "0vw";
}
if(x > y && x < ya ){
var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.marginLeft = "-20vw";
}
if(x > ya && x < yb ){
var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.marginLeft = "-50vw";
}

}
if(ha==1){
var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.width = "100vw";
var blackA = document.getElementById('blackA');blackA.style.transition = "0.5s"; blackA.style.marginLeft = "0vw";

}
}
}
