var options = new Map(); //(k,v) = (letter, array of strings that start w/ that letter)

//populates hash map with arrays of strings that start with the same letter
function populateHashMap() {
    //will change this once we have the template
    let raw = "function array_mode array_in var tally ans for push length "
    let text = raw.split(" ");
    for (var i = 0; i < text.length; i++) {
        let word = text[i];
        let wordArr = options.get(word.charAt(0));
        if (wordArr != undefined) {
            wordArr.push(word);
        } else {
            options.set(word.charAt(0), [word]);
        }
    }
}

//currently returns all options that start with the correct character
//probably not that useful
function searchHashTable(str) {
    return options.get(str.charAt(0));
}

//tab through options, enter to confirm
function autocomplete1() {

}

//arrow keys through separate div boxes
function autocomplete2(input, map) {
    var currentSelection;
    input.addEventListener("input", function(e){
        //console.log(this.value.split(/ |\n|,|\(|\)|\{|\}|\;/));
        var currentWord = this.value.split(/[ \n\t,(){};\[\]<>=+".]/).pop();
        currentSelection = -1;
        var currentOptions = options.get(currentWord.charAt(0));
        var outer = document.createElement("DIV");
        close();
        this.parentNode.appendChild(outer);
        outer.setAttribute("id", "list");
        outer.setAttribute("class", "list-elements");
        var inner;
        if (currentOptions != undefined){
            var displayIndex = 0;
            for (var i = 0; i < currentOptions.length; i++) {
                if (currentOptions[i].substr(0, currentWord.length) == currentWord) {
                    inner = document.createElement("DIV");
                    inner.innerHTML = currentOptions[i];
                    inner.innerHTML += "<input type='hidden' value='" + currentOptions[i] + "'>";
                    inner.addEventListener("click", function(e) {
                        input.value = input.value.substr(0,input.value.length - currentWord.length)
                            + this.getElementsByTagName("input")[0].value;
                        close();
                    });
                    var xy = getCursorXY(document.getElementById("sentence"));
                    inner.style.position = "absolute";
                    inner.style.left = xy.x + "px";
                    inner.style.top = (xy.y + (16*displayIndex)) + "px";
                    displayIndex++;
                    outer.appendChild(inner);
                }
            }
        }
    });

    input.addEventListener("keydown", function(e) {
        var listAll = document.getElementById("list").getElementsByTagName("DIV");
        if (e.key == "ArrowUp") {
            if (currentSelection <= 0) {
                currentSelection = listAll.length - 1;
            } else {
                currentSelection--;
            }
            select(listAll);
        } else if (e.key == "ArrowDown") {
            if (currentSelection >= listAll.length -1) {
                currentSelection = 0;
            } else {
                currentSelection++;
            }
            select(listAll);
        } else if (e.key == "Enter" && currentSelection != -1) {
            e.preventDefault();
            listAll[currentSelection].click();
        } else if (e.key == "Escape") {
            close();
        }
    });

    function select(selections) {
        if (selections != undefined) {
            unselect(selections);
            selections[currentSelection].classList.add("selection");
        }
    }

    function unselect(selections) {
        for (var i = 0; i < selections.length; i++) {
            selections[i].classList.remove("selection");
        }
    }

    function close(e) {
         var autocompleteList = document.getElementsByClassName("list-elements");
         for (var i = 0; i < autocompleteList.length; i++) {
            autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
         }
      }
    
    document.addEventListener("click", function(e) {
        close();
    });
}

function getCursorXY(input, cursor) {
    var { offsetLeft: inputX, offsetTop: inputY } = input;
    var div = document.createElement("DIV");
    var style = getComputedStyle(input);
    for (var p of style) {
    div.style[p] = style[p];
    }
    var span = document.createElement('span');
    var inputValue = input.value.replace(/ /g, ".");
    div.textContent = inputValue.substr(0, cursor);
    span.textContent = inputValue.substr(cursor);
    div.appendChild(span);
    document.body.appendChild(div);
    var { offsetLeft: spanX, offsetTop: spanY } = span;
    document.body.removeChild(div);
    //adjusted for box size and cursor location
    //this screws up if the window size changes i think
    return { x: spanX - 2, y: inputY + spanY - 1405 }
}

document.getElementById('sentence').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

populateHashMap();
autocomplete2(document.getElementById("sentence"), options);