const GameCharacter = document.getElementById("Game_character");
const GameCollide = document.getElementById("Game_collide");
const GameBox = document.getElementById("Game_box");
const gameScore = document.getElementById("game_score");
const OpenGame = document.getElementById("Open_game");
const gameScoreHistory = document.getElementById("game_score_history");
let GameScore = 0;
let GameCondition = false;//默认false
let ifFirstOpen = true;


window.onclick = () =>{
    if(GameCondition){
    GameCharacter.className = "CharacterJumpOpen";
    GameCollide.className = "CharacterJumpOpen";
    GameCharacter.addEventListener("animationend", ()=>{
    GameCharacter.className = "CharacterJumpPaused";
    GameCollide.className = "CharacterJumpPaused";
    });
    }
}



let SpaceTime =  1000;

function generate(){
setTimeout(()=>{
if(!GameCondition){
return
}
let Img = document.createElement("img");
Img.src = "game_1.png";
Img.className="Game_obstacle1";

Img.addEventListener("animationend", ()=>{
Img.remove();
});
GameBox.appendChild(Img);
SpaceTime =  (Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
generate();
},SpaceTime);
}


function senseCollide(){
if(!GameCondition){
return
}
let Character = GameCollide.getBoundingClientRect();


document.querySelectorAll('.Game_obstacle1').forEach(el => {
let Obstacle = el.getBoundingClientRect();
if(Character.bottom-5>Obstacle.top){
if(Obstacle.left-Character.right<-2&&(Character.left-Obstacle.right)<-2){
if(GameScore>localStorage.GameScore||!localStorage.GameScore){
gameScoreHistory.innerText =`歴史最佳 ${GameScore}`;
localStorage.GameScore=GameScore;
}
document.querySelectorAll('.Game_obstacle1').forEach(el => {
el.remove();
})
GameCharacter.className = "CharacterJumpPaused";
    GameCollide.className = "CharacterJumpPaused";
    GameCondition = false;
    gameScore.innerText = `当前分数 ${GameScore}`
    GameCharacter.src="game_2.png"
    OpenGame.style.display="inline";
return
}
}
if((Character.left-Obstacle.right)>-2&&!el.ifGameScore&&GameCondition){
GameScore++
gameScore.innerText = `当前分数 ${GameScore}`
el.ifGameScore = true;

GameBox.style.setProperty('--difficulty', `${(3-parseInt(GameScore/10)*0.2)}s`);



}
})



window.requestAnimationFrame(()=>senseCollide())
}


if(localStorage.GameScore){
gameScoreHistory.innerText =`歴史最佳 ${localStorage.GameScore}`;
}


OpenGame.onclick = () =>{
OpenGame.style.display="none";
GameCharacter.src="game_3.gif";
GameCondition = true;
GameScore=0;
gameScore.innerText = `当前分数 0`
SpaceTime =  1000;
senseCollide();
generate();
}


GameCharacter.onclick = () =>{
if(!ifFirstOpen){
return
}

let loadList =["game_3.gif","game_1.png","game_2.png"]
let i = 0;
for(let list in loadList){
let img = new Image();
img.src = loadList[list];
img.onload = () =>{
i++
if(i>=loadList.length){
ifFirstOpen=false;
gameScore.style.display="inline";
GameBox.style.background="#93FF95";
document.getElementById("game_ground").style.background="green";
document.getElementById("pointOut").remove();
GameBox.style.boxShadow="inset -2px -2px 4px #aaaa,inset 2px 2px 4px #aaaa";
gameScoreHistory.style.display="inline";
GameCharacter.src="game_3.gif";
GameCondition = true;
GameScore=0;
gameScore.innerText = `当前分数 0`
senseCollide();
generate();
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