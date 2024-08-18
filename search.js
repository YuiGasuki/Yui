const idSearch = document.getElementById('search');
const params = new URLSearchParams(location.search);
const textp=params.get('q');
if(textp!=null&textp!=""){
document.getElementById("searchText").value = textp;
fetch('1.json',{method: 'GET'}).then(response => {
if(response.ok){
return response.json()
}else{
document.getElementById("searchBody").innerHTML = `<div class="ntroduction"><p class="error">找不到内容Σ(ŎдŎ|||)ﾉﾉ<p></div>`;
return []
}
}).then(data =>{
for(let i = data.length-1;i>=0;i=i-1){
if(data[i].type==="1"){
        continue
}
let b = false;
let t = "";
for(let ib=0;ib<data[i].label.length;ib++){
if(data[i].label[ib].search(textp)!=-1){
b = true;
}
t += `<span>`+data[i].label[ib]+`</span>`;
}
if(data[i].title.search(textp)!=-1){
b = true;
}
if(b===true){
document.getElementById("searchBody").innerHTML += `
<div class="ntroduction" onclick="JavaScript:window.open('essay.html?Yui=`+data[i].Yui+`')">
<img src="`+data[i].title_url+`" class="titleimg" />
<p class="title">`+data[i].title+`</p>
<p class="label">`+t+`</p>
</div>
`;
}
}

if(document.getElementById("searchBody").innerHTML===""){
document.getElementById("searchBody").innerHTML = `<div class="ntroduction"><p class="error">找不到内容Σ(ŎдŎ|||)ﾉﾉ<p></div>`;
}

document.querySelectorAll(".ntroduction").forEach(item=>{
item.style.transition="0.5s"; 
item.style.opacity="1";
item.style.marginTop="0px";
});

document.querySelectorAll('img').forEach(el => {
  el.onerror = () =>{
el.src="none.webp";
}
});

}).catch(()=>{
document.getElementById("searchBody").innerHTML = `<div class="ntroduction"><p class="error">找不到内容Σ(ŎдŎ|||)ﾉﾉ<p></div>`;
});
}

idSearch.onmouseover = () =>{
idSearch.style.transition = "0.5s";
idSearch.style.padding = "14px 8px";
}
idSearch.onmouseout = () =>{
idSearch.style.transition = "0.5s";
idSearch.style.padding = "8px 4px";
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



const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.8)');
document.documentElement.style.setProperty('--nightBrightness','0.5');
document.documentElement.style.setProperty('--nightbox', '0.5');
        }else{
            document.documentElement.style.setProperty('--nightbackground','rgba(255,255,255,0.8)');
document.documentElement.style.setProperty('--nightBrightness','0.3');
document.documentElement.style.setProperty('--nightbox', '0');  
        }
    }else{
        document.documentElement.style.setProperty('--nightbackground','rgba(255,255,255,0.8)');
document.documentElement.style.setProperty('--nightBrightness','0.3');
document.documentElement.style.setProperty('--nightbox', '0');  
    }
}

DarkMode();



const channel = new BroadcastChannel('Yui_night');

channel.addEventListener('message', (e) => {
    DarkMode();
})


function replacepicture() {
    if(window.innerHeight <= window.innerWidth){
        document.body.style.backgroundImage="url('p_1.webp')";
    }else{
        document.body.style.backgroundImage="url('b_3.webp')";
    }
}



replacepicture();
window.addEventListener('resize', replacepicture);