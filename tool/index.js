const imgBox = document.getElementById('img_box');
let ImgList = [[],[],[]];
let rn= 0;
function changeList(){
ImgList = [[],[],[]];
let m = (Math.floor(Math.random() * (7 - 1 + 1)) + 1);
let r = (Math.floor(Math.random() * (7 - 1 + 1)) + 1);
rn = (Math.floor(Math.random() * (6 - 3 + 1)) + 3)
imgBox.innerHTML="";
let li=0;
for(let i=0;i<3;i++){
for(let bi=0;bi<3;bi++){
if((Math.floor(Math.random() * (2 - 1 + 1)) + 1)===1&&li<rn){
if(r==8){
r=1;
}
ImgList[i].push(1)
imgBox.innerHTML+=`<img src="r_${r}.png" onclick="Right(${i},${bi},this)" />`;
r++
li++;
}else{
if(m==8){
m=1
}
ImgList[i].push(0)
imgBox.innerHTML+=`<img src="m_${m}.png" onclick="changeList()" />`;
m++
}
}
}
}
changeList()


function Right(i,bi,ul){
ImgList[i][bi]=0;
ul.style.opacity = 0;
}

function verification(){
for(let i=0;i<3;i++){
for(let bi=0;bi<3;bi++){
if(ImgList[i][bi]==1){
alert(`人机はだめ`)
return
}
}
}
alert("验证成功")
}