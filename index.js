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
        document.getElementById('background_img').style.filter="blur(10px)";
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





const bodyNtroduction = document.getElementById('body_ntroduction'),sideOpen = document.getElementById('side_open'),backTop = document.getElementById('back_top'),sideBox = document.getElementById('side_box'),headBox = document.getElementById('head_box'),sideBack = document.getElementById('side_back'),bodyInformation = document.getElementById('body_information'),BackGround = document.getElementById('background'),SearchText = document.getElementById("searchText"),musicButton = document.getElementById("music_button"),bodyPortrait = document.getElementById('body_portrait');





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
        if(div.querySelector(".titleimg").complete){
        div.querySelector(".titleimg").style.opacity=1;
        }else{
        div.querySelector(".titleimg").onload = () =>{
        div.querySelector(".titleimg").style.opacity=1;
        }
        };
        
        div.querySelector(".titleimg").addEventListener('error', () =>{
            div.querySelector(".titleimg").src = data[ic].title_url;
            div.querySelector(".titleimg").addEventListener('error', () =>{
                div.querySelector(".titleimg").src = "none.webp";
            });
        }, { once: true });
        document.getElementById('textBox').appendChild(div)
        }
        let div = document.createElement("div");
        div.id="getBook";
        
        
        
        document.getElementById('textBox').appendChild(div)
        
   
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
    if(document.documentElement.scrollTop/10 >= 0.34){
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
        if(((window.innerHeight-50)-document.documentElement.scrollTop)/10<=0.5){
        document.documentElement.scrollTop=window.innerHeight-50;
        return
        }
        PullDownB()
        },100);
}

function PullDownB() {
clearTimeout(goBackTotTopS);
if(document.documentElement.scrollTop < window.innerHeight-50){
if(this.Nun===0||!this.Nun){
this.Nun=((window.innerHeight-50)-document.documentElement.scrollTop)/10;
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
if(document.documentElement.scrollTop > (window.innerHeight - 51)){
backTop.style.transform = "translateY(0%)";
headBox.style.transform = "translateY(0%)";
headBox.style.opacity = "1";
backTop.style.opacity = "1";
backTop.style.pointerEvents = "auto";
backTop.style.opacity = "1";
}else if(document.documentElement.scrollTop <= (window.innerHeight - 51)){
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
        document.getElementById('background_img').style.filter="blur(10px)";
        setTimeout(()=>{
            changePicture.style.pointerEvents="auto";
        },800);
        },800);
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
    PopUp("⚠️ 输入不能为空");
     }else{
    window.open("search.html?q=" + SearchText.value);
    }
}

(function (){
let audio = new Audio("musicBlackboard.mp3");
audio.loop = true;
audio.onpause=()=>{
musicButton.style.setProperty('--animationPlayState', `none`);
}
audio.onplay=()=>{
musicButton.style.setProperty('--animationPlayState', `musicPlay 3s ease-in infinite`);
}


audio.oncanplay=()=>{
musicButton.onclick = () =>{
if(audio.paused){
audio.play()
}else{
audio.pause();
}
}
}

}());



const announcement = document.getElementById('announcement_p');


(function(){
let announcementData = `
! 本站是供站长(下文称"我")学习使用，图片素材来自网络，并非商用。无意侵犯贵方的利益请<a href="mailto:2528197707@qq.com">联系我</a>(<a href="mailto:l2528197707@gmail.com">备用邮箱</a>)，我将在48小时内进行删除。
☆ 开源地址<a href="https://github.com/YuiGasuki/Yui">Github</a> 本站为静态网站，仅供展示我的学习成果，静态托管在<a href="https://github.com/">Github</a>
✎.本次更新内容: 修改了已知BUG
`;

/*
The website is for use in study in myself.All pictures are from Internet in the website. The website is intended for non-commercial.If I violate the rights of you,You can <a href="mailto:2528197707@qq.com">contact me</a>(<a href="mailto:l2528197707@gmail.com">Reserve mail</a>).I will delete its before two days.
*/

let DateTime = new Date();
let Day = DateTime.getUTCDate();
let Month = DateTime.getMonth()+1;
let DateData = "";
let searchEngine = "https://baike.baidu.com/item/";


switch(Month)
{
    case 1:
        switch(Day)
        {
            case 7:
                DateData+=`🎂 今天是<a href="${searchEngine}久石奏">久石奏</a>的生日`;
                break;
            case 15:
                DateData+=`🎂 今天是<a href="${searchEngine}秋山澪">秋山澪</a>的生日`;
                break;
        }
        break;
    case 2:
        switch(Day)
        {
            case 22:
                DateData+=`🎂 今天是<a href="${searchEngine}平泽忧">平泽忧</a>的生日`;
                break;
        }
        break;
    case 4:
        switch(Day)
        {
            case 2:
                DateData+=`🎂 今天是<a href="${searchEngine}朝雾史织">朝雾史织</a>的生日`;
                break;
        }
        break;
    case 5:
        switch(Day)
        {
            case 1:
                DateData+=`🎉 国际劳工节快乐！！！`;
                break;
            case 28:
                DateData+=`🎂 今天是<a href="${searchEngine}泉此方">泉此方</a>的生日`;
                break;
        }
        break;
    case 6:
        switch(Day)
        {
            case 3:
                DateData+=`🎂 今天是<a href="${searchEngine}千石抚子">千石抚子</a>的生日`;
                break;
        }
        break;
    case 7:
        switch(Day)
        {
            case 2:
                DateData+=`🎂 今天是<a href="${searchEngine}琴吹紬">琴吹紬</a>的生日`;
                break;
            case 7:
                DateData+=`🎂 今天是<a href="${searchEngine}樱庭葵">樱庭葵</a>的生日`;                
                document.documentElement.style.setProperty('--ThemeColor',"#8583CE");
                break;
            case 18:
                DateData+=`✿ 悼念京阿尼纵火案中逝去的36名创作者`;
                PopUp(`✿ 悼念纵火案中逝去的创作者`);
                break;
        }
        break;
    case 8:
        switch(Day)
        {
            case 21:
                DateData+=`🎂 今天是<a href="${searchEngine}田井中律">田井中律</a>的生日
                🎂 今天是<a href="${searchEngine}黄前久美子">黄前久美子</a>的生日`;
                break;
        }
        break;
    case 9:
        switch(Day)
        {
            case 3:
                DateData+=`🎂 今天是<a href="${searchEngine}哆啦A梦七小子">哆啦七小子</a>共同的生日`;
                break;
            case 18:
                DateData+=`🎂 今天是站长生日`;
                break;
            case 23:
                DateData+=`✿ <a href="${searchEngine}藤子·F·不二雄">藤子·F·不二雄老师</a>一路走好`;
                break;
            case 29:
                DateData+=`✿ <a href="${searchEngine}大山羡代">大山羡代老师</a>一路走好`;
                break;
        }
        break;
    case 10:
        switch(Day)
        {
            case 1:
                DateData+=`🇨🇳国庆节快乐！！！`;
                break;
            case 3:
                DateData+=`🎂 今天是<a href="${searchEngine}鹿目圆">鹿目圆</a>的生日`;
                break;
            case 25:
                DateData+=`🎂 今天是<a href="${searchEngine}高良美幸">高良美幸</a>的生日`;
                break;
            case 27:
                DateData+=`✿ <a href="${searchEngine}松来未祐">松来未祐老师</a>一路走好`;
                break;
        }
        break;
    case 11:
        switch(Day)
        {
            case 11:
                DateData+=`🎂 今天是<a href='${searchEngine}中野梓'>中野梓</a>的生日`;
                break;
            case 27:
                DateData+=`🎂 今天是<a href='${searchEngine}平泽唯'>平泽唯</a>的生日`;
                break;
        }
        break;
    case 12:
        switch(Day)
        {
            case 31:
                DateData+=`🎂 今天是<a href='${searchEngine}北白川玉子'>北白川玉子</a>的生日`;
                break;
        }
        break;
}

announcement.innerHTML = `${DateData}${announcementData}`;

}());
