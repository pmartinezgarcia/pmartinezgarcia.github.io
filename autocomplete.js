var options = new Map(); //(k,v) = (letter, array of strings that start w/ that letter)
var raw = "function array_mode array_in var tally ans for push length ";
var optionsArray = [];

function startTimer() {

}

//populates hash map with arrays of strings that start with the same letter
function populateHashMap(inputs) {
    //will change this once we have the template
    let raw = inputs;
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

function populateOptionsArray(inputs) {
    let raw = inputs;
    let text = raw.split(" ");
    for (var i = 0; i < text.length; i++) {
        optionsArray.push(text[i]);
    }
}

function searchArray(str) {
    var matches = [];
    for (var i = 0; i < optionsArray.length; i++) {
        if (optionsArray[i].substring(0, str.length) === str) {
            matches.push(optionsArray[i]);
        }
    }
    return matches;
}

//tab through options, enter to confirm
function autocomplete1(input, map) {
    let insertedText = "";
    let currentSelection = -1;
    let textBefore;
    let textAfter;
    input.addEventListener("click", handleClick);
    input.addEventListener("input", handleInput);
    input.addEventListener("keyup", handleKeyup);

    function handleClick(currentClick) {
        currentSelection = -1;
        updateText();
    }

    function handleInput(currentInput) {
        updateText();
    }

    function handleKeyup(currentKeyup) {
        if (currentKeyup.key != "Tab") {
            updateText();
        }
    }

    function getCurrentWord() {
        let startPosition = input.selectionStart;
        let endPosition = input.selectionEnd;
        if (startPosition !== endPosition) {
            return null;
        }
        let text = input.value;

        if (textBefore[textBefore.length - 1] === ' ' || (textAfter && textAfter[0] !== ' ')) {
            return null;
        }
        return textBefore.split(/[ \n\t,(){};\[\]<>=+".]/).pop();

    }

    function displaySelection() {
        let currentWord = getCurrentWord();
        if (currentWord) {
            let currentOptions = searchArray(currentWord);
            console.log("Before:", textBefore);
            insertedText = currentOptions[currentSelection % currentOptions.length].substring(currentWord.length);
            input.value = textBefore + insertedText + textAfter;
            console.log("Inserted: ", insertedText);
            input.selectionStart = textBefore.length + insertedText.length;
            input.selectionEnd = textBefore.length + insertedText.length;
        }
    }

    function updateText() {
        textBefore = input.value.substring(0, input.selectionStart);
        textAfter = input.value.substring(input.selectionStart);
        insertedText = "";
        currentSelection = -1;
    }

    document.getElementById("sentence").addEventListener("keydown", function(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            if (getCurrentWord()) {
                currentSelection = currentSelection + 1;
                displaySelection();
            } else {
                this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
                this.selectionStart = start + 1;
                this.selectionEnd = start + 1;
            }
        }
    });

}

//arrow keys through separate div boxes
function autocomplete2(input, map) {
    var currentSelection;
    var cursorPosition = 0;
    input.addEventListener("input", function(e){
        //console.log(this.value.split(/ |\n|,|\(|\)|\{|\}|\;/));
        var currentCursor = this.value.substr(0, cursorPosition);
        var currentWord = currentCursor.split(/[ \n\t,(){};\[\]<>=+".]/).pop();
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
                        input.value = currentCursor.substr(0,currentCursor.length - currentWord.length)
                            + this.getElementsByTagName("input")[0].value
                            + input.value.substr(currentCursor.length);
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
        var list = document.getElementById("list");
        var listAll;
        if (list != undefined) {
            listAll = list.getElementsByTagName("DIV");
        } else {
            return;
        }
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

    input.addEventListener("keyup", e => {
        cursorPosition = e.target.selectionStart + 1;
    })

    document.getElementById("sentence").addEventListener("keydown", function(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
    
            this.selectionStart = start + 1;
            this.selectionEnd = start + 1;
        }
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
    return { x: spanX, y: inputY + spanY - 1380 }
}

populateHashMap(raw);
populateOptionsArray(raw);
var autocompleteSelect = document.getElementById("autocomplete-select");
autocompleteSelect.addEventListener("change", function(e){
    var autocomplete = autocompleteSelect.value;
    if (autocomplete == 1) {
        autocomplete1(document.getElementById("sentence"), options);
    } else if (autocomplete == 2) {
        autocomplete2(document.getElementById("sentence"), options);
    }
});