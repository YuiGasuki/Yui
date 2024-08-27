let ifSetupFamily = true;
const SetupFamily = document.getElementById('setup_family');

const DarkMode = () =>{
    if(document.cookie){
        let data = document.cookie.split(";")[0].split("=")[1];
        if(data==="true"){
            document.documentElement.style.setProperty('--nightbackground','rgba(86,86,86,0.85)');
document.documentElement.style.setProperty('--nightfcolor', '#c5c5c5'); 
document.documentElement.style.setProperty('--nightbox', '0.5');  
            return
     }
     }
        document.documentElement.style.setProperty('--nightbackground','rgba(238,238,238,0.85)');
        document.documentElement.style.setProperty('--nightbox', '0');  
        document.documentElement.style.setProperty('--nightfcolor', '#000000'); 
    }


DarkMode();


const channel = new BroadcastChannel('Yui_night');

channel.addEventListener('message', (e) => {
DarkMode();
})



SetupFamily.onclick = () =>{
    if(ifSetupFamily){
        SetupFamily.style.setProperty('--leftData', '-4px');
        SetupFamily.style.setProperty('--divBackGround', '#aaaaaa');
        document.documentElement.style.setProperty('--fontSerif', 'fontSerif:GenEiKoburiMin6, Arial Black, Gadget, sans-serif');
        localStorage.serif = "1";
        ifSetupFamily = false;
    }else{
        SetupFamily.style.setProperty('--leftData', '15px');
        SetupFamily.style.setProperty('--divBackGround', '#FF6699');
        document.documentElement.style.setProperty('--fontSerif', 'GenEiKoburiMin6, serif, Georgia ,"Palatino Linotype", "Book Antiqua","Times New Roman", Times');
        localStorage.removeItem(serif);
        ifSetupFamily = true;
    }
}

if(localStorage.serif&&localStorage.serif==="1"){
    SetupFamily.click();
    
}