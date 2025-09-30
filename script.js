const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let previousInput = null;
let resetDisplay = false;

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Error' : a / b;
        default: return b;
    }
}

function updateDisplay(value) {
    display.textContent = value;
}

function clearAll() {
    currentInput = '';
    operator = null;
    previousInput = null;
    resetDisplay = false;
    updateDisplay('0');
}

function inputNumber(num) {
    if (resetDisplay) {
        currentInput = num;
        resetDisplay = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
    }
    updateDisplay(currentInput);
}

function inputOperator(op) {
    if (operator && !resetDisplay) {
        const result = calculate(previousInput, currentInput, operator);
        updateDisplay(result);
        previousInput = result.toString();
    } else {
        previousInput = currentInput;
    }
    operator = op;
    resetDisplay = true;
}

function inputEquals() {
    if (!operator || resetDisplay) return;
    const result = calculate(previousInput, currentInput, operator);
    updateDisplay(result);
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    resetDisplay = true;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        if (button.classList.contains('number')) {
            inputNumber(id === 'decimal' ? '.' : id);
        } else if (button.classList.contains('operator')) {
            inputOperator(button.textContent);
        } else if (id === 'clear') {
            clearAll();
        } else if (id === 'equals') {
            inputEquals();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        inputNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        inputOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        inputEquals();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});
