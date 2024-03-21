const Url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Fetching currency rates function
const fetchCurrencyRates = async (fromCurrency) => {
  try {
    const response = await fetch(`${Url}/${fromCurrency}.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching currency rates:", error);
  }
};

let GetAmount = async () => {
  let amount = document.querySelector("form input").value;
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  // Fetch currency rates
  const data = await fetchCurrencyRates("usd"); // Fetch rates against USD

  // Get the conversion rate
  if (data && data.usd && data.usd[from] && data.usd[to]) {
    const fromRate = data.usd[from];
    const toRate = data.usd[to];
    const conversionRate = toRate / fromRate; // Conversion rate from 'from' to 'to'
    let convertedAmount = amount * conversionRate;
    convertedAmount = convertedAmount.toFixed(4);
    msg.innerText = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`;
  } else {
    msg.innerText = `Conversion not found!`;
  }
};
// Event listener for convert button
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  GetAmount();
});

// Function to update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listener for dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
window.addEventListener("load", () => {
  GetAmount();
});
