let expenses=[];

window.onload=function(){
loadData();
};

function getUserKey(){

let user=localStorage.getItem("currentUser");

if(user && user.toLowerCase()!="guest"){
return user+"_expenses";
}

return "guest_expenses";

}

function getBudgetKey(){

let user=localStorage.getItem("currentUser");

if(user && user.toLowerCase()!="guest"){
return user+"_budget";
}

return "guest_budget";

}

function saveData(){

let key=getUserKey();

if(key=="guest_expenses"){
sessionStorage.setItem(key,JSON.stringify(expenses));
}
else{
localStorage.setItem(key,JSON.stringify(expenses));
}

}

function saveBudget(value){

let key=getBudgetKey();

if(key=="guest_budget"){
sessionStorage.setItem(key,value);
}
else{
localStorage.setItem(key,value);
}

}

function loadData(){

let key=getUserKey();
let budgetKey=getBudgetKey();

let data;
let budget;

if(key=="guest_expenses"){
data=sessionStorage.getItem(key);
budget=sessionStorage.getItem(budgetKey);
}
else{
data=localStorage.getItem(key);
budget=localStorage.getItem(budgetKey);
}

if(data){
expenses=JSON.parse(data);
}
else{
expenses=[];
}

if(budget){
document.getElementById("limit").value=budget;
}

renderExpenses();

}

function updateBudget(){

let limit=document.getElementById("limit").value;

if(limit=="" || parseFloat(limit)<0){
alert("Enter valid budget");
return;
}

saveBudget(limit);
renderExpenses();

}

function addExpense(){

let item=document.getElementById("item").value.trim();
let price=parseFloat(document.getElementById("price").value);

if(item=="" || isNaN(price) || price<=0){
alert("Enter valid item and price");
return;
}

expenses.push({
name:item,
price:price
});

saveData();
renderExpenses();

document.getElementById("item").value="";
document.getElementById("price").value="";

}

function deleteItem(index){

expenses.splice(index,1);
saveData();
renderExpenses();

}

function clearAll(){

if(confirm("Clear page only?")){

expenses=[];

document.getElementById("list").innerHTML="";
document.getElementById("spent").innerText="0";
document.getElementById("remain").innerText="0";
document.getElementById("warning").innerHTML="Set your budget to begin.";
document.getElementById("warning").className="warning-box green";

document.getElementById("item").value="";
document.getElementById("price").value="";
document.getElementById("limit").value="";

}

}

function renderExpenses(){

let list=document.getElementById("list");
list.innerHTML="";

let total=0;

for(let i=0;i<expenses.length;i++){

total+=expenses[i].price;

list.innerHTML+=`
<div class="expense-item">
<span>${expenses[i].name}</span>

<div class="item-right">
<span>₹${expenses[i].price}</span>
<button class="mini-btn" onclick="deleteItem(${i})">×</button>
</div>

</div>
`;

}

document.getElementById("spent").innerText=total;

let limit=parseFloat(document.getElementById("limit").value)||0;
let remain=limit-total;

document.getElementById("remain").innerText=remain;

let box=document.getElementById("warning");

if(limit==0){

box.innerHTML="Set your budget to begin.";
box.className="warning-box green";
return;

}

if(total>limit){

box.innerHTML="🚨 Over Budget by ₹"+(total-limit);
box.className="warning-box red";

}
else if(total==limit){

box.innerHTML="⛔ Budget Limit Reached";
box.className="warning-box red";

}
else if(total>=limit*0.8){

box.innerHTML="⚠ Near Limit";
box.className="warning-box yellow";

}
else{

box.innerHTML="✅ Safe Spending";
box.className="warning-box green";

}

}