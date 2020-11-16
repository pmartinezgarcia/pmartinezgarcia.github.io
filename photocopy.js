// appends a number to a textbox called "accountid"
// maximum of 4 digits at a time
// -1 is backspace, -2 is enter
function pressNumPad(num) {
  if(document.getElementById("error") != null) {
    document.getElementById("error").innerHTML = "";
  }
  let current = document.getElementById("accountid").value
  if (current.length == 4) {
    switch (num) {
      case -1: document.getElementById("accountid").value = current.slice(0, -1);
      break;
      case -2: window.location.href = "options.html"; //subject to change
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

function displayPreview(numPages, imageFolder, pagesPerSide) {
    return;
}

function displayPrintSettings() {
    
    var brightnessTxtElement = document.getElementById("brightness_txt");
    
    if (sessionStorage.brightness == 0) {
        brightnessTxtElement.innerHTML = "Normal";
    } else if (sessionStorage.brightness == -1) {
        brightnessTxtElement.innerHTML = "Dark";
    } else if (sessionStorage.brightness == 1) {
        brightnessTxtElement.innerHTML = "Bright";

    }
    return;
}


if (!sessionStorage.brightness) {
    sessionStorage.setItem("brightness", 0);
}

if (!sessionStorage.current_bin) {
    sessionStorage.current_bin = "A";
}

if (!sessionStorage.num_copies) {
    sessionStorage.num_copies = 1;
}

if (!sessionStorage.separator_page) {
    sessionStorage.separator_page = false;
}

if (!sessionStorage.separator_bin) {
    sessionStorage.separator_bin = "A";
}

if (!sessionStorage.input_sidedness) {
    sessionStorage.input_sidedness = 0;
}

if (!sessionStorage.output_sidedness) {
    sessionStorage.output_sidedness = 0;
}

if (!sessionStorage.output_sides) {
    sessionStorage.output_sides = 0;
}

var scanButton = document.getElementById("scan");
scanButton.addEventListener("click", displayPrintSettings);
