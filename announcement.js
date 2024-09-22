const announcement = document.getElementById('announcement_p');

(function(){
let announcementData = `
! 本站是供站长(下文称"我")学习使用，图片素材来自网络，并非商用。无意侵犯贵方的利益请<a href="mailto:2528197707@qq.com">联系我</a>(<a href="mailto:l2528197707@gmail.com">备用邮箱</a>)，我将在48小时内进行删除。
☆ 开源地址<a href="https://github.com/YuiGasuki/Yui">Github</a> 本站为静态网站，仅供展示我的学习成果，静态托管在<a href="https://github.com/">Github</a>
✎.本次更新内容: 更新了「布告栏」、修改了出现乱码的BUG`;
let DateTime = new Date();
let Day = DateTime.getUTCDate();
let Month = DateTime.getMonth()+1;
let Hours = DateTime.getHours();
let DateData = "";

if (Day===18&&Month===9) DateData+=`✿ 九一八事变，勿忘国耻、铭记历史
🎂 今天是站长生日`;
if (Day===27&&Month===11) DateData+=`🎂 今天是<a href='https://mzh.moegirl.org.cn/平泽唯'>平泽唯</a>的生日`;
if (Day===11&&Month===11) DateData+=`🎂 今天是<a href='https://mzh.moegirl.org.cn/中野梓'>中野梓</a>的生日`;
if (Day===27&&Month===10) DateData+=`✿ <a href="https://mzh.moegirl.org.cn/松来未祐">松来未祐</a>一路走好`;
if (Day===15&&Month===1) DateData+=`🎂 今天是<a href="https://mzh.moegirl.org.cn/秋山澪">秋山澪</a>的生日`;
if (Day===15&&Month===1) DateData+=`🎂 今天是<a href="https://mzh.moegirl.org.cn/田井中律">田井中律</a>的生日`;
if (Day===2&&Month===7) DateData+=`🎂 今天是<a href="https://mzh.moegirl.org.cn/琴吹紬">琴吹紬</a>的生日`;


announcement.innerHTML = `${DateData}${announcementData}`;

}());