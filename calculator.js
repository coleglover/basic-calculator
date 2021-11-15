let runningTotal = 0;
let numberInFocus = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");


document.querySelector('.calc-buttons').addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
})

function buttonClick (value) {
    if (isNaN(parseInt(value))){     
        //console.log(`NaN clicked is: ${value}`); // check for NaN
        handleSymbol(value);
    } else {
        handleNumber(value)
    }
    rerender();
}

function handleNumber(value) {
    if (screen.innerText === "0") {
        numberInFocus = value;
    } else {
        numberInFocus += value;
    }
}

function handleSymbol(value) {
    
    // switch statement is used to identify which symbol user clicked
    switch (value){

        // "C" on calculator resets all values
        case "C":
            numberInFocus = "0";
            runningTotal = 0;
            break;

        case "←":
            // blocking user from removing last character
            if (screen.innerText.length === 1){
                numberInFocus = 0;
            } else {
                // removing character in last position
                numberInFocus = numberInFocus.slice(0, - 1);
            }
            break;

        case "=":
            if (previousOperator === null) {
                return
            } 
            doArithematic(parseInt(numberInFocus))
            previousOperator = null;
            numberInFocus = "" + runningTotal;
            break;
        
        // if none of the symbols above were used, it was an arithmatic operator, thus fire handleMath
        default:
            handleMath(value);
            break;            
    }
}

function handleMath(value){
    const intNumberInFocus = parseInt(numberInFocus);

    console.log(`numberInFocus: ${intNumberInFocus}, value: ${value}`);

    if (runningTotal === 0){
        runningTotal = intNumberInFocus;
    } else {
        doArithematic(intNumberInFocus);
    }

    previousOperator = value;  
    numberInFocus = "0";
}

function doArithematic(intNumberInFocus) {
    let placeHolder = runningTotal;

    switch(previousOperator) {
        
        case "+":
            runningTotal += intNumberInFocus;
            break;
        case "−":
            runningTotal -= intNumberInFocus;
            break;
        case "×":
            runningTotal *= intNumberInFocus;
            break;
        case "÷":
            runningTotal /= intNumberInFocus;
            break;
    }
    console.log(`${intNumberInFocus} ${previousOperator} ${placeHolder} = ${runningTotal}`);
}
function rerender(){
    screen.innerText = parseInt(numberInFocus);  
}
