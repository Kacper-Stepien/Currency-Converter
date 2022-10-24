'use strict';

// Get HTML elements
const firstCurrencyInput = document.getElementById('currency-top');
const secondCurrencyInput = document.getElementById('currency-bottom');
const firstAmountInput = document.getElementById('amount-top');
const secondAmountInput = document.getElementById('amount-bottom');
const swapBtn = document.getElementById('swap-btn');
const infoAboutConvertion = document.getElementById('message');


function countConversionRate() {

    let firstCurrency = firstCurrencyInput.value;
    let secondCurrency = secondCurrencyInput.value;
    let firstAmount = firstAmountInput.value;

    fetch(`https://v6.exchangerate-api.com/v6/5582e59fe0b45cb9c5f85941/latest/${firstCurrency}`)
        .then(res => res.json())
        .then(data => {
            let conversionRate = data.conversion_rates[`${secondCurrency}`];
            infoAboutConvertion.innerText = `1 ${firstCurrency} = ${conversionRate} ${secondCurrency}`
            secondAmountInput.value = firstAmountInput.value * conversionRate;
        });
}

function swapCurrencies() {
    let temp = firstCurrencyInput.value;
    firstCurrencyInput.value = secondCurrencyInput.value;
    secondCurrencyInput.value = temp;
    countConversionRate();
}


firstCurrencyInput.addEventListener('change', countConversionRate);
secondCurrencyInput.addEventListener('change', countConversionRate);
firstAmountInput.addEventListener('change', countConversionRate);
swapBtn.addEventListener('click', swapCurrencies);

countConversionRate();
