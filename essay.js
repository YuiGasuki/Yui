const params = new URLSearchParams(location.search);
const textp=params.get('Yui');
let history = "";
let ifOnlad = 0;
if(textp!=null&&textp!=""){
if(params.get('history')!=null&&params.get('history')!=""){
    history+= "-"+params.get('history');
}
fetch('1.json',{method: 'GET'}).then(response => response.json()).then(data =>{
let datab;
ifOnlad++;
if(ifOnlad>=2){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
}
for(let onei = 0;onei<data.length;onei++){
if(data[onei].Yui===textp){
datab = data[onei];
break
}
}
document.title="Yui的文章「"+datab.title+"」";
document.getElementById('title').innerHTML = datab.title;
document.getElementById('titleimg').src = datab.title_url;
for(let i=0;i<datab.label.length;i++){
document.getElementById('label').innerHTML += `<span class="label" onclick="JavaScript:window.open('search.html?q=${datab.label[i]}')">`+datab.label[i]+`</span>`;
}
document.getElementById('titleimg').onerror = () =>{
document.getElementById('titleimg').src="none.webp";
}
});
fetch(textp+history+'.txt',{method: 'GET'}).then(response => {
if (response.ok) {


    


 let gitalk = new Gitalk({
  clientID: 'Ov23liQRR4VjYR4dXXDv',
  clientSecret: 'b6e1ceaaea554e362eee96360da7b5f1a4bd0383',
  repo: 'CommentYui',
  owner: 'Yuigasuki',
  admin: ['Yuigasuki'],
  id: location.pathname+"?Yui="+textp,  
   distractionFreeMode: false  // Facebook-like distraction free mode
  
 });

gitalk.render('gitalk-container'); 

return response.text();
}else{
window.location.assign("404");
return "啊，居然加载错误Σ(°Д°;"
}
}).then(data =>{
document.getElementById('body').innerHTML = data;
ifOnlad++;
if(ifOnlad>=2){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
}

document.querySelectorAll('div.code').forEach(el => {
  hljs.highlightElement(el);
});




document.querySelectorAll('img').forEach(el => {
  
  el.onerror = () =>{
el.src="none.webp";
}
});

let i=0;
document.querySelectorAll('.note').forEach(el => {
i++;
let data = el.innerHTML;
el.dataset.text = data;
el.dataset.i = i;
el.innerHTML = `[${i}]`;
el.onmouseover = () =>{
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
el.childNodes[0].style.marginLeft="0px";
}
});

});


  
}else{
    window.location.assign("404");
}


const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.8)');
document.documentElement.style.setProperty('--nightfcolor', '#aaaaaa'); 
document.documentElement.style.setProperty('--nightbox', '0.5');  
        }else{
            document.documentElement.style.setProperty('--nightbackground','rgba(238,238,238,0.8)');
    document.documentElement.style.setProperty('--nightfcolor', '#606266');
document.documentElement.style.setProperty('--nightbox', '0');  
        }
    }else{
        document.documentElement.style.setProperty('--nightbackground','rgba(238,238,238,0.8)');
        document.documentElement.style.setProperty('--nightbox', '0');  
        document.documentElement.style.setProperty('--nightfcolor', '#606266'); 
    }
}

DarkMode();


const channel = new BroadcastChannel('Yui_night');

channel.addEventListener('message', (e) => {
DarkMode();
})


function replacepicture() {
    
    if(window.innerHeight <= window.innerWidth){
        document.body.style.backgroundImage = "url('p_1.webp')";
    }else{
        document.body.style.backgroundImage = "url('b_3.webp')";
    }
}
replacepicture();
window.addEventListener('resize', replacepicture);

