const announcement = document.getElementById('announcement_p');


(function(){
let announcementData = `
! 本站是供站长(下文称"我")学习使用，图片素材来自网络，并非商用。无意侵犯贵方的利益请<a href="mailto:2528197707@qq.com">联系我</a>(<a href="mailto:l2528197707@gmail.com">备用邮箱</a>)，我将在48小时内进行删除。
☆ 开源地址<a href="https://github.com/YuiGasuki/Yui">Github</a> 本站为静态网站，仅供展示我的学习成果，静态托管在<a href="https://github.com/">Github</a>
✎.本次更新内容: 修改了已知BUG`;
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