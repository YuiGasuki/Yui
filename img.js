const params = new URLSearchParams(location.search);
const textp=params.get('src');
if(textp!=null&textp!=""){
document.getElementById('blackA').src = textp;
document.getElementById('img_a').href = textp;
document.getElementById('img_a').download = textp;
}



let ha=1;
const blackA = document.getElementById('blackA');
function h(){
if (screen.width < 640) {
ha=ha+1;
if(ha==3){
ha=1;
}
if(ha==2){
blackA.style.transition = "0.5s"; blackA.style.maxWidth = "150vw";
blackA.style.transition = "0.5s"; blackA.style.maxHeight = "200vh";
console.log(blackA.offsetHeight)
blackA.style.transition = "0.5s"; blackA.style.width = "150vw";

let e = event || window.event;
let x = e.screenX;
let Y = e.screenY;

if(blackA.offsetHeight>=blackA.offsetWidth){
    let tall = blackA.offsetHeight / 3;
    let coordinate = blackA.offsetTop;
    
    
    if(Y < (coordinate+tall)){
        blackA.style.transition = "0.5s"; blackA.style.marginBottom = "-50vh";
    }else if(Y > (coordinate + (2*tall))){
        blackA.style.transition = "0.5s"; blackA.style.marginBottom = "50vh";
    }
}

let y = document.body.scrollWidth/3;  
let ya=y+y;
let yb=ya+y;
if(x < y && x>0){
blackA.style.transition = "0.5s"; blackA.style.marginLeft = "0vw";
}
if(x > y && x < ya ){
blackA.style.transition = "0.5s"; blackA.style.marginLeft = "-20vw";
}
if(x > ya && x < yb ){
blackA.style.transition = "0.5s"; blackA.style.marginLeft = "-50vw";
}

}
if(ha==1){
blackA.style.transition = "0.5s";
blackA.style.maxWidth = "100vw";
blackA.style.marginLeft = "0vw";
blackA.style.maxWidth = "100vw";
blackA.style.maxHeight = "100vh";
blackA.style.marginBottom = "0px";

}
}
}
