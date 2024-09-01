const display = document.getElementById('display');
        const buttons = document.querySelectorAll('button');
        let currentInput = '';
        let operator = '';
        let operand1 = '';
        let operand2 = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');

                if (value === 'C') {
                    clearDisplay();
                } else if (value === '=') {
                    calculate();
                } else {
                    appendDisplay(value);
                }
            });
        });

        function appendDisplay(value) {
            if (isOperator(value)) {
                if (currentInput && operand1 && !operand2) {
                    operand2 = currentInput;
                    calculate();
                } else {
                    operand1 = currentInput;
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
            }
            display.value += value;
        }

        function clearDisplay() {
            display.value = '';
            currentInput = '';
            operator = '';
            operand1 = '';
            operand2 = '';
        }

        function calculate() {
            if (!operand2) {
                operand2 = currentInput;
            }
            let result;
            if (operator === '+') {
                result = parseFloat(operand1) + parseFloat(operand2);
            } else if (operator === '-') {
                result = parseFloat(operand1) - parseFloat(operand2);
            } else if (operator === '*') {
                result = parseFloat(operand1) * parseFloat(operand2);
            } else if (operator === '/') {
                result = parseFloat(operand1) / parseFloat(operand2);
            } else if (operator === '%') {
                result = parseFloat(operand1) % parseFloat(operand2);
            }

            display.value = result;
            operand1 = result.toString();
            operand2 = '';
            currentInput = '';
            operator = '';
        }

        function isOperator(value) {
            return ['+', '-', '*', '/', '%'].includes(value);
        }