const taxForm = document.getElementById("tax-form");

// Tax is calculated on your taxable income which is zero for the first Rs2.50 lakh and 5.00%
// for the next Rs.2.50 lakh. While the tax rates are 20% and 30% for the next Rs.5 lakh and above Rs.10 lakh, respectively.

/*

function CalculateTax(Income) {
  let totalTax = 0;
  if (Income > 0) {
    totalTax = 0;
    Income -= 250000;
  }

  if (Income > 0) {
    if (Income > 250000) {
      Income -= 250000;
      totalTax += 250000 * 0.05;
    } else {
      totalTax += Income * 0.05;
      Income = 0;
    }
  }

  if (Income > 0) {
    if (Income > 500000) {
      Income -= 500000;
      totalTax += 500000 * 0.2;
    } else {
      totalTax += Income * 0.2;
      Income = 0;
    }
  }

  if (Income > 0) {
    totalTax += Income * 0.3;
  }

  return totalTax;
}

taxForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(taxForm);

  console.log(data);

  //   console.log(data.values);

  //   for (let [key, value] of data.entries()) {
  //     console.log(key, value);
  //   }

  //   for (const value of data.keys()) {
  //     console.log(value);
  //   }

  //   const income = data.get("income");
  //   console.log("Income ", income);

  const Income = document.getElementById("income");

  console.log(Income.value);

  const IncomeTax = CalculateTax(Income.value);

  console.log(IncomeTax);

  const result = document.getElementById("result");
  result.textContent = `Total Tax :- ${IncomeTax}`;
});

*/

// --------------------------------------------------------------------------------------------

// Improved Code

function CalculateTax(Income) {
  const TaxBrackets = [
    { limit: 250000, rate: 0 },
    { limit: 250000, rate: 0.05 },
    { limit: 500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];

  let totalTax = 0;

  for (let i = 0; i < TaxBrackets.length; i++) {
    const { limit, rate } = TaxBrackets[i];

    if (Income > limit) {
      totalTax += limit * rate;
      Income = Income - limit;
    } else {
      totalTax += Income * rate;
      break;
    }
  }
  console.log("Total Tax : ", totalTax);

  return totalTax;
}

taxForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const Income = document.getElementById("income").value.trim();
  const IncomeValue = parseFloat(Income);
  const result = document.getElementById("result");

  let child = result.lastElementChild;
  while (child) {
    result.removeChild(child);
    child = result.lastElementChild;
  }

  //   result.innerHTML = "";

  // Input Validation

  if (!Income || isNaN(IncomeValue) || IncomeValue <= 0) {
    console.log("Checking Condition");
    result.textContent = `Please Enter Valid Input`;
    return;
    //   } else if (typeof IncomeValue === "string") {
    //     result.textContent = `Please Enter Valid Input, NOT String`;
    //     return;
    //   }
  } else {
    const TotalTax = Math.round(CalculateTax(IncomeValue));
    let Image = document.createElement("img");
    Image.src = "./nirmala.avif";
    result.appendChild(Image);
    const text = document.createElement("p");
    text.textContent = `Total Tax :- ${TotalTax}`;
    result.appendChild(text);
  }
});

// Code by Shubham Lipane

// 04 Jan 2025
