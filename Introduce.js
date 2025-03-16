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
/*

*/

window.onload = () =>{          
    if(document.getElementById('first_box')){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    }   
        
}
let BodyText = [[`
<h2>信息</h2>
            <ul>
            <li>出生日: 2009.9.18</li>
            <li>性别: 男</li>
            <li>姓氏: 林</li>
            <li>名字: 海扬</li>
            <li>国籍: 中华人民共和国(China)</li>
            <li>居住地: 广东省</li>
            <li>民族: 汉族</li>
            </ul>
`,`<h2>个性</h2>
            <ul>
            <li>座右铭: 静心，尽力，进步</li>
            <li>喜爱的事物: 美好的东西</li>
            <li>性取向: 女</li>
            <li>个性签名: ( - ω - )</li>
            <li>爱好: 看番</li>
            <li>能力: 书法、乒乓球、前端开发</li>
            <li>自以为群体: 秋原系</li>
            </ul>`,`<h2>喜爱的音乐</h2>
            `],[`
<h2>信息</h2>
            <ul>
            <li>出生日: 2009.9.18</li>
            <li>性別: 男</li>
            <li>姓氏: 林</li>
            <li>名字: 海揚</li>
            <li>國籍: 中華人民共和國(China)</li>
            <li>居住地: 廣東省</li>
            <li>民族: 漢族</li>
            </ul>
`,`<h2>個性</h2>
            <ul>
            <li>座右銘: 靜心，盡力，進步</li>
            <li>喜愛的事物: 美好的東西</li>
            <li>性取向: 女</li>
            <li>個性簽名: ( - ω - )</li>
            <li>愛好: 看番</li>
            <li>能力: 書法、乒乓球、前端開發</li>
            <li>自以爲群體: 秋原系</li>
            </ul>`,`<h2>喜愛的音樂</h2>
            `],[`
<h2>情報</h2>
            <ul>
            <li>誕生日: 2009.9.18</li>
            <li>性別: 男</li>
            <li>氏: 林</li>
            <li>名前: 海揚</li>
            <li>国籍: 中国(China)</li>
            <li>住所: 広東省</li>
            <li>民族: 漢族</li>
            </ul>
`,`<h2>个性</h2>
            <ul>
            <li>座右の銘: 心を静める、努力する、進歩する</li>
            <li>好きなもの: 美しいもの</li>
            <li>性的指向: 女</li>
            <li>個性的なサイン: ( - ω - )</li>
            <li>趣味: アニメーション</li>
            <li>スキル: 書道、卓球、フロントエンド開発</li>
            <li>私のサークル: オタク</li>
            </ul>`,`<h2>好きな音楽</h2>
            `],[`
<h2>Information</h2>
            <ul>
            <li>Birthday: 2009.9.18</li>
            <li>Gender: man</li>
            <li>Last name: Ling</li>
            <li>First name: Haiyang</li>
            <li>Country: China</li>
            <li>Place of residence: Guangdong Province</li>
            <li>Nation: the Han nationality</li>
            </ul>
`,`<h2>Personality</h2>
            <ul>
            <li>Motto:Keep my cool,Do all I can,Make progress</li>
            <li>Favorite things: beautiful things</li>
            <li>Sexual orientation:  woman</li>
            <li>Personalized Signature: ( - ω - )</li>
            <li>hobbies: watching animations </li>
            <li>Skill: calligraphy、table tennis、Front-end Development</li>
            <li>My group: animation fan</li>
            </ul>`,`<h2>Favorite music</h2>
            `]];
function ChoseLangage(Lang){
let BodyTextN = 0;
document.querySelectorAll(".textBlock , .body_box .textBlock").forEach(item => {
            item.innerHTML = BodyText[Lang][BodyTextN];
            BodyTextN++
})
}
ChoseLangage(0)


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