let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = '';
let lastInput = ''; // To track the last input

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerHTML;

        if (buttonText === 'DEL') {
            string = string.slice(0, -1);
            display.value = string || '0';
        } else if (buttonText === 'AC') {
            string = '';
            display.value = '0';
        } else if (buttonText === '=') {
            try {
                // Evaluate the string safely and handle decimal precision
                string = parseFloat(eval(string).toFixed(10)).toString();
                display.value = string;
            } catch {
                display.value = 'Error';
                string = '';
            }
        } else {
            if (
                ['+', '-', '*', '/', '%'].includes(buttonText) &&
                ['+', '-', '*', '/', '%'].includes(lastInput)
            ) {
                // Prevent consecutive operators
                return;
            }

            if (buttonText === '.' && lastInput === '.') {
                // Prevent multiple decimals in a row
                return;
            }

            if (buttonText === '.' && !string || lastInput === '' && buttonText === '.') {
                // Add leading zero if a decimal starts a number
                string += '0.';
            } else {
                string += buttonText;
            }

            display.value = string;
        }

        lastInput = buttonText; // Update the last input tracker
    });
});
