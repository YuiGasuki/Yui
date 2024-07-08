const params = new URLSearchParams(location.search);
const textp=params.get('Yui');
if(textp!=null&textp!=""){
fetch('1.json',{method: 'GET'}).then(response => response.json()).then(data =>{
let datab;
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
document.getElementById('label').innerHTML += `<span class="label" >`+datab.label[i]+`</span>`;
}
document.getElementById('titleimg').onerror = () =>{
document.getElementById('titleimg').src="none.jpg";
}
});
fetch(textp+'.txt',{method: 'GET'}).then(response => {
if (response.ok) {


let gitalk = new Gitalk({
  clientID: 'Ov23liQRR4VjYR4dXXDv',
  clientSecret: 'b6e1ceaaea554e362eee96360da7b5f1a4bd0383',
  repo: 'LHYPL',
  owner: 'Yuiandazucat',
  admin: ['Yuiandazucat'],
  id: location.pathname+"?Yui="+textp,  
  createIssueManually: true,
  distractionFreeMode: false  // Facebook-like distraction free mode
  
});

gitalk.render('gitalk-container');


return response.text();
}else{
return "啊，居然加载错误Σ(°Д°;"
}
}).then(data =>{
document.getElementById('body').innerHTML = data;
document.querySelectorAll('div.code').forEach(el => {
  hljs.highlightElement(el);
});
document.querySelectorAll('img').forEach(el => {
  
  el.onerror = () =>{
el.src="none.jpg";
}
});

});


  
}


const channel = new BroadcastChannel('Yui_night');
channel.postMessage({
    	Type:3
})
channel.addEventListener('message', (e) => {
if(e.data.Type===0){
document.documentElement.style.setProperty('--nightbackground','rgba(238,238,238,0.8)');
document.body.style.background = "#eee";
}else if(e.data.Type===1){
document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.8)');
document.body.style.background = "rgba(86,86,86)";
}
})

