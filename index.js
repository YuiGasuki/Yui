document.body.style.backgroundImage="url('"+(Math.floor(Math.random() * (3 - 1 + 1)) + 1)+".jpg')";
let portrait = 1;
const bodyInformation = document.getElementById('body_ntroduction');
let bodyInfheight = bodyInformation.offsetHeight;
bodyInformation.style.maxHeight="0px";
document.getElementById('body_portrait').onclick = () =>{
if(bodyInformation.style.maxHeight==="0px"){
bodyInformation.style.transition="0.5s";
bodyInformation.style.maxHeight=bodyInfheight + "px";
}else{
bodyInformation.style.transition="0.5s";
bodyInformation.style.maxHeight="0px";
}
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

if(navigator.language==="zh-CN"){
document.getElementById('ntroduction_age').innerHTML="年龄: "+((new Date()).getFullYear() - 2008)+"岁";
}else{
document.getElementById('ntroduction_age').innerHTML="Age: "+((new Date()).getFullYear() - 2008)+" years old";
document.getElementById('ntroduction_hobby').innerHTML="Hobbies:Watching anime and Coding";
document.getElementById('ntroduction_name').innerHTML="Name: Lin Haiyang";
document.getElementById('ntroduction_animation_h1').innerHTML="Randomly recommend anime";
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
document.documentElement.style.setProperty('--nightbackground','white');
document.documentElement.style.setProperty('--nightBrightness','0.3');
}else{
document.documentElement.style.setProperty('--nightbackground','#565656');
document.documentElement.style.setProperty('--nightBrightness','0.5');
}
})


fetch('/animation.txt',{method: 'GET'}).then((res)=>{
if (res.ok) {
return res.text()
}
}).then(data =>{
data = JSON.parse(data);
let did = Math.floor(Math.random() * (data.length));
let title = data[did].title;
let url = data[did].url;
document.getElementById('ntroduction_animation_title').innerHTML = title;
document.getElementById('ntroduction_animation_url').src = url;
data="";
})
