let pcpicture  = (Math.floor(Math.random() * (2 - 1 + 1)) + 1);
let anpicture = (Math.floor(Math.random() * (5 - 1 + 1)) + 1);
let portraitNumber = 6;//头像的总数
function replacepicture() {
    if(window.innerHeight <= window.innerWidth){
        document.getElementById('background_img').src = "p_" + pcpicture + ".webp";
    }else{
        document.getElementById('background_img').src = "b_" + anpicture + ".webp";
    }
}



replacepicture();
window.addEventListener('resize', replacepicture);

localStorage.clear();

document.querySelectorAll(".load").forEach(item => {
    let img = new Image();
    img.src = item.src;
});
window.onload = () =>{          
    if(document.getElementById('first_box')){
    document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    TypingAnimation(document.getElementById('body_name'), document.getElementById('body_name').innerHTML, "", 0);
    }   
        
}

const TypingAnimation = (e, name, present, i) => {
 
    if (present === '') {
        present = name[i];
    } else {
        if (i >= name.length - 1) {
            let a = name.length-(i-name.length);
            if((i-name.length) <= 0){
                i++
                setTimeout(() => {
                    TypingAnimation(e, name, present, i)
                }, 400)
                return
            }
            present = name.split(name[a])[0];
            document.getElementById('body_name').innerHTML = present + '|';
            if (i >=(name.length*2)){
            i = 0;
            setTimeout(() => {
                TypingAnimation(e, name, present, i)
            }, 400)
            }else{
            i++;
            setTimeout(() => {
                TypingAnimation(e, name, present, i)
            }, 400)
            }
            return
        }
        if (i >= name.length - 2) {
            present += name[i + 1];
            document.getElementById('body_name').innerHTML = present;
            i++;
            setTimeout(() => {
                TypingAnimation(e, name, present, i)
            }, 1000)
            return
        }
        present += name[i + 1];
        i++;
    }
    document.getElementById('body_name').innerHTML = present + '|';
    setTimeout(() => {
        TypingAnimation(e, name, present, i)
    }, 400)
}



const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,0.8)');
            document.documentElement.style.setProperty('--nightbox', '0.5');           
            document.documentElement.style.setProperty('--nightTitleground', 'rgba(86,86,86,0.8)');  
            document.documentElement.style.setProperty('--nightfcolor', '#aaaaaa');
        }else{
            document.documentElement.style.setProperty('--nightbackground', '#F1F1F1');
            document.documentElement.style.setProperty('--nightbox', '0');
            document.documentElement.style.setProperty('--nightTitleground', 'rgba(241,241,241,0.8)');  
            document.documentElement.style.setProperty('--nightfcolor', '#606266');
        }
    }else{
        document.documentElement.style.setProperty('--nightbackground', '#F1F1F1');
            document.documentElement.style.setProperty('--nightbox', '0');
            document.documentElement.style.setProperty('--nightTitleground', 'rgba(241,241,241,0.8)');  
            document.documentElement.style.setProperty('--nightfcolor', '#606266');
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





const bodyInformation = document.getElementById('body_ntroduction');
const bodyPortrait = document.getElementById('body_portrait');
const ntroductionProject = document.getElementById('ntroduction_project');
const idSearch = document.getElementById('search');

bodyPortrait.onclick = () => {
    
    if (bodyInformation.style.display != "inline") {
        document.documentElement.style.setProperty('--nightBrightness', '2.5px');
        bodyInformation.style.display = "inline";
        idSearch.style.display = "inline";
        let bodyInfheight = bodyInformation.offsetHeight;
        bodyInfheight = idSearch.offsetHeight;
        bodyInformation.style.transition = "0.4s";
        bodyInformation.style.marginTop = "18px";
        bodyInformation.style.opacity = "1";        
        idSearch.style.transition = "0.4s";
        idSearch.style.transform = "translate(-50%,0%)";
    } else {
        goBackTotTop();
        document.documentElement.style.setProperty('--nightBrightness', '0px');
        idSearch.style.transition = "0.4s";
        idSearch.style.transform = "translate(-50%,-200%)";
        bodyInformation.style.transition = "0.4s";
        bodyInformation.style.marginTop = "38px"; 
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
        for (let ic = (i*4); ic < ((i*4)+4)&&ic<data.length; ic++) {
        let b = "";
        for(let ib = 0; ib < data[ic].label.length; ib++){
            b += `<span>` + data[ic].label[ib] + `</span>`;
        }
           textAgin  += `
                <div class="ntroduction" onclick="JavaScript:window.open('essay.html?Yui=${data[ic].Yui}')">
                <img src="${data[ic].title_url}" class="titleimg"  />
                <p class="title">${data[ic].title}</p>
                <p class="label">${b}</p>
                </div>
                `;        
        }
        textAgin += `<div id="getBook"></div>`;
        bodyInformation.innerHTML+=textAgin;
        i++;
    }  
    setUpBook();
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
        item.onerror = () => {
            item.src = "none.webp";
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
            document.documentElement.scrollTop = document.documentElement.scrollTop - (document.documentElement.scrollTop/8);
            window.requestAnimationFrame(goBackTotTop)

            
    }
        
}