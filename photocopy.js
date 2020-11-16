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
    sessionStorage.brightness = 50;
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
    sessionStorage.input_sidedness = 1;
}

if (!sessionStorage.output_sidedness) {
   sessionStorage.output_sidedness = 1;
}

var scanButton = document.getElementById("scan");
scanButton.addEventListener("click", displayPrintSettings);

function previewImages() {
  let brightnessImage = "images/copier_images/singside_norm.png";
  let inputImage = "images/copier_images/singside_norm.png";
  let outputImage = "images/copier_images/singside_norm.png";
  let binImage = "images/copier_images/copier_trayA.png";
  let separatorImage = "";
  if (sessionStorage.brightness > 66) {
    brightnessImage = "images/copier_images/singside_dark.png";
    inputImage = "images/copier_images/singside_dark.png";
    outputImage = "images/copier_images/singside_dark.png";
  } else if (sessionStorage.brightness < 33) {
    brightnessImage = "images/copier_images/singside_bright.png";
    inputImage = "images/copier_images/singside_bright.png";
    outputImage = "images/copier_images/singside_bright.png";
  } else {
     brightnessImage = "images/copier_images/singside_norm.png";
     inputImage = "images/copier_images/singside_norm.png";
     outputImage = "images/copier_images/singside_norm.png";
  }

  if (sessionStorage.input_sidedness == 2) {
    inputImage = "images/copier_images/doubleside.png";
  }

  if (sessionStorage.output_sidedness == 2) {
    outputImage = "images/copier_images/doubleside.png";
  }

  if (sessionStorage.current_bin == "B") {
    binImage = "images/copier_images/copier_trayB.png";
  } else if (sessionStorage.current_bin == "C") {
    binImage = "images/copier_images/copier_trayC.png";
  }

  if (sessionStorage.separator_bin == "A") {
    console.log("sep page A");
    separatorImage = "images/copier_images/copier_trayA.png";
  } else if (sessionStorage.separator_bin == "B") {
    console.log("sep page B");
    separatorImage = "images/copier_images/copier_trayB.png";
  } else if (sessionStorage.separator_bin == "C") {
    console.log("sep page C");
    separatorImage = "images/copier_images/copier_trayC.png";
  }

  document.getElementById("num_copies").innerHTML = sessionStorage.num_copies;
  document.getElementById("brightness_img").src = brightnessImage;
  document.getElementById("input_sidedness_img").src = inputImage;
  document.getElementById("output_sidedness_img").src = outputImage;
  document.getElementById("bin_img").src = binImage;
  document.getElementById("separator_page_img").src = separatorImage;
}