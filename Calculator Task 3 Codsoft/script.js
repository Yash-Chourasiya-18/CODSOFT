const display = document.querySelector(".display");
let output = "";
let lastOperand = "";
let lastOperator = "";

const calculate = (input) => {
  if (input === "=") {
    try {
      if (!output && lastOperator && lastOperand && display.value) {
        output = eval(`${display.value}${lastOperator}${lastOperand}`).toString();
      } else {
        output = eval(output.replace(/%/g, "/100")).toString();

        // Store last operation
        const opMatch = output.match(/([+\-*/%])(\d+\.?\d*)$/);
        if (opMatch) {
          lastOperator = opMatch[1];
          lastOperand = opMatch[2];
        }
      }
    } catch {
      output = "Error";
    }
  } else if (input === "AC") {
    output = "";
    lastOperand = "";
    lastOperator = "";
  } else if (input === "DEL") {
    output = output.slice(0, -1);
  } else {
    const lastChar = output.slice(-1);
    const isOp = /[+\-*/%]/.test(input);
    if ((!output && isOp) || (isOp && /[+\-*/%]/.test(lastChar))) return;

    output += input;
  }

  display.value = output;
};

document.querySelectorAll("button").forEach(btn =>
  btn.onclick = () => calculate(btn.dataset.value)
);

document.onkeydown = (e) => {
  const k = e.key;
  if (k === "Enter") return calculate("="), e.preventDefault();
  if (k === "Backspace") return calculate("DEL");
  if (k === "Escape") return calculate("AC");
  if (/[\d+\-*/%.]/.test(k)) return calculate(k);
  e.preventDefault();
};
