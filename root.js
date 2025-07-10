let pcpicture  = (Math.floor(Math.random() * (23 - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (30 - 1 + 1)) + 1);
function replacepicture() {
    if(window.innerHeight <= window.innerWidth){
        document.getElementById('background_img').src = "p_" + pcpicture + ".webp";
    }else{
        document.getElementById('background_img').src = "b_" + anpicture + ".webp";
    }
}

replacepicture();
window.addEventListener('resize', replacepicture);
const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,0.7)');
            document.documentElement.style.setProperty('--nightbox', '0.5');           
            document.documentElement.style.setProperty('--nightfcolor', '#aaaaaa');
            return
        }
    }
    document.documentElement.style.setProperty('--nightbackground', 'rgba(255,255,255,0.7)');
    document.documentElement.style.setProperty('--nightbox', '0');
    document.documentElement.style.setProperty('--nightfcolor', '#606266');
    
}

DarkMode();
const channel = new BroadcastChannel('Yui_night');
channel.addEventListener('message', (e) => {
DarkMode();
})

let getListCacheText = ['','','','<div>2018年9月15日，同人绘师よこやまなおき去世。在去世四年后的2022年9月16日，其生前的伙伴tohkag公开了他的一些曲目。他的音乐，在死后得以为人知道。<br>这个故事深深感动了我，于是我决定将音乐备份到仓库里，同时放在个人网站上供人们欣赏。<br>曲子下载源：<br>rain-blue.com/notes/grace/</div>'];
let getListCache = [false,false,false,false];
let getListCacheTitle = ['','','',''];
function getList(el,title,nu){
    if(!getListCache[nu]){
    getListCacheTitle[nu]=el.innerHTML;
    if(getListCacheText[nu].search('<li>')===-1){  
    fetch(`https://api.github.com/repos/yuigasuki/Yui/contents/${title}`, {
    method: 'GET'
    }).then(response => response.json()).then(data => {
    
    for(let i=0;i<data.length;i++){
    getListCacheText[nu] += `<li><a href="/Yui/${data[i].path}">${data[i].name}</a><div>${sizeTurn(data[i].size)}</div></li>`
    }
    el.parentElement.innerHTML += `<ul>${getListCacheText[nu]}</ul>`;
    });
    }else{
    el.parentElement.innerHTML += `<ul>${getListCacheText[nu]}</ul>`;
    }
    getListCache[nu]=true;
}else{
    el.parentElement.innerHTML = `<p onclick="getList(this,'${title}',${nu})">${getListCacheTitle[nu]}</p>`;
    getListCache[nu]=false;
}
}

function sizeTurn(number){
let Text="";
let a = Math.trunc(number/1024);
if(a>=1){
if(a>=1024){
Text = (number/(1024*1024)).toFixed(2)+"MB"
}else{
Text = (number/1024).toFixed(2)+"KB"
}
}else{
Text = number+"B"
}
return Text


}