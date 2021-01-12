"use strict"
console.info("%cState: operative", "font-weight:bold;font-size:15px;color:#00ff00");

function Compatibilty() {
  var test1 = performance.now();
  test(3, 3, 4, 5);
  var test2 = performance.now();
  if (Number.isInteger(test2 - test1)) {
    document.querySelector("b").style.display = "none"
  }
}

let test = function(a, b, c, d) { return a * b / c * d }

let main = document.querySelector("main");
let input = document.querySelector("input");
let response = document.querySelector("h2");
let button = document.querySelector("button");
let show_result = document.getElementById("result");
let section = document.querySelector("section");
let info = document.getElementById("info");
let link1 = document.getElementById("link1");
let link2 = document.getElementById("link2");

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { event.preventDefault(); button.click() }
})
document.getElementById("link1").addEventListener("click", function() {
  main.style.display = "none";
  section.style.display = "block";
  link2.style.display = "inline";
  document.getElementById('clear').style.display = "inline";
  ShowStorage();
})
document.querySelector("b").addEventListener("click", function() {
  document.querySelector("aside").style.width = "100%";
  document.querySelector("div").style.display = "none";
})
document.querySelector("aside > button").addEventListener("click", function() {
  input.value = 1e+40;
  ValidateInput();
  document.querySelector("span > h2").innerHTML = document.querySelector("i").innerHTML;
  document.querySelector("span").style.display = "block";
  document.querySelector("aside").style.filter = "blur(8px)";
  document.querySelector("aside").style.pointerEvents = "none";
})
document.querySelector("aside > a").addEventListener("click", function() {
  document.querySelector("aside").style.width = "0";
  document.querySelector("div").style.display = "block";
})

function ValidateInput() {
  show_result.innerHTML = "";
  document.querySelector("b").style.display = "none";
  console.clear();
  console.info("%cState: operative", "font-weight:bold;font-size:15px;color:#00ff00");
  document.querySelector("i").style.display = "none"
  info.style.display = "none";
  link1.style.display = "none";
  try {
    if (input.value < 0) throw "Please enter a positive number";
    if (input.value == 1) throw "Please enter a number bigger than 1";
    if (input.value == "") throw "Please enter a number";
    if (input.value == 0) throw "Please enter a number that is different from 0";
    if (input.value.includes(".")) throw "Please enter an integer";
  } catch (error) {
    response.innerHTML = error;
    console.log("%cInput response: " + '"' + error + '"', "font-size:15px;color:red");
    return false
  }
  info.style.display = "inline";
  link1.style.display = "inline";
  document.querySelector("i").style.display = "block"
  console.log("%cPrime factor decomposition for " + input.value + ":", "font-size:15px;color:#4dc3ff");

  const t0 = performance.now();
  Calculation();
  const t1 = performance.now();
  const result_timer = Math.round((t1 - t0 + Number.EPSILON) * 1000) / 1000;
  if (Number.isInteger(t1 - t0)) {
    document.querySelector("i").delete()
  }
  document.querySelector("i").innerHTML = "The results were found in " + result_timer + " milliseconds!";
}

function Calculation(dividend = input.value, divisor = 2) {
  let text = "";
  let count_calculation = 0;
  let count_loop = -1;
  console.time("The program went on for");
  while (dividend > 1) {
    let exponent = 0;
    while (dividend % divisor == 0) {
      let result = dividend / divisor;
      count_calculation++;
      console.log("%cCalculation " + "(" + count_calculation + ")" + ":", "color:coral;font-size:15px");
      console.log("%c " + dividend + " \u00f7 " + divisor, "font-size:14px");
      dividend = result;
      exponent += 1;
    }
    if (exponent >= 1) {
      text += "<br>" + divisor + "<sup style='color:#55dda4'>" + exponent + "</sup>"
    }
    divisor += 1;
    count_loop++;
  }

  console.log("%cCalculation finished", "font-size:15px;color:#4dc3ff");
  console.groupCollapsed("%cComplementary Information", "font-size:15px;color:#bd66ff;font-weight:bold");
  console.log("The divisor (initially set to 2) increased " + count_loop + " time(s).");
  console.timeEnd("The program went on for");
  console.groupEnd();

  if (divisor - 1 == input.value) {
    response.innerHTML = "<a style=color:#4dc3ff;text-decoration:none>" + input.value + "</a>" + " is a " + "prime number" + " !";
  } else {
    response.innerHTML = "Prime factor decomposition for " + "<a style=color:#4dc3ff;text-decoration:none>" + input.value + "</a>" + ":";
  }
  show_result.innerHTML = text;
  show_result.style.color = "#ff8f66";
  localStorage.setItem("LOCAL STORAGE FILE CREATED ON: " + new Date(), `${input.value}`);
}

function ShowStorage() {
  let values = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]))
  }
  values.sort(function(a, b) {
    return b - a
  });
  document.querySelector("h3").innerHTML = "The following numbers were previously prime factorized on your device: " + "</br>" + "</br>" + "<i style='color:#4dc3ff;user-select:text'>" + values.join(",  ") + "</i>";
  if (keys.length == 0) {
    link1.style.display = "none"
  }
}
