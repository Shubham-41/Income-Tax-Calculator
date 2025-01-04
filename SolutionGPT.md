<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tax Calculator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    form {
      margin-bottom: 20px;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    .result {
      font-weight: bold;
      font-size: 1.2em;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>Income Tax Calculator</h1>
  <form id="taxForm">
    <label for="income">Enter Your Annual Income (₹):</label><br>
    <input type="text" id="income" name="income" placeholder="Enter income amount"><br><br>
    <button type="submit">Calculate Tax</button>
    <button type="button" id="resetBtn">Reset</button>
  </form>
  <p id="result" class="result"></p>

  <script>
    /**
     * Function to calculate total tax based on income and tax brackets.
     * Modularized for reusability and testing.
     * @param {number} income - The annual income of the user.
     * @returns {string} Total tax formatted as currency.
     */
    function calculateTax(income) {
      const taxBrackets = [
        { limit: 250000, rate: 0 },
        { limit: 250000, rate: 0.05 },
        { limit: 500000, rate: 0.2 },
        { limit: Infinity, rate: 0.3 },
      ];

      let totalTax = 0;

      for (let i = 0; i < taxBrackets.length; i++) {
        const { limit, rate } = taxBrackets[i];

        if (income > limit) {
          totalTax += limit * rate;
          income -= limit;
        } else {
          totalTax += income * rate;
          break;
        }
      }

      return formatCurrency(totalTax);
    }

    /**
     * Function to format a number as Indian currency (₹xx,xxx.xx).
     * @param {number} amount - The number to format.
     * @returns {string} Formatted currency string.
     */
    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
      }).format(amount);
    }

    /**
     * Main logic for handling form submission.
     */
    const taxForm = document.getElementById('taxForm');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');

    taxForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const incomeInput = document.getElementById('income').value.trim();
      const incomeValue = parseFloat(incomeInput);

      result.textContent = '';
      result.classList.remove('error');

      // Input Validation
      if (!incomeInput || isNaN(incomeValue) || incomeValue <= 0) {
        result.textContent = 'Please enter a valid income amount (positive number).';
        result.classList.add('error');
        return;
      }

      // Calculate and display tax
      try {
        const totalTax = calculateTax(incomeValue);
        result.textContent = `Total Tax: ${totalTax}`;
      } catch (error) {
        console.error('An error occurred during tax calculation:', error);
        result.textContent = 'An unexpected error occurred. Please try again.';
        result.classList.add('error');
      }
    });

    /**
     * Reset form and result display.
     */
    resetBtn.addEventListener('click', function () {
      taxForm.reset();
      result.textContent = '';
      result.classList.remove('error');
    });
  </script>
</body>
</html>
