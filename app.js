const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}



const updateExchangeRate =async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal=== "" && amtVal <1 ){
        amt = 1;
        amount.value = "1";
    }
    console.log(fromCurr, toCurr);
    const url = `${BASE_URL}/${fromCurr.value}`;
    let responce = await fetch(url);
    let data = await responce.json();
    let rate = (data.rates[toCurr.value]);
    let finalAmount = rate * amtVal;
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCOde = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCOde}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})