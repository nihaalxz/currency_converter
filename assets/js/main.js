const countryList = {
    EUR: "EU",
    USD: "US",
    JPY: "JP",
    BGN: "BG",
    CZK: "CZ",
    DKK: "DK",
    GBP: "GB",
    HUF: "HU",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    CHF: "CH",
    ISK: "IS",
    NOK: "NO",
    HRK: "HR",
    RUB: "RU",
    TRY: "TR",
    AUD: "AU",
    BRL: "BR",
    CAD: "CA",
    CNY: "CN",
    HKD: "HK",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NZD: "NZ",
    PHP: "PH",
    SGD: "SG",
    THB: "TH",
    ZAR: "ZA"
};

const API_KEY = "fca_live_nXmCZEgDDIsSR9OB5m676My5bWvpY9UKV7oLqD8x";
const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

const fromCurr = document.querySelector('#from');
const toCurr = document.querySelector('#to');

let dropdown = document.querySelectorAll('.currency_select');

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode == "USD") {
            newOption.selected = 'selected';
        } else if (select.name === "to" && currCode == "INR") {
            newOption.selected = 'selected';
        }

        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        updateflag(event.target);
    });
}

function updateflag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/48.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

let btn = document.querySelector('#convert_btn');

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('#amount_in');
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value];
    let convertedAmount = (amtvalue * rate).toFixed(2);
    document.querySelector('.result').innerText = `${amtvalue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
});