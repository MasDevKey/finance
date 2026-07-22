// Ambil data dari LocalStorage
const data = JSON.parse(localStorage.getItem("financeData")) || [];

const ctx = document.getElementById("financeChart");

let chart;

// Format Rupiah
function rupiah(num){
    return "Rp" + num.toLocaleString("id-ID");
}

// Hitung statistik
function updateSummary(){

    let income = 0;
    let expense = 0;

    data.forEach(item=>{

        if(item.type==="income")
            income += item.amount;
        else
            expense += item.amount;

    });

    document.getElementById("income").innerText = rupiah(income);
    document.getElementById("expense").innerText = rupiah(expense);
    document.getElementById("balance").innerText = rupiah(income-expense);

}

// Membuat chart
function createChart(type, labels, incomeData, expenseData){

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{

        type:type,

        data:{

            labels:labels,

            datasets:[

                {

                    label:"Pemasukan",

                    data:incomeData,

                    borderColor:"#22c55e",

                    backgroundColor:"rgba(34,197,94,.15)",

                    pointBackgroundColor:"#22c55e",

                    pointRadius:5,

                    pointHoverRadius:8,

                    borderWidth:3,

                    fill:true,

                    tension:.45

                },

                {

                    label:"Pengeluaran",

                    data:expenseData,

                    borderColor:"#ef4444",

                    backgroundColor:"rgba(239,68,68,.15)",

                    pointBackgroundColor:"#ef4444",

                    pointRadius:5,

                    pointHoverRadius:8,

                    borderWidth:3,

                    fill:true,

                    tension:.45

                }

            ]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            interaction:{
                mode:"index",
                intersect:false
            },

            plugins:{

                legend:{
                    display:true,
                    position:"top"
                }

            },

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}
// Ganti jenis grafik
function showChart(mode, button){

    document.querySelectorAll(".tab").forEach(btn=>{
        btn.classList.remove("active");
    });

    button.classList.add("active");

    // Diagram
    if(mode==="pie"){

        let income=0;
        let expense=0;

        data.forEach(item=>{

            if(item.type==="income")
                income+=item.amount;
            else
                expense+=item.amount;

        });

        createChart(
            "doughnut",
            ["Pemasukan","Pengeluaran"],
            [income,expense]
        );

        return;

    }

    // Harian
    if(mode==="daily"){

        const labels=["Sen","Sel","Rab","Kam","Jum","Sab","Min"];

        const income=[0,0,0,0,0,0,0];
const expense=[0,0,0,0,0,0,0];

// Contoh sementara
createChart(
    "line",
    labels,
    income,
    expense
);
        return;

    }

    // Bulanan
    if(mode==="monthly"){

const income=new Array(12).fill(0);
const expense=new Array(12).fill(0);

data.forEach(item=>{

    if(!item.date) return;

    const month=new Date(item.date).getMonth();

    if(item.type=="income")
        income[month]+=item.amount;
    else
        expense[month]+=item.amount;

});

createChart(
    "line",
    labels,
    income,
    expense
);

        return;

    }

    // Tahunan
    if(mode==="yearly"){

const income={};
const expense={};

data.forEach(item=>{

    if(!item.date) return;

    const year=new Date(item.date).getFullYear();

    if(item.type=="income"){

        income[year]=(income[year]||0)+item.amount;

    }else{

        expense[year]=(expense[year]||0)+item.amount;

    }

});

const years=[...new Set([
    ...Object.keys(income),
    ...Object.keys(expense)
])].sort();

createChart(

    "line",

    years,

    years.map(y=>income[y]||0),

    years.map(y=>expense[y]||0)

);

    }

}

updateSummary();

// Grafik pertama
showChart("pie",document.querySelector(".tab"));