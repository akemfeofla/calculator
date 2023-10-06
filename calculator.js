// class에는 총 3가지 속성의 생성자가 있음.
// 첫번째,두번째 속성: HTML요소로 이전답변과 현재 계산을 표시하는 텍스트 필드.
// 세번째 속성: 현재 입력 또는 계산중인 피연산자.

class Calculator {
  previousOperandTextElement = document.querySelector(
    '[data-previous-operand]'
  );
  currentOperandTextElement = document.querySelector('[data-current-operand]');
  currentOperand = '';

  //this: 어떤 객체 '{}' 를 가리키는 용어임. -> "this는 '함수'를 호출한 '객체'이다."

  clear = () => {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  };

  //.toString -> 배열의 값을 문자열로 변환.
  // slice(startIndex, endIndex) -> 배열의 시작인덱스(포함) 부터 끝인덱스(불포함) 까지 복사한 값을 담음
  delete = () => {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  };

  appendNumber = (number) => {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  };

  chooseOperation = (operation) => {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  };

  compute = () => {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
      default:
        return;
    }
    // console.log(computation); 왜 더하기만 계산하지...
    this.operation = undefined;
    this.currentOperand = computation;
    this.previousOperand = '';
  };

  updateDisplay = () => {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.operation
      ? (this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`)
      : (this.previousOperandTextElement.innerText = '');
  };
}

// class에 적용할 메서드들
const {
  appendNumber,
  chooseOperation,
  clear,
  compute,
  delete: del,
  updateDisplay,
} = new Calculator();

document.querySelectorAll('[data-number]').forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

document.querySelectorAll('[data-operation]').forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

document.querySelector('[data-equals]').addEventListener('click', () => {
  compute();
  updateDisplay();
});

document.querySelector('[data-all-clear]').addEventListener('click', () => {
  clear();
  updateDisplay();
});

document.querySelector('[data-delete]').addEventListener('click', () => {
  del();
  updateDisplay();
});
