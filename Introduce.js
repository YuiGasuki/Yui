let pcpicture  = (Math.floor(Math.random() * (23 - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (21 - 1 + 1)) + 1);
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


window.onload = () =>{          
    if(document.getElementById('first_box')){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    }   
        
}

function ChoseLangage(Lang){
let BodyTextN = 0;
fetch(`${Lang}.json`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
let BodyText = data;
document.querySelectorAll(".textBlock , .body_box .textBlock").forEach(item => {
            item.innerHTML = BodyText[BodyTextN];
            BodyTextN++
})


});
}
ChoseLangage('sc')


var Azuplayer = new player({
id:"azucat",
width:"300px",
fontSize:"",//默认按比例缩放
fontFamily:"GenEiKoburiMin6, serif, Georgia ,'Palatino Linotype', 'Book Antiqua','Times New Roman', Times;",
url:[{
            url:"http://music.163.com/song/media/outer/url?id=514543069.mp3",
            title:"天使にふれたよ",
            singer:"放課後ティータイム",
            cover:"http://p1.music.126.net/e1n_xjLFAm_GY8ZETmka4g==/109951163048673023.jpg?param=300x300"
        },{
            url:"http://music.163.com/song/media/outer/url?id=1440363251.mp3",
            title:"幸せ願う彼方から",
            singer:"神前暁,島本須美",
            cover:"http://p2.music.126.net/PDrnLyzT7-If6c83U-bPDQ==/109951164903215580.jpg?param=300x300"
        }]
});