function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(u=="admin" && p=="1234")
window.location="home.html";
else
document.getElementById("msg").innerHTML="Wrong Credentials";

}

let cart=[];
let total=0;

function addItem(name,price){

cart.push(name);

total+=price;

localStorage.setItem("cart",cart.join(","));

localStorage.setItem("total",total);

alert(name+" Added");

}

function showCart(){

document.getElementById("items").innerHTML=
"Items : "+localStorage.getItem("cart");

document.getElementById("total").innerHTML=
"Total : ₹"+localStorage.getItem("total");

}