

let IMAGE_URL = `https://flagsapi.com/IN/flat/64.png`;

// let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let NEW_CURRENCY = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"; // eur/.json


let dropdowns = document.querySelectorAll("select");

for (let select of dropdowns)
{
    for (let countryCode in countryList)
    {
        let option = document.createElement("option");
        option.innerText = countryCode;
        option.value = countryCode;
        
        select.append(option);
        if(select.name === "from" && countryCode === "USD"){
            option.selected = "selected";
        }

        if(select.name === "to" && countryCode === "INR"){
            option.selected = "selected";
        }
    }
}


function fromHandleChange()
{
    const fromCountryName = document.getElementById("from").value;
    IMAGE_URL = `https://flagsapi.com/${countryList[fromCountryName]}/flat/64.png`
    document.getElementById("fromImage").src = IMAGE_URL;
}

function toHandleChange()
{
    const toCountryName = document.getElementById("to").value;
    IMAGE_URL = `https://flagsapi.com/${countryList[toCountryName]}/flat/64.png`
    document.getElementById("toImage").src = IMAGE_URL;
}


let btn = document.getElementById("btn");
let message = document.getElementById("msg");

window.addEventListener("load", async ()=>{

    let fromCountryCode = document.getElementById("from").value.toLowerCase();
    let toCountryCode = document.getElementById("to").value.toLowerCase();

    let NEW_URL = `${NEW_CURRENCY}/${fromCountryCode}.json`;
    let res = await fetch(NEW_URL);
    let data = await res.json();

    let convertedCurrency = data[fromCountryCode][toCountryCode];
    console.log(fromCountryCode, toCountryCode);
    message.innerHTML= `1 ${fromCountryCode.toUpperCase()} to ${toCountryCode.toUpperCase()} = ${convertedCurrency}`
})

function inputValidation(e)
{
    if(event.keyCode >= 48 && event.keyCode <=57){
        document.querySelector(e).innerHTML="";
        return true;
    }
    else{
        document.querySelector(e).innerHTML="Only Numbers are allowed".fontcolor("red");
        return false;
    }
}

btn.addEventListener("click", async(event)=>{
    event.preventDefault();
    let inputVal = document.getElementById("amt").value;
    let fromCountryCode = document.getElementById("from").value.toLowerCase();
    let toCountryCode = document.getElementById("to").value.toLowerCase();
    if(inputVal < 1 || inputVal == "")
    {
       document.querySelector(".message").innerHTML= "Required".fontcolor("red");
       return false;
    }else{
        document.querySelector(".message").innerHTML= "";
    }

    let NEW_URL = `${NEW_CURRENCY}/${fromCountryCode}.json`;
    let res = await fetch(NEW_URL);
    let data = await res.json();

    let convertedCurrency = data[fromCountryCode][toCountryCode];
    console.log(fromCountryCode, toCountryCode);

    let finalAmount = parseInt(inputVal || 1) * convertedCurrency;
    let splitVal = finalAmount.toString().split(".");
    let firstValue = splitVal[0];
    let secondValue = splitVal[1];
    let joinValue = firstValue.toString() + "." + secondValue.slice(0,3);
    console.log(firstValue , secondValue , joinValue)
    // console.log(finalAmount.toString().split(".")[1].slice(0,2));
    message.innerHTML= `${inputVal} ${fromCountryCode.toUpperCase()} to ${toCountryCode.toUpperCase()} = ${joinValue}`.bold();
});


