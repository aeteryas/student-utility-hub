let subjects=[];

window.onload=function(){
loadSubjects();
};

function getKey(){

let user=localStorage.getItem("currentUser");

if(user && user.toLowerCase()!="guest"){
return user+"_attendance";
}

return "guest_attendance";

}

function saveSubjects(){

let key=getKey();

if(key=="guest_attendance"){
sessionStorage.setItem(key,JSON.stringify(subjects));
}
else{
localStorage.setItem(key,JSON.stringify(subjects));
}

}

function loadSubjects(){

let key=getKey();
let data;

if(key=="guest_attendance"){
data=sessionStorage.getItem(key);
}
else{
data=localStorage.getItem(key);
}

if(data){
subjects=JSON.parse(data);
}

renderSubjects();

}

function addSubject(){

let name=document.getElementById("subject").value.trim();
let held=parseInt(document.getElementById("held").value);
let attended=parseInt(document.getElementById("attended").value);
let target=parseInt(document.getElementById("target").value);

if(name==""||isNaN(held)||isNaN(attended)||isNaN(target)){
alert("Enter valid details");
return;
}

subjects.push({
name:name,
held:held,
attended:attended,
target:target
});

saveSubjects();
renderSubjects();

document.getElementById("subject").value="";
document.getElementById("held").value="";
document.getElementById("attended").value="";
document.getElementById("target").value="75";

}

function markPresent(i){

subjects[i].held++;
subjects[i].attended++;

saveSubjects();
renderSubjects();

}

function markAbsent(i){

subjects[i].held++;

saveSubjects();
renderSubjects();

}

function deleteSubject(i){

subjects.splice(i,1);

saveSubjects();
renderSubjects();

}

function renderSubjects(){

let box=document.getElementById("subjectList");
box.innerHTML="";

for(let i=0;i<subjects.length;i++){

let s=subjects[i];
let percent=((s.attended/s.held)*100).toFixed(1);

let msg="";
let cls="safe";

if(percent>=s.target){

let bunk=Math.floor((s.attended*100/s.target)-s.held);
msg="Can bunk "+bunk+" class(es)";
cls="safe";

}
else{

let need=Math.ceil((s.target*s.held-100*s.attended)/(100-s.target));
msg="Need "+need+" more classes";
cls="danger";

}

box.innerHTML+=`
<div class="subject-card">

<h3>${s.name}</h3>

<p>Held: ${s.held}</p>
<p>Attended: ${s.attended}</p>
<p>Attendance: ${percent}%</p>

<p class="${cls}">${msg}</p>

<div class="action-row">
<button class="present" onclick="markPresent(${i})">+ Present</button>
<button class="absent" onclick="markAbsent(${i})">+ Absent</button>
<button class="delete" onclick="deleteSubject(${i})">Delete</button>
</div>

</div>
`;

}

}