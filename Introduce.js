let pcpicture  = (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
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

var Azuplayer = new player({
id:"azucat",
width:"300px",
fontSize:"",//默认按比例缩放
fontFamily:'GenEiKoburiMin6, serif, Georgia ,"Palatino Linotype", "Book Antiqua","Times New Roman", Times;',
url:{
            url:"http://music.163.com/song/media/outer/url?id=514543069.mp3",
            title:"相遇天使",
            singer:"放學後茶會",
            cover:"http://p1.music.126.net/e1n_xjLFAm_GY8ZETmka4g==/109951163048673023.jpg?param=300x300"
        }
});


window.onload = () =>{          
    if(document.getElementById('first_box')){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    }   
        
}