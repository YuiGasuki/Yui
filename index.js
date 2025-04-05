let pcpictureN = 23;
let anpictureN = 30;
let pcpicture  = (Math.floor(Math.random() * (pcpictureN - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (anpictureN - 1 + 1)) + 1);

const changePicture = document.getElementById('change_picture');

let loadAntiShake = null;
function KillFirstBox(){
    clearTimeout(loadAntiShake);    
    if(document.getElementById('first_box')){
    TouchsOpan();
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    }
}
function replacepicture() {
    loadAntiShake =  setTimeout(()=>{
    if(!document.getElementById('first_box')){
    let firstaBox = document.createElement("div");
    firstaBox.id="first_box";
    let firstaBoxP = document.createElement("p");
    firstaBoxP.innerText = "少女祈祷中";
    firstaBox.appendChild(firstaBoxP);
    document.body.appendChild(firstaBox);
    document.body.style.overflow="hidden";
    }
    },300);
    if(window.innerHeight <= window.innerWidth){
        document.getElementById('background_img').src = "p_" + pcpicture + ".webp";
    }else{
        document.getElementById('background_img').src = "b_" + anpicture + ".webp";
    }
    document.getElementById('background_img').onload = () => {
        KillFirstBox();
        document.getElementById('background_img').style.display="inline";
        setTimeout(()=>{
        changePicture.style.animationPlayState="paused";
        document.getElementById('background_img').style.filter="blur(0px)";
        setTimeout(()=>{
            changePicture.style.pointerEvents="auto";
        },800);
        },800);
    }
   document.getElementById('background_img').onerror = () => {
        KillFirstBox();
        document.getElementById('background_img').style.display="none";
   }
}

let ifDarkMode = false;
const idDarkMode = document.getElementById('dark_mode');


replacepicture();
window.addEventListener('resize', replacepicture);


document.querySelectorAll(".load").forEach(item => {
    let img = new Image();
    img.src = item.src;
});


if(localStorage.ThemeColor){
    document.documentElement.style.setProperty('--ThemeColor',localStorage.ThemeColor);
}



const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,1)');
            document.documentElement.style.setProperty('--nightbox', '0.5');   
            document.documentElement.style.setProperty('--nightTitleground', 'rgba(86,86,86,0.8)');  
            document.documentElement.style.setProperty('--nightfcolor', '#aaaaaa');
            idDarkMode.style.setProperty('--leftData', '13px');
            document.documentElement.style.setProperty('--QuasiphysicalA', '#6f6f6f');
    document.documentElement.style.setProperty('--QuasiphysicalB', 'rgb(60,60,60)');
            idDarkMode.style.setProperty('--divBackGround', getComputedStyle(document.documentElement).getPropertyValue('--ThemeColor'));
    
            ifDarkMode = true;
            return
        }
    }
    document.documentElement.style.setProperty('--nightbackground', '#F1F1F1');
    document.documentElement.style.setProperty('--nightbox', '0');
    document.documentElement.style.setProperty('--QuasiphysicalA', 'white');
    document.documentElement.style.setProperty('--QuasiphysicalB', '#aaaaaa');
    document.documentElement.style.setProperty('--nightTitleground', 'rgba(241,241,241,0.8)');  
    document.documentElement.style.setProperty('--nightfcolor', '#606266');
    idDarkMode.style.setProperty('--leftData', '-4px');
    idDarkMode.style.setProperty('--divBackGround', '#aaaaaa');
    ifDarkMode = false;
    
}

DarkMode();
const channel = new BroadcastChannel('Yui_night');

// channel.postMessage({
    // Type: 3
// })

channel.addEventListener('message', (e) => {
if(e.data.Type===0){
DarkMode()
}else if(e.data.Type===3){
if(localStorage.ThemeColor){
    document.documentElement.style.setProperty('--ThemeColor',localStorage.ThemeColor);
}
}
})





const bodyNtroduction = document.getElementById('body_ntroduction'),sideOpen = document.getElementById('side_open'),backTop = document.getElementById('back_top'),sideBox = document.getElementById('side_box'),headBox = document.getElementById('head_box'),sideBack = document.getElementById('side_back'),bodyInformation = document.getElementById('body_information'),BackGround = document.getElementById('background'),SearchText = document.getElementById("searchText");





fetch('1.json', {
    method: 'GET'
}).then(response => response.json()).then(data => {
    let DataList = [];
    for (let i = data.length - 1; i >= 0; i = i - 1) {
        if(data[i].type==="1"){
        continue
        }
        DataList.push(data[i]);
    }
    data=DataList;
    
    let i = 0;
    const setUpBook = () =>{
                let textAgin = "";
                let cacheNumber = 4;
        for (let ic = (i*cacheNumber); ic < ((i*cacheNumber)+cacheNumber)&&ic<data.length; ic++) {
        let b = "";
        for(let ib = 0; ib < data[ic].label.length; ib++){
            b += `<span>` + data[ic].label[ib] + `</span>`;
        }
        let div = document.createElement("div");
        div.innerHTML = `
            <img src="${data[ic].title_url}" class="titleimg"  />
            <p class="title">${data[ic].title}</p>
            <p class="label">${b}</p>
        `;
        div.className = "ntroduction";
        div.onclick = () =>{
        window.open(`essay.html?Yui=${data[ic].Yui}`);
        }
        
        div.querySelector(".titleimg").addEventListener('error', () =>{
            div.querySelector(".titleimg").src = data[ic].title_url;
            div.querySelector(".titleimg").addEventListener('error', () =>{
                div.querySelector(".titleimg").src = "none.webp";
            });
        }, { once: true });
        bodyNtroduction.appendChild(div)
        }
        let div = document.createElement("div");
        div.id="getBook";
        
        
        
        bodyNtroduction.appendChild(div)
        
   
        i++;
    }  
    
    const io = new IntersectionObserver((item) =>{
            if(item[0].isIntersecting){
                if(i>=data.length){
                   io.unobserve(document.getElementById('getBook'));
                    document.getElementById('getBook').remove();
                    return
                }
                setUpBook();
                document.getElementById('getBook').remove();
                io.observe(document.getElementById('getBook'));

                
            }
        });
    io.observe(document.getElementById('getBook'));

    document.querySelectorAll(".titleimg").forEach(item => {
        item.addEventListener('error', () =>{
            item.src = item.src;
            item.addEventListener('error', () =>{
                item.src = "none.webp";
            });
        }, { once: true });
    });


    if (bodyNtroduction.style.display === "inline") {
        document.querySelectorAll(".ntroduction")
            .forEach(item => {
            if (item.style.opacity != "1") {
                item.style.transition = "0.5s";
                item.style.opacity = "1";
                item.style.marginTop = "0px";
            }
        });
    }
});


idDarkMode.onclick = () =>{
    if(ifDarkMode){

        document.cookie="darkmode=false; max-age:2592000";
        DarkMode();
        channel.postMessage({
    	Type:0
        })
        ifDarkMode = false;
    }else{
        
        document.cookie="darkmode=true; max-age:2592000";
        DarkMode();
        channel.postMessage({
    	Type:1
        })
        ifDarkMode = true;
    }
}




function ent(ev) {
    ev = ev || window.event
    if (ev.keyCode == "13") {
        openfeel()
    }
}

function openfeel() {    
    if(SearchText.value.trim()===""){
        return
     }
    window.open("search.html?q=" + SearchText.value);
    
}





/**
 *返回顶部的动画
 *@author Yui_ <2528197707@qq.com>
 */
let goBackTotTopS = null;
let PullDownS = null;
const goBackTotTop = () =>{
        goBackTotTopS =  setTimeout(()=>{
        goBackTotTopB();
        },100);
}

const goBackTotTopB = () =>{
    clearTimeout(PullDownS);
    if(document.documentElement.scrollTop > 0){
            document.documentElement.scrollTop = document.documentElement.scrollTop - (document.documentElement.scrollTop/10);  
            document.body.style.overflow="hidden";
            window.requestAnimationFrame(goBackTotTopB)
    }else{
        document.body.style.overflow="auto";
    }
}


/**
 *下拉动画
 *@author Yui_ <2528197707@qq.com>
 */
function PullDown() {
   PullDownS =  setTimeout(()=>{
        if(((screen.height-50)-document.documentElement.scrollTop)/10<=0.5){
        document.documentElement.scrollTop=screen.height-50;
        return
        }
        PullDownB()
        },100);
}

function PullDownB() {
clearTimeout(goBackTotTopS);
if(document.documentElement.scrollTop < screen.height-50){
if(this.Nun===0||!this.Nun){
this.Nun=((screen.height-50)-document.documentElement.scrollTop)/10;
}
if(this.Nun<=0.5){
document.documentElement.scrollTop= document.documentElement.scrollTop + this.Nun;
}else{
document.documentElement.scrollTop = document.documentElement.scrollTop + this.Nun;
this.Nun = 0;
}
            document.body.style.overflow="hidden";
            
            window.requestAnimationFrame(PullDownB)
    }else{
        document.body.style.overflow="auto";
        this.Nun = 0;
    }
    
}

window.onscroll = function() {

if(document.documentElement.scrollTop > (screen.height - 51)){
backTop.style.transform = "translateY(0%)";
headBox.style.transform = "translateY(0%)";
headBox.style.opacity = "1";
backTop.style.opacity = "1";
backTop.style.pointerEvents = "auto";
backTop.style.opacity = "1";
}else if(document.documentElement.scrollTop <= (screen.height - 51)){
backTop.style.transform = "translateY(50%)";
headBox.style.transform = "translateY(-200%)";
headBox.style.opacity = "0";
backTop.style.opacity = "0";
backTop.style.pointerEvents = "none";
}
}

sideOpen.onclick = () =>{       
    sideBox.style.setProperty('--thisLeft', `255px`);
    sideBack.style.display="inline";
    document.body.style.overflow="hidden";
}
sideBack.onclick = () =>{
    sideBox.style.setProperty('--thisLeft', `0px`);
    sideBack.style.display="none";
    document.body.style.overflow="auto";
}
backTop.onclick = () =>{
    goBackTotTop();
}

const TouchsOpan = () =>{
window.addEventListener('touchstart',(e)=>{
this.x = e.changedTouches[0].pageX;
this._x = Number(getComputedStyle(sideBox).getPropertyValue('--thisLeft').slice(0, length-2));
this.ifclick = false;
})
window.addEventListener('touchmove',(e)=>{
if(Math.abs(this.x-e.touches[0].clientX)>50){
this.ifclick = true;
}else{
return
}
this.disx =this._x + (e.touches[0].clientX - this.x);
if (this.disx>255) this.disx = 255;
if (this.disx<=0) this.disx = 0;
document.body.style.overflow="hidden";
sideBox.style.setProperty('--thisLeft', `${this.disx}px`);
})
window.addEventListener('touchend',(e)=>{
if(!this.ifclick){
return
}
if(this.disx<125){
sideBox.style.setProperty('--thisLeft', `0px`);
sideBack.style.display="none";
document.body.style.overflow="auto";
}else{
sideBox.style.setProperty('--thisLeft', `255px`);
sideBack.style.display="inline";
}
})
}


const warnBox = document.getElementById('warn_box');
let ifPopUp;
function PopUp(text){    
    if(!this.CanSee){
    warnBox.innerText=text;
    warnBox.style.transform="translateX(0%)";
    ifPopUp = setTimeout(()=>{
        this.CanSee = true;
        ifPopUp = setTimeout(()=>{
            warnBox.style.transform="translateX(100%)";
            ifPopUp = setTimeout(()=>{
                this.CanSee = false;
            },500)   
        },8000)
    },500)       
}else{
    warnBox.style.transform="translateX(100%)";   
    clearTimeout(ifPopUp); 
    setTimeout(()=>{
        this.CanSee = false;
        PopUp(text)
    },500)
}
}



window.onload = () => {
KillFirstBox();
if(new Date().getHours()>22||new Date().getHours()<4){
        PopUp("💤 夜深了");
    }
    bodyInformation.style.pointerEvents = "auto";
    bodyInformation.style.opacity="1";
    bodyInformation.style.transform="rotateX(0deg)";
}


changePicture.onclick = () =>{
    changePicture.style.animationPlayState="running";
    changePicture.style.pointerEvents="none";
    document.getElementById('background_img').style.filter="blur(50px)";
    setTimeout(()=>{
    if(window.innerHeight <= window.innerWidth){
        pcpicture = (Math.floor(Math.random() * (pcpictureN - 1 + 1)) + 1);
        document.getElementById('background_img').src = "p_" + pcpicture + ".webp";
    }else{
        anpicture = (Math.floor(Math.random() * (anpictureN - 1 + 1)) + 1);
        document.getElementById('background_img').src = "b_" + anpicture + ".webp";
    }
    },800);
    document.getElementById('background_img').onload = () =>{   
    setTimeout(()=>{
        changePicture.style.animationPlayState="paused";
        document.getElementById('background_img').style.filter="blur(0px)";
        setTimeout(()=>{
            changePicture.style.pointerEvents="auto";
        },800);
        },800);
    }
}