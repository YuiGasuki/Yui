const options = { 
 method: 'GET'
 };
fetch(`https://api.github.com/repos/YuiandAzucat/Yui/issues/15/comments?time=${Date.now()}`,options).then(response => response.json()).then(data =>{ 
document.getElementById('first_box').remove();
document.body.style.overflow="auto";
for(let i=data.length-1;i>=0;i=i-1){

document.getElementById('body_box').innerHTML += `
<div>
<p class="name" onclick="JavaScript:window.open('`+data[i].user.html_url+`')">`+data[i].user.login+`</p>
<img src="`+data[i].user.avatar_url+`" class="avatar" onclick="JavaScript:window.open('`+data[i].user.html_url+`')" />
<p class="time">`+data[i].updated_at.replace(/(T)/," ").replace(/Z/,"")+`</p>
<p class="body">`+data[i].body+`</p>
</div>
`;}



 
 }).catch(err =>{
 console.log(err)
document.querySelectorAll('#first_box p')[0].innerHTML = '加载错误 点击刷新';
document.querySelectorAll('#first_box p')[0].style.color='red';
document.querySelectorAll('#first_box p')[0].onclick = () =>{
location.reload();
}
});
 
const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,0.8)');
            document.documentElement.style.setProperty('--nightbox', '0.5');           
            document.documentElement.style.setProperty('--nightfcolor', '#aaaaaa');
            return
        }
    }
    document.documentElement.style.setProperty('--nightbackground', 'rgba(255,255,255,0.8)');
    document.documentElement.style.setProperty('--nightbox', '0');
    document.documentElement.style.setProperty('--nightfcolor', '#606266');
    
}

DarkMode();
const channel = new BroadcastChannel('Yui_night');
channel.addEventListener('message', (e) => {
DarkMode();
})
