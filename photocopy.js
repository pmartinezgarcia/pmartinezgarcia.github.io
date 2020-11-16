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

function onScanClick() {

    initPreview();

    sessionStorage.pages_scanned = parseInt(sessionStorage.pages_scanned) + parseInt(sessionStorage.input_sidedness);
    sessionStorage.current_page = sessionStorage.pages_scanned;
    if (sessionStorage.pages_scanned > 6) {
        sessionStorage.pages_scanned = 6;
    }

    updatePreview();
    
}

function updatePreview() {
    let preview_img = document.getElementById("preview_image");
    preview_img.src = `images/preview_images/page0${sessionStorage.current_page}.png`;
    preview_img.style = `filter: brightness(${parseInt(sessionStorage.brightness) + 50}%)`
    document.getElementById("current_page").textContent = `Page ${sessionStorage.current_page} of ${sessionStorage.pages_scanned}`
}

function initPreview() {
    let preview_element = document.getElementById("preview_pane");
    if (!document.getElementById("preview_image")) {
        let preview_img = document.createElement("IMG");
        preview_img.id = "preview_image";
        preview_element.insertBefore(preview_img, preview_element.lastChild);
        sessionStorage.pages_scanned = 0;
        let prev_button = document.createElement("BUTTON");
        prev_button.type = "button";
        prev_button.id = "prev_page";
        prev_button.textContent = "Previous Page";
        prev_button.addEventListener("click", function (e){
            if (sessionStorage.current_page > 1) {
                sessionStorage.current_page = parseInt(sessionStorage.current_page) - 1;
                updatePreview();
            }
        })
        document.getElementById("prev_button").appendChild(prev_button);
        let next_button = document.createElement("BUTTON");
        next_button.type = "button";
        next_button.id = "next_page";
        next_button.textContent = "Next Page";
        next_button.addEventListener("click", function (e){
            if (sessionStorage.current_page < sessionStorage.pages_scanned) {
                sessionStorage.current_page = parseInt(sessionStorage.current_page) + 1;
                updatePreview();
            }
        })
        document.getElementById("next_button").appendChild(next_button);
        sessionStorage.current_page = 1;
    }
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
    sessionStorage.separator_bin = "None";
}

if (!sessionStorage.input_sidedness) {
    sessionStorage.input_sidedness = 1;
}

if (!sessionStorage.output_sidedness) {
   sessionStorage.output_sidedness = 1;
}

if (!sessionStorage.pages_scanned) {
    sessionStorage.pages_scanned = 0;
}

if (!sessionStorage.current_page) {
    sessionStorage.current_page = 0;
}

var scanButton = document.getElementById("scan");
scanButton.addEventListener("click", onScanClick);
var printButton = document.getElementById("print");
printButton.addEventListener("click", function (e) {
    confirm("Are you sure you would like to print?");
});

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

  function sideText(text) {
      if (text == 1) {
          return "Single-sided";
      } else if (text == 2) {
          return "Double-sided";
      } else {
          return "Invalid";
      }
  }

  document.getElementById("num_copies").innerHTML = sessionStorage.num_copies;
  document.getElementById("brightness_txt").innerHTML = `${sessionStorage.brightness}%`;
  document.getElementById("brightness_img").src = brightnessImage;
  document.getElementById("input_sidedness_txt").innerHTML = sideText(sessionStorage.input_sidedness);
  document.getElementById("input_sidedness_img").src = inputImage;
  document.getElementById("output_sidedness_txt").innerHTML = sideText(sessionStorage.output_sidedness);
  document.getElementById("output_sidedness_img").src = outputImage;
  document.getElementById("bin_txt").innerHTML = `Tray ${sessionStorage.current_bin}`;
  document.getElementById("bin_img").src = binImage;
  if (sessionStorage.separator_bin == "None") {
    document.getElementById("separator_page_txt").textContent = "None";
  } else {
    document.getElementById("separator_page_txt").textContent = `Tray ${sessionStorage.separator_bin}`;
  }
  document.getElementById("separator_page_img").src = separatorImage;
}