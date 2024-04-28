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
bodyInformation.style.display="inline";
let bodyInfheight = bodyInformation.offsetHeight;
bodyInformation.style.height="0px";
bodyPortrait.onclick = () =>{
if(bodyInformation.style.height==="0px"){
bodyInformation.style.transition="0.5s";
bodyInformation.style.height=bodyInfheight+"px";    

}else{
bodyInformation.style.transition="0.5s";
bodyInformation.style.height="0px";
}
bodyPortrait.style.transition="0.5s"; 
bodyPortrait.style.width="0px";
bodyPortrait.style.height="0px";
setTimeout(function(){
bodyPortrait.src="portrait"+portrait+".jpg";
bodyPortrait.style.width="80px";
bodyPortrait.style.height="80px";
},500)
portrait++;
if(portrait===3){
portrait = 1;
}
}



const options = { 
 method: 'GET', 
 header:{ 
 'access_token':'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' 
 } 
 } 
fetch('https://api.github.com/repos/YuiandAzucat/Yui/issues',options).then(response => response.json()).then(data =>{ 
for(let i =0;i<data.length;i++){
if(data[i].title==="留言"){
document.getElementById('body_ntroduction').innerHTML += `
<div class="ntroduction">
<img src="`+data[i].user.avatar_url+`" class="avatar" onclick="JavaScript:window.open('`+data[i].user.html_url+`')" /><p class="name" onclick="JavaScript:window.open('`+data[i].user.html_url+`')">`+data[i].user.login+`</p>
<p class="body">`+data[i].body+`</p>
</div>
`;}

 }
 bodyInformation.style.height="auto";
let bodyInfheight = bodyInformation.offsetHeight;
bodyInformation.style.height="0px";
 });


