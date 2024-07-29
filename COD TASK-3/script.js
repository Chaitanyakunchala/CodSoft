// script.js

let display = document.getElementById('display');
let currentInput = '';
let currentOperation = null;
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentInput += value;
            updateDisplay();
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperation(value);
        } else if (value === '.') {
            addDecimal();
        }
    });
});

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function clear() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    updateDisplay();
}

function setOperation(operation) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '';
        currentOperation = operation;
    }
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && currentOperation) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
        }

        currentInput = result.toString();
        previousInput = '';
        currentOperation = null;
        updateDisplay();
    }
}

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

updateDisplay();