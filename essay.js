const params = new URLSearchParams(location.search);
const textp=params.get('Yui');
let history = "";
let ifOnlad = 0;


window.onpageshow = () =>{
if(textp!=null&&textp!=""){




if(params.get('history')!=null&&params.get('history')!=""){
    history+= "-"+params.get('history');
}
fetch('1.json',{method: 'GET'}).then(response => {
if (response.ok) {
getbody();
return response.json();
}else{
window.location.assign("404");
return "啊，居然加载错误Σ(°Д°;"
}
}).then(data =>{
let datab;
ifOnlad++;
if(ifOnlad>=2){
    delete ifOnlad;
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
}


for(let onei = 0;onei<data.length;onei++){
if(data[onei].Yui===textp){
document.getElementById('body_foot_p').innerHTML = `Yui: ${textp}` ;
datab = data[onei];
break
}
}

if(datab===undefined){
    window.location.assign("404");
    return "啊，居然加载错误Σ(°Д°;"
}

document.title="「"+datab.title+"」";
document.getElementById('title').innerHTML = datab.title;
document.getElementById('titleimg').src = datab.title_url;


document.getElementById('titleimg').addEventListener('error', () =>{
document.getElementById('titleimg').src = datab.title_url;
document.getElementById('titleimg').addEventListener('error', () =>{document.getElementById('titleimg').src = "none.webp";});
}, { once: true });


let TimeLabel = ``;
for(let i=0;i<datab.label.length;i++){
TimeLabel += `<span class="label" onclick="JavaScript:window.open('search.html?q=${datab.label[i]}')">`+datab.label[i]+`</span>`;
}
document.getElementById('label').innerHTML =TimeLabel;

let timeData = datab.time.split(".");
document.querySelector("time").innerHTML = `${timeData[0]}年${timeData[1]}月${timeData[2]}日`;
delete timeData;


}).catch(err =>{
document.querySelectorAll('#first_box p')[0].innerHTML = '加载错误 点击刷新';
document.querySelectorAll('#first_box p')[0].style.color='red';
document.querySelectorAll('#first_box p')[0].onclick = () =>{
location.reload();
}
});
  
}else{
    window.location.assign("404");
}
}





function replacepicture() {
    
    if(window.innerHeight <= window.innerWidth){
        document.body.style.backgroundImage = "url('p_1.webp')";
    }else{
        document.body.style.backgroundImage = "url('b_5.webp')";
    }
}
replacepicture();
window.addEventListener('resize', replacepicture);


function getbody(){
fetch(textp+history+'.txt',{method: 'GET'}).then(response => {
if (response.ok) {
return response.text();
}else{
window.location.assign("404");
return "啊，居然加载错误Σ(°Д°;"
}
}).then(data =>{
ifOnlad++;
if(ifOnlad>=2){
    delete ifOnlad;
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
}


document.getElementById('body').innerHTML = data+`<div id="noteBox"></div>`;

document.querySelectorAll('div.code').forEach(el => {
  hljs.highlightElement(el);
});


const H2List = document.querySelectorAll('h2');
let outlineLi = "";
for(let i=0;i<H2List.length;i++){
if(outlineBox.style.display===""){
outlineBox.style.display = "inline";
}
H2List[i].id = `H2_${i}`;
outlineLi += `<li onclick="GoToNote('${H2List[i].id}')">${H2List[i].innerText}</li>`;

}
console.log(outlineLi)
if(outlineLi!=""){
    outlineBox.children[0].innerHTML = outlineLi;
}

document.getElementById('body').querySelectorAll('img').forEach(el => {
el.onclick = () =>{
  ClickComeBig(el);
  }
});
document.querySelectorAll('img').forEach(el => {
  
  
  el.onerror = () =>{
el.src="none.webp";
}
});

let i=0;
let NoteBox = ``;
document.querySelectorAll('.note').forEach(el => {
i++;
let data = el.innerHTML;
el.dataset.text = data;
el.dataset.i = i;
el.innerHTML = `[${i}]`;
el.id=`note${i}`;


NoteBox +=`<br><a href="Javascript:GoToNote('note${i}')">[${i}]${data.replace(/<br>/g,'')}</a>`;
el.onclick = () => ShowNote(el);
el.onmouseout = () =>{
el.innerHTML = `[${el.dataset.i}]`;
el.style.zIndex="1";
}
});
document.getElementById('noteBox').innerHTML +=NoteBox;

}).catch(err =>{
document.querySelectorAll('#first_box p')[0].innerHTML = '网络错误 点击刷新';
document.querySelectorAll('#first_box p')[0].style.color='red';
document.querySelectorAll('#first_box p')[0].onclick = () =>{
location.reload();
}
});
}


function GoToNote(id){
    let e = document.getElementById(id).getBoundingClientRect();
    let Y = e.y;
    let data;
    if(Y >= 0){
        data = document.documentElement.scrollTop + Y;
    }else{
        data = document.documentElement.scrollTop + Y;
    }
    document.documentElement.scrollTop = data;
}

function ShowNote(el){
let a = el.clientWidth;
el.innerHTML = `[${el.dataset.i}]<div>${el.dataset.text}</div>`;
el.style.zIndex="10";
if((el.childNodes[1].clientWidth+el.offsetLeft) > document.body.scrollWidth){
el.childNodes[1].style.marginLeft= (0 - el.childNodes[1].clientWidth + a) + "px";
}
}

let bodyAlretImg = document.getElementById('body_alret_img');
let bodyAlretImgSet = null;
function ClickComeBig(el){
    document.body.style.overflow="hidden";
    let Img = document.createElement("img");
    Img.src = el.src;
    bodyAlretImg.style.display="flex";
    bodyAlretImg.appendChild(Img);
    bodyAlretImg.lastElementChild.onload = () =>{
        let hododa;
        this.ondblclick = () =>{
            clearTimeout(bodyAlretImgSet);
            let e = event || window.event;
            let X = e.screenX;
            let Y = e.screenY;
            // alert(X)
            let enlargeData = 80;
            if(!hododa){
                bodyAlretImg.lastElementChild.style.width=`${bodyAlretImg.lastElementChild.offsetWidth + enlargeData}px`;

                bodyAlretImg.lastElementChild.style.marginLeft = `${(screen.width/2)-X}px`
               
                bodyAlretImg.lastElementChild.style.marginTop = `${(screen.height/2)-Y}px`
                bodyAlretImg.lastElementChild.style.maxHeight = "none";
                hododa = true;
            }else{
                bodyAlretImg.lastElementChild.style.width="100vw";
                bodyAlretImg.lastElementChild.style.marginLeft = "0px";
                bodyAlretImg.lastElementChild.style.marginTop = "0px";
                setTimeout(()=>{
                bodyAlretImg.lastElementChild.style.maxHeight = "100vh";
                },300)
                hododa = false;
            }
        }
    }
}


bodyAlretImg.querySelectorAll('div')[0].onclick = () =>{
    clearTimeout(bodyAlretImgSet);
    bodyAlretImgSet=setTimeout(()=>{
    document.body.style.overflow="auto";
    bodyAlretImg.lastElementChild.remove();
    bodyAlretImg.style.display="none";
    },300);
}

