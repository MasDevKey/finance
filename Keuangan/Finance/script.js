let data = JSON.parse(localStorage.getItem("financeData")) || [];

const ctx=document.getElementById("chart");

const chart=new Chart(ctx,{

type:"doughnut",

data:{

labels:["Pemasukan","Pengeluaran"],

datasets:[{

data:[0,0],

backgroundColor:[

"#22c55e",

"#ef4444"

]

}]

}

});

function rupiah(number){

return "Rp"+number.toLocaleString("id-ID");

}

function render(){

let income=0;
let expense=0;

const list=document.getElementById("list");

const keyword=document
.getElementById("search")
.value
.toLowerCase();

list.innerHTML="";

data.forEach((item,index)=>{

if(item.type=="income")
income+=item.amount;
else
expense+=item.amount;

if(!item.name.toLowerCase().includes(keyword))
return;

const li=document.createElement("li");

li.innerHTML=`

<div>

<strong>${item.name}</strong><br>

<span class="${item.type}">
${item.type=="income"?"+":"-"}${rupiah(item.amount)}
</span>

</div>

<button
class="delete-btn"
onclick="deleteTransaction(${index})">

🗑

</button>

`;

list.prepend(li);

});

document.getElementById("income").innerHTML=rupiah(income);

document.getElementById("expense").innerHTML=rupiah(expense);

document.getElementById("balance").innerHTML=rupiah(income-expense);

chart.data.datasets[0].data=[income,expense];

chart.update();

saveData();

}

function parseMoney(text){

    text = text.trim().toLowerCase();
    text = text.replace(",", ".");

    const number = parseFloat(text);

    if(isNaN(number)) return NaN;

    if(text.endsWith("rb") || text.endsWith("k"))
        return number * 1000;

    if(text.endsWith("jt"))
        return number * 1000000;

    if(text.endsWith("m"))
        return number * 1000000000;

    return number;
}


function saveData(){
    localStorage.setItem("financeData", JSON.stringify(data));
}

function addTransaction(){

    const name = document.getElementById("name").value;
    const amount = parseMoney(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if(!name || isNaN(amount) || amount <= 0) return;

data.push({
    name,
    amount,
    type
});

saveData();

render();

    render();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(index){

if(confirm("Hapus transaksi ini?")){

data.splice(index,1);

saveData();

render();

}

}

function clearHistory(){

if(confirm("Yakin ingin menghapus semua riwayat?")){

data=[];

saveData();

render();

}

}

// =========================
// Kalkulator
// =========================

function calc(value){

    const display = document.getElementById("calcDisplay");

    if(display.value === "0"){
        display.value = value;
    }else{
        display.value += value;
    }

}

function clearCalc(){

    document.getElementById("calcDisplay").value = "0";

}

function backspace(){

    const display = document.getElementById("calcDisplay");

    display.value = display.value.slice(0,-1);

    if(display.value=="")
        display.value="0";

}

function calculate(){

    const display = document.getElementById("calcDisplay");

    try{

        display.value = Function(
            '"use strict";return (' +
            display.value +
            ')'
        )();

    }catch{

        display.value = "Error";

    }

}

saveData();
render();