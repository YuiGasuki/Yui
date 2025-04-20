const BodyBox = document.getElementById("body_box");
const ButtonBox = document.getElementById("button_box");
const params = new URLSearchParams(location.search);
let textp=params.get('p');

fetch('video.json', {
    method: 'GET'
}).then(response => response.json()).then(data => {
    data.reverse();
    if(textp===null||textp==="0"){
    textp=1;
    }
    textp=1*textp;
    document.getElementById("pages_p").innerHTML = `第 <span>${textp}</span> 页`;
    let maxp = 8;//每页视频数
    for (let i =  maxp * (textp-1); i <= (maxp - 1) * textp; i++) {
        if(i<data.length){
        BodyBox.innerHTML += `
        <div class="video_box" onclick="JavaScript:window.location.href='videoPlay.html?vid=${data[i].vid}'">
            <img src="cover/${data[i].vid}.jpg" />
            <p>${data[i].title}</p>
        </div>
        `;
        }else{
            ButtonBox.innerHTML += `
            <button onclick="JavaScript:window.location.href='?p=${textp-1}'">上一页</button>
            `;
            return
        }
    }
    if(textp===1){
    ButtonBox.innerHTML += `
            <button onclick="JavaScript:window.location.href='?p=${textp+1}'">下一页</button>
     `;
    return
    }
    ButtonBox.innerHTML += `
            <button onclick="JavaScript:window.location.href='?p=${textp-1}'">上一页</button>
            <button onclick="JavaScript:window.location.href='?p=${textp+1}'">下一页</button>
     `;
})