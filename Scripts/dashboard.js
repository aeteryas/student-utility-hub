var username=GetUsername();
document.getElementById("welcome").innerHTML = "Welcome, " + username + "!";


function UpdateTime() {
    var now=new Date();
    document.getElementById("time").innerHTML=
        "It is currently "+now.toLocaleTimeString();
}

setInterval(UpdateTime, 1000);
UpdateTime();

function generateCalendar() {

    const monthYear=document.getElementById("monthYear");
    const calendar=document.getElementById("calendar");

    if (!monthYear || !calendar) return;

    const today=new Date();

    const year=today.getFullYear();
    const month=today.getMonth();
    const dateToday=today.getDate();

    const months=[
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.innerText=months[month]+ " "+year;

    calendar.innerHTML= "";

    const dayNames= ["Su","Mo","Tu","We","Th","Fr","Sa"];

    dayNames.forEach(day => {
        calendar.innerHTML+= `<div class="day-name">${day}</div>`;
    });

    const firstDay=new Date(year, month, 1).getDay();

    const totalDays=new Date(year, month + 1, 0).getDate();

    for (let i=0; i<firstDay; i++) {
        calendar.innerHTML+= `<div></div>`;
    }

    for (let d=1; d<=totalDays; d++) {

        if (d===dateToday) {
            calendar.innerHTML+= `<div class="date today">${d}</div>`;
        } else {
            calendar.innerHTML+= `<div class="date">${d}</div>`;
        }

    }

}

generateCalendar();