const prevOpText = document.querySelector('.previous-op')
const curOpText = document.querySelector('.current-op')
const buttons = document.querySelectorAll('.btn-container button')

class Calculator{
    
    constructor(prevOpText, curOpText) {
        this.prevOpText = prevOpText
        this.curOpText = curOpText
        this.currentOperation = ""
    }

    addDigit(digit){
        if (digit === "." && this.curOpText.innerText.includes(".")){
            return;
        };
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation){
        if (this.curOpText.innerText === "" && operation !== "C"){
            if (this.prevOpText.innerText !== ""){
                this.changeOperation(operation)
            }
            return;
        }

        let operationValue;
        const previous = +this.prevOpText.innerText.split(" ")[0];
        const current = +this.curOpText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "DEL":
                this.processDelOperation()
                break;
            case "C":
                this.processClearAllOperation()
                break;
            case "CE":
                this.processClearOperation()
                break;
            case "=":
                this.processEqualOperator()
                break;
            case "=":
                this.processEqualOperator()
                break;    
            default:
                return; 
        }
    }

    updateScreen(
        operationValue = null,
        operation = null,
        previous = null,
        current = null
    ){
        console.log(operationValue, operation, previous, current)
        if (operationValue === null){
            this.curOpText.innerText += this.currentOperation;
        } else {
            if (previous == 0){
                operationValue = current
            };
            this.prevOpText.innerText = `${operationValue} ${operation}`
            this.curOpText.innerText = ""         
        };
    };
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)){
            return;
        }

        this.prevOpText.innerText = this.prevOpText.innerText.slice(0, -1) + operation
    }

    processDelOperation(){
        this.curOpText.innerText = this.curOpText.innerText.slice(0, -1)
    }

    processClearAllOperation(){
        this.prevOpText.innerText = ""
        this.curOpText.innerText = ""
    }

    processClearOperation(){
        this.curOpText.innerText = ""
    }

    processEqualOperator(){
        const operation = this.prevOpText.innerText.split(" ")[1]
        this.processOperation(operation)
    }

};

const calc = new Calculator(prevOpText, curOpText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText    
        
        if (+value >= 0 || value === '.'){
            calc.addDigit(value)
        } else {
            calc.processOperation(value);
        }

    });
});


