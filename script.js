const base_url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;

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
  })
}

function updateFalg(element) {
    console.log(element);
}
