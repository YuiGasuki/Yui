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
    ifOnlad = null;
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
timeData=undefined;


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
    ifOnlad=undefined;
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
}


document.getElementById('body').innerHTML = data+`<div id="noteBox"></div>`;

document.querySelectorAll('div.code').forEach(el => {
  hljs.highlightElement(el);
});


document.querySelectorAll('.hidden').forEach(el => {
let hBody = el.innerHTML;
let maxHeight = el.clientHeight;
el.innerHTML = "";
let div = document.createElement("div");
let p = document.createElement("div");
div.className = "hidDiv";
div.innerHTML = el.getAttribute("data-title");
p.innerHTML = hBody;
let Button = document.createElement("button");
Button.innerText = "展开";
let iftrue = false;
Button.onclick = () =>{
if(iftrue){
p.style.maxHeight = "0px";
Button.innerText = "展开";
iftrue=false;
}else{
p.style.maxHeight = `${maxHeight}px`;
Button.innerText = "隐藏";
iftrue=true
}
}
div.appendChild(Button);
el.appendChild(div);
el.appendChild(p);
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
el.innerText = `[${i}]`;
el.id=`note${i}`;


NoteBox +=`<br><a href="Javascript:GoToNote('note${i}')">[${i}]${data.replace(/<br>/g,'')}</a>`;
el.onmouseover = () => ShowNote(el);

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
const div = document.createElement("div");
div.innerHTML = el.dataset.text;
el.appendChild(div)
let a = el.clientWidth;
console.log(div.clientWidth+el.offsetLeft + " "+document.getElementById('body').clientWidth)
if((div.clientWidth+el.offsetLeft + 16) > document.getElementById('body').clientWidth){
div.style.marginLeft= (0 - div.clientWidth) + "px";
}
el.onmouseout = () =>{
div.remove()

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
    let measure = el.offsetWidth / el.offsetHeight;
    bodyAlretImg.lastElementChild.onload = () =>{
        let hododa;
        const NoOndblc = () =>{
                if((window.innerHeight * measure)>window.innerWidth||measure>1){
                bodyAlretImg.lastElementChild.style.width=`100vw`;
                }else{
                bodyAlretImg.lastElementChild.style.width=`calc(100vh * ${measure})`;
                }
                bodyAlretImg.lastElementChild.style.marginLeft = "0px";
                bodyAlretImg.lastElementChild.style.marginTop = "0px";
                setTimeout(()=>{
                bodyAlretImg.lastElementChild.style.maxHeight = "100vh";
                },300)
                hododa = false;
        }
        
        const screenChangeDetection = () =>{
            if(window.innerHeight <= window.innerWidth){
            NoOndblc();
            }
        }
        window.addEventListener('resize', screenChangeDetection);
        this.ondblclick = () =>{
            if(window.innerHeight <= window.innerWidth){
            return
            }
            clearTimeout(bodyAlretImgSet);
            let e = event || window.event;
            let X = e.screenX;
            let Y = e.screenY;
            let enlargeData = 150;
            if(!hododa){
                bodyAlretImg.lastElementChild.style.width=`${bodyAlretImg.lastElementChild.offsetWidth + enlargeData}px`;

                bodyAlretImg.lastElementChild.style.marginLeft = `calc((100vw / 2) - ${X}px)`
               
                bodyAlretImg.lastElementChild.style.marginTop = `calc((100vh / 2) - ${Y}px)`
                bodyAlretImg.lastElementChild.style.maxHeight = "none";
                hododa = true;
            }else{
                NoOndblc();
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


