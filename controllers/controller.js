const calcualte_expression = (req, res) => {
  const postfix = infixToPostfix(req.body.exp);

  const converted = postfix.split("");
  console.log(converted + " converted");

  //to  store result
  let result = [];

  for (let i = 0; i < converted.length; i++) {
    // if operand
    if (converted[i] > 0 && converted[i] <= "9") {
      result.push(converted[i]);
    } else {
      // if operand  pop two previous values from stack/result
      const val1 = result.pop();
      const val2 = result.pop();
      // console.log(val1 + val2);

      switch (
        converted[i] // check operators
      ) {
        case "+":
          result.push(parseInt(val1) + parseInt(val2));
          // console.log(result);
          break;
        case "-":
          result.push(parseInt(val2) - parseInt(val1));
          break;
        case "/":
          result.push(parseInt(val2) / parseInt(val1));
          break;
        case "*":
          result.push(parseInt(val1) * parseInt(val2));
          console.log(result);
          break;
        // case "^":
        //   result.push(Math.pow(parseInt(val1), parseInt(val2)));
        //   break;
      }
    }
  }

  if (result.length > 1) {
    res.json({ result: "error" });
  } else {
    res.json({ result: result.pop() });
  }
};

//********************************************************** */
function precedence(op) {
  if (op == "^") {
    return 3;
  } else if (op == "/" || op == "*") {
    return 2;
  } else if (op == "+" || op == "-") {
    return 1;
  } else {
    return 0;
  }
}

//Function for converting a infix expression to postfix expression
function infixToPostfix(exp) {
  let stack = [];
  let postFix = "";

  for (let i = 0; i < exp.length; i++) {
    //if operand
    if (exp[i] >= "0" && exp[i] <= "9") {
      postFix += exp[i];
    } else if (exp[i] == "(") {
      stack.push("(");
    } else if (exp[i] == ")") {
      // if ')' extract all opereators from stck and push it to postfix until '(' arrives
      while (stack[stack.length - 1] != "(") {
        postFix += stack[stack.length - 1];
        stack.pop();
      }
      stack.pop();
    } else {
      // if operators
      while (
        stack.length != 0 &&
        precedence(exp[i]) <= precedence(stack[stack.length - 1]) // check precedance
      ) {
        postFix += stack[stack.length - 1];
        stack.pop();
      }
      stack.push(exp[i]);
    }
  }

  while (stack.length != 0) {
    postFix += stack[stack.length - 1];
    stack.pop();
  }

  return postFix;
}

module.exports = { calcualte_expression };
