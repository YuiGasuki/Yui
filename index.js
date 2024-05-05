document.body.style.backgroundImage="url('"+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+".jpg')";


if(navigator.language==="zh-CN"){
document.getElementById('ntroduction_age').innerHTML="年龄: "+((new Date()).getFullYear() - 2008)+"岁";
}else{
document.getElementById('ntroduction_age').innerHTML="Age: "+((new Date()).getFullYear() - 2008)+" years old";
document.getElementById('ntroduction_hobby').innerHTML="Hobbies:Watching anime and Coding";
document.getElementById('ntroduction_name').innerHTML="Name: Lin Haiyang";
document.getElementById('ntroduction_mailbox').innerHTML="Mailbox: 2528197707@qq.com";
}

const TypingAnimation = (e,name,present,i) =>{
if(present === ''){
present = name[i];
}else{
if(i>=name.length-2){
present += name[i+1];
document.getElementById('body_name').innerHTML=present;
return
}
present += name[i+1];
i++;
}
document.getElementById('body_name').innerHTML=present + '|';
setTimeout(()=>{TypingAnimation(e,name,present,i)}, 400)
}
TypingAnimation(document.getElementById('body_name'),document.getElementById('body_name').innerHTML,"",0);

const channel = new BroadcastChannel('Yui_night');
channel.addEventListener('message', (e) => {
if(e.data.Type===0){
document.documentElement.style.setProperty('--nightbackground','rgba(255,255,255,0.8)');
document.documentElement.style.setProperty('--nightBrightness','0.3');
}else{
document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.8)');
document.documentElement.style.setProperty('--nightBrightness','0.5');
}
})





let portrait = 1;
const bodyInformation = document.getElementById('body_ntroduction');
const bodyPortrait = document.getElementById('body_portrait');
const idSearch = document.getElementById('search');

bodyPortrait.onclick = () =>{
bodyPortrait.style.transition="0.5s"; 
bodyPortrait.style.width="0px";
bodyPortrait.style.height="0px";
setTimeout(function(){
bodyPortrait.src="portrait"+portrait+".jpg";
let a = setTimeout(function(){
bodyPortrait.style.width="80px";
bodyPortrait.style.height="80px";
},1000);
bodyPortrait.onload = () =>{
bodyPortrait.style.width="80px";
bodyPortrait.style.height="80px";
clearTimeout(a);
}
},500);
portrait++;
if(portrait===5){
portrait = 1;
}
if(bodyInformation.style.display!="inline"){
bodyInformation.style.display="inline";
idSearch.style.display="inline";
let bodyInfheight = bodyInformation.offsetHeight;
bodyInfheight = idSearch.offsetHeight
document.querySelectorAll(".ntroduction").forEach(item=>{
item.style.transition="0.5s"; 
item.style.opacity="1";
item.style.marginTop="0px";
});
idSearch.style.transition="0.5s"; 
idSearch.style.transform = "translate(-50%,0%)";
}else{
document.querySelectorAll(".ntroduction").forEach(item=>{
item.style.transition="0.5s"; 
item.style.opacity="0";
item.style.marginTop="36px";
});
idSearch.style.transition="0.5s"; 
idSearch.style.transform = "translate(-50%,-200%)";
setTimeout(function(){
bodyInformation.style.display="none";
idSearch.style.display="none";
},500);
}
}





fetch('1.json',{method: 'GET'}).then(response => response.json()).then(data =>{
for(let i = data.length-1;i>=0;i=i-1){
let b ="";
for(let ib=0;ib<data[i].label.length;ib++){
b += `<span>`+data[i].label[ib]+`</span>`;
}
bodyInformation.innerHTML += `
<div class="ntroduction" onclick="JavaScript:window.open('essay.html?Yui=`+data[i].Yui+`')">
<img src="`+data[i].title_url+`" class="titleimg" />
<p class="title">`+data[i].title+`</p>
<p class="label">`+b+`</p>
</div>
`;
}

if(bodyInformation.style.display==="inline"){
document.querySelectorAll(".ntroduction").forEach(item=>{
if(item.style.opacity!="1"){
item.style.transition="0.5s"; 
item.style.opacity="1";
item.style.marginTop="0px";
}
});
}
});

document.querySelectorAll(".titleimg").forEach(item=>{
item.onerror = () =>{
item.src="none.jpg";
}
});

idSearch.onmouseover = () =>{
idSearch.style.transition = "0.5s";
idSearch.style.padding = "10px 8px";
}
idSearch.onmouseout = () =>{
idSearch.style.transition = "0.5s";
idSearch.style.padding = "4px 4px";
}



function ent(ev) {
	ev = ev || window.event
	if(ev.keyCode == "13") {
	openfeel()
	}
}

function openfeel() {
window.open("search.html?q="+document.getElementById("searchText").value);
}