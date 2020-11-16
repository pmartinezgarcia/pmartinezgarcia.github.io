// appends a number to a textbox called "accountid"
// maximum of 4 digits at a time
// -1 is backspace, -2 is enter
function pressNumPad(num) {
  document.getElementById("error").innerHTML = "";
  let current = document.getElementById("accountid").value
  if (current.length == 4) {
    switch (num) {
      case -1: document.getElementById("accountid").value = current.slice(0, -1);
      break;
      case -2: window.location.href = "print.html"; //subject to change
      break;
    }
    return;
  }
  switch (num) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0: document.getElementById("accountid").value = current + num;
    break;
    case -1: document.getElementById("accountid").value = current.slice(0, -1);
    break;
    case -2: document.getElementById("error").innerHTML = "ID must be 4 digits long";
    break;
  }
}