
let display = document.getElementById("display");
let history = document.getElementById("history");

let current = "0";
let previous = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    display.textContent = current;
}

function appendNumber(number) {
    if (current === "Error") clearDisplay();

    if (shouldReset) {
        current = number === "." ? "0." : number;
        shouldReset = false;
    } else if (number === ".") {
        if (!current.includes(".")) current += ".";
    } else {
        current = current === "0" ? number : current + number;
    }

    updateDisplay();
}

function clearDisplay() {
    current = "0";
    previous = null;
    operator = null;
    shouldReset = false;
    history.textContent = "";
    updateDisplay();
}

function deleteNumber() {
    if (shouldReset || current === "Error") {
        current = "0";
        shouldReset = false;
    } else {
        current = current.length > 1
            ? current.slice(0, -1)
            : "0";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (current === "Error") return;

    if (operator && !shouldReset) {
        calculate();
    }

    previous = Number(current);
    operator = op;
    shouldReset = true;

    history.textContent =
        previous + " " + getSymbol(op);
}

function getSymbol(op) {
    return {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    }[op];
}

function calculate() {
    if (operator === null || previous === null) return;

    let second = Number(current);
    let first = previous;
    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
        case "/":
            result = second === 0 ? NaN : first / second;
            break;
    }

    history.textContent =
        first + " " + getSymbol(operator) + " " + second + " =";

    current = Number.isFinite(result)
        ? String(Number(result.toPrecision(12)))
        : "Error";

    previous = null;
    operator = null;
    shouldReset = true;

    updateDisplay();
}

function percentage() {
    if (current === "Error") return;
    current = String(Number(current) / 100);
    updateDisplay();
}

function toggleSign() {
    if (current === "Error" || current === "0") return;

    current = String(Number(current) * -1);
    updateDisplay();
}
