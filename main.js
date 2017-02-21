// get all keys from document

var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
var len = keys.length;


// add onclick event to all keys and perform operations
for (var i = 0; i < len; i++) {
    keys[i].onclick = function(e) {
        // get value of input field and buttons
        var input = document.querySelector('.screen');
        var log = document.querySelector('.log');
        var logVal = log.innerHTML;
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;
        if(btnVal === 'C') {
            input.innerHTML = '';
            log.innerHTML = '';
            decimalAdded = false;
        }
        // if eval(sum) key then calculate and show result.
        else if(btnVal === '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length -1];
            
            //regex replace x and ÷ with * and /
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            
            // check last character in input string. Remove if operator
            if (operators.indexOf(lastChar) > -1 || lastChar === '.')
                equation = equation.replace(/.$/, '');
            
            if (equation)
                input.innerHTML = eval(equation);
                log.innerHTML += ' = ' + input.innerHTML + '<br>' + '<hr>' + input.innerHTML;

            decimalAdded = false;
            }
            
        // when operator button clicked get last character.
        else if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length -1];
            //add operator if input is not empty
            if (inputVal != '' && operators.indexOf(lastChar) === -1) {
                input.innerHTML += btnVal;
                log.innerHTML += btnVal;
            }
            
        else if (inputVal === '' && btnVal === '-') {
            input.innerHTML += btnVal;
            log.innerHTML += btnVal;
        }
            
        if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
            input.innerHTML = inputVal.replace(/.$/, btnVal);
        }
        decimalAdded = false;
        }
        else if (btnVal === '.') {
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                log.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
            // append pressed key
            else {
                input.innerHTML += btnVal;
                log.innerHTML += btnVal;
            }
            e.preventDefault();
        }
}