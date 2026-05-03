const base_url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const btn = document.querySelector("button");
const dropdown = document.querySelectorAll(".dropdown select");

// for (code in countryList) {
//   console.log(code , countryList[code]);
// }

for (let select of dropdown) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currencyCode;
    newOption.innerHTML = currencyCode;
    select.append(newOption);
    if (select.id === "from" && currencyCode === "USD") {
      newOption.selected = true;
    } else if (select.id === "to" && currencyCode === "INR") {
      newOption.selected = true;
    }
  }
  select.addEventListener("change", (event) => {
    updateFalg(event.target);
  });
}

function updateFalg(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newImgLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newImgLink;
}

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount").value;
  if (amount == "") {
    document.querySelector("#amount").value = '';
    amount = 1;
  }else if (amount < 0) {
    document.querySelector("#amount").value = 1;
    amount = 1;
  }
  const fromCurrency = document.querySelector("#from").value.toLowerCase();
  const toCurrency = document.querySelector("#to").value.toLowerCase();
  console.log(fromCurrency, toCurrency);
  let url = `${base_url}/${fromCurrency}.json`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let rate = data[fromCurrency][toCurrency];
  console.log(rate);

  const exchangeAmount = (amount * rate).toFixed(2);
  console.log(exchangeAmount);
  document.querySelector(".r1").innerHTML =
    `${amount} ${fromCurrency.toUpperCase()}`;
  document.querySelector(".r2").innerHTML =
    `${exchangeAmount} ${toCurrency.toUpperCase()}`;
};

btn.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission/refresh
  updateExchangeRate();
});

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });


document.querySelector("#amount").addEventListener("input", () => {
  console.log("input event");
  updateExchangeRate();
});
