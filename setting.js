let ifSetupFamily = true;
let ifdarkMode = false;
const SetupFamily = document.getElementById('setup_family');
const SetupBox = document.getElementById('setup_box');
const Setup = document.getElementById('setup');
const ToIndex = document.getElementById('To_index');
const SetupBlack = document.getElementById('setup_black');
const backTop = document.getElementById('back_top');
const darkMode = document.getElementById('dark_mode');
const outlineBox = document.getElementById('outline_box');


const ifdarkModeTrue = () => {
    darkMode.style.setProperty('--leftData', '15px');
    darkMode.style.setProperty('--divBackGround', "var(--ThemeColor)");
    ifdarkMode = true;
}
const ifdarkModeFalse = () => {
    darkMode.style.setProperty('--leftData', '-4px');
    darkMode.style.setProperty('--divBackGround', '#aaaaaa');
    ifdarkMode = false;
}

const DarkMode = () => {
    if (document.cookie) {
        let data = document.cookie.split(";")[0].split("=")[1];
        if (data === "true") {
            document.documentElement.style.setProperty('--nightbackground', 'rgba(86,86,86,0.7)');
            document.documentElement.style.setProperty('--nightNoback', 'rgba(86,86,86)');
            document.documentElement.style.setProperty('--nightfcolor', '#c5c5c5');
            document.documentElement.style.setProperty('--nightbox', '0.5');
            ifdarkModeTrue();
            return
        }
    }
    document.documentElement.style.setProperty('--nightbackground', 'rgba(238,238,238,0.7)');
    document.documentElement.style.setProperty('--nightNoback', '#eaeaea');
    document.documentElement.style.setProperty('--nightbox', '0');
    document.documentElement.style.setProperty('--nightfcolor', '#000000');
    ifdarkModeFalse();
}


DarkMode();


const channel = new BroadcastChannel('Yui_night');

channel.addEventListener('message', (e) => {
    DarkMode();
})



SetupFamily.onclick = () => {
    if (ifSetupFamily) {
        SetupFamily.style.setProperty('--leftData', '-4px');
        SetupFamily.style.setProperty('--divBackGround', '#aaaaaa');
        document.documentElement.style.setProperty('--fontSerif', 'GenEiKoburiMin6, Arial Black, Gadget, sans-serif');
        localStorage.serif = "1";
        ifSetupFamily = false;
    } else {
        SetupFamily.style.setProperty('--leftData', '15px');
        SetupFamily.style.setProperty('--divBackGround', "var(--ThemeColor)");
        document.documentElement.style.setProperty('--fontSerif', 'GenEiKoburiMin6, serif, Georgia ,"Palatino Linotype", "Book Antiqua","Times New Roman", Times');
        localStorage.removeItem("serif");
        ifSetupFamily = true;
    }
}

darkMode.onclick = () => {
    if (ifdarkMode) {
        ifdarkModeFalse();
        document.cookie = "darkmode=false; max-age:2592000";
        DarkMode();
        channel.postMessage({
            Type: 0
        })
    } else {
        ifdarkModeTrue();
        document.cookie = "darkmode=true; max-age:2592000";
        DarkMode();
        channel.postMessage({
            Type: 1
        })
    }
}

if (localStorage.serif) {
    if (localStorage.serif === "1") {
        SetupFamily.click();
    }
}

window.onscroll = function () {
    if (document.documentElement.scrollTop > 0) {
        SetupBox.style.pointerEvents = "auto";
        SetupBox.style.opacity = "1";
        backTop.style.pointerEvents = "auto";
        backTop.style.opacity = "1";
        outlineBox.style.pointerEvents = "auto";
        ToIndex.style.pointerEvents = "auto";
        outlineBox.style.opacity = "1";
        ToIndex.style.opacity = "1";
    } else if (document.documentElement.scrollTop <= 0) {
        SetupBox.style.opacity = "0";
        SetupBox.style.pointerEvents = "none";
        ToIndex.style.pointerEvents = "none";
        backTop.style.opacity = "0";
        ToIndex.style.opacity = "0";
        backTop.style.pointerEvents = "none";
        outlineBox.style.pointerEvents = "none";
        outlineBox.style.opacity = "0";
    }
}


function goBackTotTop(numBer, h) {
    if (!h) {
        h = (document.documentElement.scrollTop - numBer) / 10;
    }
    if(h >= 0.34){
        document.documentElement.scrollTop = document.documentElement.scrollTop - h;
        document.body.style.overflow = "hidden";
        window.requestAnimationFrame(() => goBackTotTop(numBer))
    }else{
        document.documentElement.scrollTop = 0
        document.body.style.overflow = "auto";
        ifgoBackTot = false;
    }

}


function goBackTotBotton(numBer, h) {
    if (!h) {
        h = (numBer - document.documentElement.scrollTop) / 10;
    }
    if (document.documentElement.scrollTop < (numBer - h)) {
        document.documentElement.scrollTop = document.documentElement.scrollTop + h;
        document.body.style.overflow = "hidden";
        window.requestAnimationFrame(() => goBackTotBotton(numBer, h))
    } else {
        document.body.style.overflow = "auto";
        ifgoBackTot = false;
    }

}

backTop.onclick = () => goBackTotTop(0);


SetupBox.onclick = () => {
    Setup.style.pointerEvents = "auto";
    Setup.style.opacity = "1";
    SetupBlack.style.display = "inline";
}
SetupBlack.onclick = () => {
    Setup.style.pointerEvents = "none";
    Setup.style.opacity = "0";
    SetupBlack.style.display = "none";
}


if (localStorage.ThemeColor) {
    document.documentElement.style.setProperty('--ThemeColor', localStorage.ThemeColor);
}
const ThemeColor = (color) => {
    localStorage.ThemeColor = color;
    channel.postMessage({
        Type: 3
    })
    document.documentElement.style.setProperty('--ThemeColor', color);
}