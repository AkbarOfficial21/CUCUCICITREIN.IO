const GAS_URL="https://script.google.com/macros/s/AKfycbxut8Xe80mQsW4an9dFX2UPHTPdMqF0TdbHbYHlHfvBAjUGMR0iwQi_do30e0K2dbE/exec";

let currentNama="";

const badWords=[
"anjing",
"bangsat",
"babi",
"kontol",
"memek",
"goblok",
"tolol",
"asu",
"brengsek"
];

const welcome=document.getElementById("welcomeScreen");
const main=document.getElementById("mainScreen");

const bukaBtn=document.getElementById("bukaBtn");
const kirimBtn=document.getElementById("kirimBtn");

const namaInput=document.getElementById("namaInput");
const pesanInput=document.getElementById("pesanInput");

const list=document.getElementById("listUcapan");
const audio=document.getElementById("audio");


function cekKata(text){

let lower=text.toLowerCase();

for(let w of badWords){

if(lower.includes(w)){
return w;
}

}

return null;

}


bukaBtn.onclick=()=>{

let nama=namaInput.value.trim();

if(!nama){

Swal.fire({
icon:"warning",
title:"Masukkan Nama",
text:"Nama harus diisi terlebih dahulu"
});

return;

}

currentNama=nama;

audio.play();

welcome.classList.add("hidden");
main.classList.remove("hidden");

loadUcapan();

};


kirimBtn.onclick=async()=>{

let pesan=pesanInput.value.trim();

if(!pesan){
alert("Tulis ucapan");
return;
}

let bad=cekKata(pesan);

if(bad){

Swal.fire({
icon:"warning",
title:"Ucapan tidak pantas",
text:`Kata "${bad}" tidak diperbolehkan`
});

return;

}

if(localStorage.getItem("thr")){

Swal.fire({
icon:"info",
title:"THR\nSudah diklaim",
});

return;

}

await fetch(GAS_URL,{
method:"POST",
body:JSON.stringify({
nama:currentNama,
pesan:pesan
})
});

pesanInput.value="";

loadUcapan();

showTHR();

};


async function loadUcapan(){

let res=await fetch(GAS_URL);

let data=await res.json();

list.innerHTML="";

data.reverse().forEach((item)=>{

list.innerHTML+=`

<div class="ucapan">

<strong>${item.nama}</strong><br>

"${item.pesan}"

</div>

`;

});

}


function showTHR(){

Swal.fire({

title:"🎁 Selamat!",
text:"Kamu mendapatkan THR",

html:`<div class="qr-center"><div id="qr"></div></div>`,

customClass:{
popup:"small-popup"
}

});

setTimeout(()=>{

new QRCode(document.getElementById("qr"),{
text:"THR-IDUL-FITRI",
width:160,
height:160
});

},200);

localStorage.setItem("thr","claimed");

}