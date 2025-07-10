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

let getListCacheText = ['','',''];
let getListCache = [false,false,false];
function getList(el,title,nu){
    if(!getListCache[nu]){
    if(getListCacheText[nu]===''){
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
    el.parentElement.innerHTML = `<p onclick="getList(this,'${title}',${nu})">${title}</p>`;
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