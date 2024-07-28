let pcpicture  = (Math.floor(Math.random() * (2 - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
console.log(document.cookie)
let portraitNumber = 6;//头像的总数
function replacepicture() {
    console.log(window.innerHeight)
    console.log(window.innerWidth)
    if(window.innerHeight <= window.innerWidth){
        document.body.style.backgroundImage = "url('p_" + pcpicture + ".webp')";
    }else{
        document.body.style.backgroundImage = "url('b_" + anpicture + ".webp')";
    }
}
replacepicture();
window.addEventListener('resize', replacepicture);

localStorage.clear();




const TypingAnimation = (e, name, present, i) => {
    if (present === '') {
        present = name[i];
    } else {
        if (i >= name.length - 2) {
            present += name[i + 1];
            document.getElementById('body_name')
                .innerHTML = present;
            return
        }
        present += name[i + 1];
        i++;
    }
    document.getElementById('body_name')
        .innerHTML = present + '|';
    setTimeout(() => {
        TypingAnimation(e, name, present, i)
    }, 400)
}
TypingAnimation(document.getElementById('body_name'), document.getElementById('body_name')
    .innerHTML, "", 0);


const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,0.8)');
            document.documentElement.style.setProperty('--nightbox', '0.5');  
        }else{
            document.documentElement.style.setProperty('--nightbackground', 'rgba(255,255,255,0.8)');
            document.documentElement.style.setProperty('--nightbox', '0');
        }
    }else{
        document.documentElement.style.setProperty('--nightbackground', 'rgba(255,255,255,0.8)');
            document.documentElement.style.setProperty('--nightbox', '0');
    }
}

DarkMode();
const channel = new BroadcastChannel('Yui_night');

// channel.postMessage({
    // Type: 3
// })

channel.addEventListener('message', (e) => {
DarkMode()
})





let portrait = 1;
const bodyInformation = document.getElementById('body_ntroduction');
const bodyPortrait = document.getElementById('body_portrait');
const idSearch = document.getElementById('search');

bodyPortrait.onclick = () => {
    bodyPortrait.style.transition = "0.5s";
    bodyPortrait.style.width = "0px";
    bodyPortrait.style.height = "0px";
    setTimeout(function() {
        bodyPortrait.src = "portrait" + portrait + ".webp";
        let a = setTimeout(function() {
            bodyPortrait.style.width = "80px";
            bodyPortrait.style.height = "80px";
        }, 1000);
        bodyPortrait.onload = () => {
            bodyPortrait.style.width = "80px";
            bodyPortrait.style.height = "80px";
            clearTimeout(a);
        }
    }, 500);//为了让动画运行后再切换图片
    portrait++;
    if (portrait === portraitNumber + 1) {
        portrait = 1;
    }    
    if (bodyInformation.style.display != "inline") {
        document.documentElement.style.setProperty('--nightBrightness', '2.5px');
        bodyInformation.style.display = "inline";
        idSearch.style.display = "inline";
        let bodyInfheight = bodyInformation.offsetHeight;
        bodyInfheight = idSearch.offsetHeight;
        bodyInformation.style.transition = "0.5s";
        bodyInformation.style.opacity = "1";
        idSearch.style.transition = "0.5s";
        idSearch.style.transform = "translate(-50%,0%)";
    } else {
        goBackTotTop();
        document.documentElement.style.setProperty('--nightBrightness', '0px');
        idSearch.style.transition = "0.5s";
        idSearch.style.transform = "translate(-50%,-200%)";
        bodyInformation.style.transition = "0.5s";
        bodyInformation.style.opacity = "0";
        setTimeout(function() {
            bodyInformation.style.display = "none";
            idSearch.style.display = "none";
        }, 500);
        
        
    }
}





fetch('1.json', {
    method: 'GET'
}).then(response => response.json()).then(data => {
    for (let i = data.length - 1; i >= 0; i = i - 1) {
        if(data[i].type==="1"){
        continue
        }
        let b = "";
        for (let ib = 0; ib < data[i].label.length; ib++) {
            b += `<span>` + data[i].label[ib] + `</span>`;
        }
        bodyInformation.innerHTML += `
<div class="ntroduction" onclick="JavaScript:window.open('essay.html?Yui=` + data[i].Yui + `')">
<img src="` + data[i].title_url + `" class="titleimg" />
<p class="title">` + data[i].title + `</p>
<p class="label">` + b + `</p>
</div>
`;
    }

    document.querySelectorAll(".titleimg")
        .forEach(item => {
        item.onerror = () => {
            item.src = "none.jpg";
        }
    });


    if (bodyInformation.style.display === "inline") {
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



idSearch.onmouseover = () => {
    idSearch.style.transition = "0.5s";
    idSearch.style.padding = "10px 8px";
}
idSearch.onmouseout = () => {
    idSearch.style.transition = "0.5s";
    idSearch.style.padding = "4px 4px";
}



function ent(ev) {
    ev = ev || window.event
    if (ev.keyCode == "13") {
        openfeel()
    }
}

function openfeel() {
    window.open("search.html?q=" + document.getElementById("searchText")
        .value);
}





/**
 *返回顶部的动画
 *@author Yui_ <13413925094@139.com>
 */
const goBackTotTop = () =>{
    if(document.documentElement.scrollTop > 0){
            console.log(document.documentElement.scrollTop);
            document.documentElement.scrollTop = document.documentElement.scrollTop - (document.documentElement.scrollTop/8);
            window.requestAnimationFrame(goBackTotTop)

            
    }
        
}

