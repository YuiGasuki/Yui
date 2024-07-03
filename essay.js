const params = new URLSearchParams(location.search);
const textp=params.get('Yui');
if(textp!=null&textp!=""){
fetch('1.json',{method: 'GET'}).then(response => response.json()).then(data =>{
document.title="Yui的文章「"+data[textp-1].title+"」";
document.getElementById('title').innerHTML = data[textp-1].title;
for(let i=0;i<data[textp-1].label.length;i++){
document.getElementById('label').innerHTML += `<span class="label" >`+data[textp-1].label[i]+`</span>`;
}
document.getElementById('titleimg').src = data[textp-1].title_url;
document.getElementById('titleimg').onerror = () =>{
document.getElementById('titleimg').src="none.jpg";
}
});
fetch(textp+'.txt',{method: 'GET'}).then(response => {
if (response.ok) {


let gitalk = new Gitalk({
  clientID: 'Ov23lixpZ1DMx798MTCG',
  clientSecret: '05cafad17663d681d6ac0638568d4d8187042dc5',
  repo: 'LHYPL',
  owner: 'Yuiandazucat',
  admin: ['Yuiandazucat'],
  id: location.pathname+textp,  
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
}else{
document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.8)');
document.body.style.background = "rgba(86,86,86)";
}
})

