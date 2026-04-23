let studyMinutes=25;
let breakMinutes=5;

let timeLeft=studyMinutes*60;
let timer=null;
let running=false;
let sessions=0;
let studyMode=true;

window.onload=function(){
    updateDisplay();
}

function setPreset(study,rest){
    pauseTimer();

    studyMinutes=study;
    breakMinutes=rest;

    studyMode=true;
    timeLeft=studyMinutes*60;

    document.getElementById("modeText").innerText="Pomodoro Session";

    updateDisplay();
}

function updateDisplay(){
    let minutes=Math.floor(timeLeft/60);
    let seconds=timeLeft%60;

    if(minutes<10){
        minutes="0"+minutes;
    }

    if(seconds<10){
        seconds="0"+seconds;
    }

    document.getElementById("timerDisplay").innerText=
        minutes+":"+seconds;
}

function startTimer(){

    if(running){
        return;
    }

    running=true;

    timer=setInterval(function(){

        if(timeLeft>0){
            timeLeft--;
            updateDisplay();
        }
        else{
            pauseTimer();
            switchMode();
        }

    },1000);
}

function pauseTimer(){
    clearInterval(timer);
    running=false;
}

function resetTimer(){

    pauseTimer();

    if(studyMode){
        timeLeft=studyMinutes*60;
    }
    else{
        timeLeft=breakMinutes*60;
    }

    updateDisplay();
}

function switchMode(){

    if(studyMode){

        sessions++;

        document.getElementById("sessionCount").innerText=
        "Completed Sessions: "+sessions;

        studyMode=false;
        timeLeft=breakMinutes*60;

        document.getElementById("modeText").innerText=
        "Break Time";
    }
    else{

        studyMode=true;
        timeLeft=studyMinutes*60;

        document.getElementById("modeText").innerText=
        "Pomodoro Session";
    }

    updateDisplay();
    startTimer();
}