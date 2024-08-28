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

document.getElementById('titleimg').onerror = () =>{
document.getElementById('titleimg').onclick = () =>{
    document.getElementById('titleimg').src = datab.title_url;
}
document.getElementById('titleimg').src="none.webp";
}

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


document.getElementById('body').innerHTML = data+`<dov id="noteBox"></div>`;

document.querySelectorAll('div.code').forEach(el => {
  hljs.highlightElement(el);
});




document.querySelectorAll('img').forEach(el => {
  
  el.onerror = () =>{
el.src="none.webp";
}
});

let i=0;
let noteBox = ``;
document.querySelectorAll('.note').forEach(el => {
i++;
let data = el.innerHTML;
el.dataset.text = data;
el.dataset.i = i;
el.innerHTML = `[${i}]`;
el.id=`note${i}`;
noteBox +=`<br><a href="#note${i}">[${i}]${data.replaceAll(`<br>`,'')}</a>`;
el.onclick = () =>{
let a = el.clientWidth;
el.innerHTML = `[${el.dataset.i}]<div>${el.dataset.text}</div>`;
el.style.zIndex="10";
if((el.childNodes[1].clientWidth+el.offsetLeft) > document.body.scrollWidth){
el.childNodes[1].style.marginLeft= (0 - el.childNodes[1].clientWidth + a) + "px";
}
}
el.onmouseout = () =>{
el.innerHTML = `[${el.dataset.i}]`;
el.style.zIndex="1";
}
});
document.getElementById('noteBox').innerHTML +=noteBox;
console.log(noteBox);

}).catch(err =>{
document.querySelectorAll('#first_box p')[0].innerHTML = '网络错误 点击刷新';
document.querySelectorAll('#first_box p')[0].style.color='red';
document.querySelectorAll('#first_box p')[0].onclick = () =>{
location.reload();
}
});
}




