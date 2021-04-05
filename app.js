// DOM Elements 
const amount = document.getElementById('amount');
const converterForm = document.getElementById('converter');
const base = document.getElementById('base');
const target = document.getElementById('target');
const exchangeBtn = document.getElementById('exchange-button');
const submitBtn = document.getElementById('submit-button');
const result = document.querySelector('.result');

let GET_API = `https://api.exchangerate.host/latest?base=USD`;

fetch(GET_API)
.then(response => response.json())
.then(data => {
    const codesArray = Object.keys(data.rates);

    for (let i = 0;i < codesArray.length;i++) {
        base.innerHTML += `<option value="${codesArray[i]}">${codesArray[i]}</option>`;
        target.innerHTML += `<option value="${codesArray[i]}">${codesArray[i]}</option>`;
    }

    base.firstElementChild.setAttribute('selected', '');
    target.lastElementChild.setAttribute('selected', '');

    // Exchange symbols 
    exchangeBtn.addEventListener('click', () => {
        [base.value, target.value] = [target.value, base.value];
    });
});


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    GET_API = `https://api.exchangerate.host/latest?base=${base.value}`;
    
    fetch(GET_API)
    .then(response => response.json())
    .then(data => {
        const codesArray = Object.keys(data.rates);
        const ratesArray = Object.values(data.rates); 

        result.textContent = '';

        // Comma separated numbers
        let commaSeparator = (number) => {
            let numParts = number.toString().split(".");
            numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return numParts.join(".");
        } 

         // Validate form
        if (amount.value === '' || isNaN(amount.value)) {
            alert('The amount must be filled out!')
        } else {
            // Convert currency 
            for (let i = 0;i < codesArray.length;i++) {
                if (codesArray[i] === target.value) {
                    result.textContent = `${commaSeparator(amount.value)} ${base.value} = ${commaSeparator((amount.value * ratesArray[i]).toFixed(2))} ${target.value}`;
                }
            }
        }

        const formValid = converterForm.reportValidity();
        console.log(data)
    });
})



