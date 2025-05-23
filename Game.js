const GameCharacter = document.getElementById("Game_character");
const GameCollide = document.getElementById("Game_collide");
const GameBox = document.getElementById("Game_box");
const gameScore = document.getElementById("game_score");
const OpenGame = document.getElementById("Open_game");
const GameBackgroundImg = document.getElementById("Game_background_img");
const GameBackground = document.getElementById("Game_background");
const gameScoreHistory = document.getElementById("game_score_history");
const audioT = document.getElementById("A2");
let GameScore = 0;
let GameCondition = false;//默认false
let ifFirstOpen = true;

window.onclick = () =>characterJump();
window.onmousedown = () =>characterJump();
window.ontouchstart = () =>characterJump();

function characterJump(){
if(GameCondition){

    GameCharacter.className = "CharacterJumpOpen";
    GameCollide.className = "CharacterJumpOpen";
    GameCharacter.addEventListener("animationend", ()=>{
    GameCharacter.className = "CharacterJumpPaused";
    GameCollide.className = "CharacterJumpPaused";
    });
    }
}




let setGenerate = null;
function generate(SpaceTime){
if(!GameCondition){
return
}
setGenerate = setTimeout(()=>{
let Img = document.createElement("img");

if(GameScore>=120){
setGenerate = setTimeout(()=>{
Img.src = "game_6.png";
Img.className="Game_obstacle3";
GameBox.appendChild(Img);
},1500);
return
}


if((Math.floor(Math.random() * (5 - 2 + 1)) + 2)==4&&GameScore>=10){
Img.src = "game_4.png";
Img.className="Game_obstacle2";
}else{
Img.src = "game_1.png";
Img.className="Game_obstacle1";
}



if(parseInt((GameScore+2)/10)==((GameScore+2)/10)){

Img.addEventListener("animationend", ()=>{
Img.remove();


let a =  (parseInt(GameScore/10)*100);
if(a>500) a=500;
GameBox.style.setProperty('--difficulty', `${(3-parseInt(GameScore/10)*0.2)}s`);
generate((Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000 - a));

});
GameBox.appendChild(Img);


}else{

Img.addEventListener("animationend", ()=>{
Img.remove();
});
GameBox.appendChild(Img);


let a =  (parseInt(GameScore/10)*100);
if(a>500) a=500;
generate((Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000 - (a/2)));
}
},SpaceTime);
}


function senseCollide(){
if(!GameCondition){
return
}
let Character = GameCollide.getBoundingClientRect();



if(document.querySelector('.Game_obstacle3')!=null){
    let el = document.querySelector('.Game_obstacle3');
    let Obstacle = el.getBoundingClientRect();
    if(Obstacle.left<87&&GameCondition){
        GameWin(el);
    }
}






if(document.querySelector('.Game_obstacle1')!=null){
let el = document.querySelector('.Game_obstacle1');
let Obstacle = el.getBoundingClientRect();
if(Character.bottom-5>Obstacle.top){
if(Obstacle.left-Character.right<-2&&(Character.left-Obstacle.right)<-2){
GameEnd()
}
}
if((Character.left-Obstacle.right)>-2&&GameCondition){
el.className= "Game_obstacle_no1"
GameScore++
gameScore.innerText = `当前分数 ${GameScore}`
GameBackgroundImg.style.transition=`1.5s`;
GameBackgroundImg.style.marginLeft=`${0-GameScore}px`;
if(parseInt(GameScore/10)==GameScore/10){
audioT.play();
audioT.currentTime=0;
gameScore.className = "IncreaseDifficulty";
gameScore.addEventListener("animationend", ()=>{
gameScore.className = "a";
})
}

}
}



if(document.querySelector('.Game_obstacle2')!=null){
let el = document.querySelector('.Game_obstacle2');
let Obstacle = el.getBoundingClientRect();
if(Character.top<Obstacle.bottom){
if(Obstacle.left-Character.right<0&&(Character.left-Obstacle.right)<-10){
GameEnd()
}
}

if((Character.left-Obstacle.right)>-10&&GameCondition){
el.className = "Game_obstacle_no2";
GameScore++
gameScore.innerText = `当前分数 ${GameScore}`
GameBackgroundImg.style.transition=`1.5s`;
GameBackgroundImg.style.marginLeft=`${0-GameScore}px`;
if(parseInt(GameScore/10)==GameScore/10){
audioT.play();
audioT.currentTime=0;
}




}

}








window.requestAnimationFrame(()=>senseCollide())
}


if(localStorage.GameScore){
gameScoreHistory.innerText =`历史最佳 ${localStorage.GameScore}`;
}


OpenGame.onclick = () =>{
OpenGame.style.display="none";
GameCharacter.style.marginTop="0px";
GameBackgroundImg.style.transform="translate(0%) Scale(1)";
GameCharacter.src="game_3.gif";
GameCondition = true;
GameScore=0;
gameScore.innerText = `当前分数 0`
senseCollide();
generate(1000);
}



GameCharacter.onclick = () =>{
if(!ifFirstOpen){
return
}
let ifGetLongTime = setTimeout(()=>{
document.getElementById('first_box').style.opacity="1";
},300)
let loadList =["game_3.gif","game_1.png","game_2.png","game_4.png","game_5.png","game_6.png"]
let i = 0;
console.log(audioT.duration)
for(let list in loadList){
let img = new Image();
img.src = loadList[list];
img.onload = () =>{
i++
if(i>=loadList.length){
ifFirstOpen=false;
clearTimeout(ifGetLongTime);
document.getElementById('first_box').remove();
gameScore.style.display="inline";
GameBox.style.background="linear-gradient(#3C90CE, white)";
GameBackground.style.opacity="1";
document.getElementById("pointOut").remove();
GameBox.style.boxShadow="inset -1px 1px 5px 5px #aaaa";
gameScoreHistory.style.display="inline";
GameCharacter.style.marginTop="0px";
GameCharacter.src="game_3.gif";
GameCondition = true;
characterJump();
GameScore=0;
gameScore.innerText = `当前分数 0`
senseCollide();
generate(1000);
}
}
}





    
  
  



}


const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbox', '0.5');  
    document.documentElement.style.setProperty('--nightColor', 'white'); 
            document.documentElement.style.background = "#aaaaaa";
            return
        }
    }
    document.documentElement.style.setProperty('--nightbox', '0');
    document.documentElement.style.setProperty('--nightColor', 'black'); 
    document.documentElement.style.background = "#eee";
}

DarkMode();
const channel = new BroadcastChannel('Yui_night');
channel.addEventListener('message', (e) => {
DarkMode();
})



function GameEnd(){
if(GameScore>localStorage.GameScore||!localStorage.GameScore){
gameScoreHistory.innerText =`历史最佳 ${GameScore}`;
localStorage.GameScore=GameScore;
}
GameBackgroundImg.style.transition=`0.3s`;
GameBackgroundImg.style.marginLeft=`0px`;
document.querySelectorAll('.Game_obstacle1, .Game_obstacle2').forEach(el => {
el.remove();
})
clearTimeout(setGenerate)
GameCharacter.className = "CharacterJumpPaused";
    GameCollide.className = "CharacterJumpPaused";
    GameCondition = false;
    gameScore.innerText = `当前分数 ${GameScore}`;
    GameBackgroundImg.style.transform="translate(12%,-30%) Scale(1.6)";
    GameCharacter.style.marginTop="-21px";
    GameCharacter.src="game_2.png"
    OpenGame.style.display="inline";
    OpenGame.innerText="START";
    GameBox.style.setProperty('--difficulty', `3s`);
return
}


function GameWin(ell){
gameScoreHistory.innerText =`历史最佳 ${GameScore}`;
ell.remove();
document.querySelectorAll('.Game_obstacle1, .Game_obstacle2').forEach(el => {
el.remove();
})
clearTimeout(setGenerate)
GameCharacter.className = "CharacterJumpPaused";
    GameCollide.className = "CharacterJumpPaused";
    GameCondition = false;
    gameScore.innerText = `当前分数 ${GameScore}`;
    GameBackgroundImg.style.transform="translate(12%,-30%) Scale(1.6)";
    GameCharacter.style.marginTop="-21px";
    GameCharacter.src="game_2.png"
    OpenGame.style.display="inline";
    OpenGame.innerText="START-已通关";
    GameBox.style.setProperty('--difficulty', `3s`);
return
}