const display = document.getElementById("display");
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "calculator-theme";

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  const nextMode = theme === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextMode} mode`);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
}

function updateDisplay(value) {
  display.textContent = value;
}

function inputDigit(digit) {
  const current = display.textContent;

  if (waitingForSecondOperand) {
    updateDisplay(digit);
    waitingForSecondOperand = false;
    return;
  }

  updateDisplay(current === "0" ? digit : current + digit);
}

function inputDot() {
  if (waitingForSecondOperand) {
    updateDisplay("0.");
    waitingForSecondOperand = false;
    return;
  }

  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
}

function clearAll() {
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay("0");
}

function deleteLast() {
  if (waitingForSecondOperand) {
    return;
  }

  const current = display.textContent;
  if (current.length <= 1) {
    updateDisplay("0");
    return;
  }

  updateDisplay(current.slice(0, -1));
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
    default:
      return b;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.textContent);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    updateDisplay(String(result));

    if (result === "Error") {
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      return;
    }

    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function handleEquals() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }

  const secondOperand = parseFloat(display.textContent);
  const result = calculate(firstOperand, secondOperand, operator);

  updateDisplay(String(result));

  firstOperand = result === "Error" ? null : result;
  operator = null;
  waitingForSecondOperand = true;
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName !== "BUTTON") {
    return;
  }

  const { value, action } = target.dataset;

  if (action === "clear") {
    clearAll();
    return;
  }

  if (action === "delete") {
    deleteLast();
    return;
  }

  if (action === "equals") {
    handleEquals();
    return;
  }

  if (value === ".") {
    inputDot();
    return;
  }

  if (["+", "-", "*", "/"].includes(value)) {
    handleOperator(value);
    return;
  }

  inputDigit(value);
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    inputDigit(key);
    return;
  }

  if (key === ".") {
    inputDot();
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    handleEquals();
    return;
  }

  if (key === "Backspace") {
    deleteLast();
    return;
  }

  if (key === "Escape") {
    clearAll();
  }
});

applyTheme(getPreferredTheme());
themeToggle.addEventListener("click", toggleTheme);
