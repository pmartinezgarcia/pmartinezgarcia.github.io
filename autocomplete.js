var options = new Map(); //(k,v) = (letter, array of strings that start w/ that letter)

//populates hash map with arrays of strings that start with the same letter
function populateHashMap() {
    //will change this once we have the template
    let text = "abc abcdef def hij klm nop".split(" ");
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
function searchHashTable(str) {
    return options.get(str.charAt(0));
}

//tab through options, enter to confirm
function autocomplete1() {

}

//arrow keys through separate div boxes
function autocomplete2(input, map) {
    var current;
    input.addEventListener("input", function(e){
        var currentWord = this.value.split(" ").pop();
        var currentSelection = -1;
        var currentOptions = options.get(currentWord.charAt(0));
        var outer = document.createElement("DIV");
        closeAllLists();
        this.parentNode.appendChild(outer);
        outer.setAttribute("id", this.id + "autocomplete-list");
        outer.setAttribute("class", "autocomplete-items");
        var inner;
        if (currentOptions != undefined){
            var displayIndex = 0;
            for (var i = 0; i < currentOptions.length; i++) {
                if (currentOptions[i].substr(0, currentWord.length) == currentWord) {
                    inner = document.createElement("DIV");
                    inner.innerHTML = currentOptions[i];
                    inner.innerHTML += "<input type='hidden' value='" + currentOptions[i] + "'>";
                    inner.addEventListener("click", function(e) {
                        input.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    var xy = getCursorXY(document.getElementById("sentence"));
                    inner.style.position = "absolute";
                    inner.style.left = xy.x + "px";
                    inner.style.top = (xy.y + (15*displayIndex)) + "px";
                    displayIndex++;
                    outer.appendChild(inner);
                }
            }
        }
    });
    function closeAllLists(elmnt) {
         var autocompleteList = document.getElementsByClassName(
            "autocomplete-items"
         );
         for (var i = 0; i < autocompleteList.length; i++) {
            //if (elmnt != autocompleteList[i] && elmnt != searchEle) {
               autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
            //}
         }
      }
    document.addEventListener("click", function(e) {
        closeAllLists();
    });
}

/**
 * returns x, y coordinates for absolute positioning of a span within a given text input
 * at a given selection point
 * @param {object} input - the input element to obtain coordinates for
 * @param {number} selectionPoint - the selection point for the input
 */
const getCursorXY = (input, selectionPoint) => {
  const {
    offsetLeft: inputX,
    offsetTop: inputY,
  } = input
  // create a dummy element that will be a clone of our input
  const div = document.createElement('div')
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input)
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop]
  }
  // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
  const swap = '.'
  const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value
  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint)
  // set the text content of the dummy element div
  div.textContent = textContent
  if (input.tagName === 'TEXTAREA') div.style.height = 'auto'
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto'
  // create a marker element to obtain caret position
  const span = document.createElement('span')
  // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
  span.textContent = inputValue.substr(selectionPoint) || '.'
  // append the span marker to the div
  div.appendChild(span)
  // append the dummy element to the body
  document.body.appendChild(div)
  // get the marker position, this is the caret position top and left relative to the input
  const { offsetLeft: spanX, offsetTop: spanY } = span
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
  document.body.removeChild(div)
  // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
  return {
    x: inputX + spanX,
    y: inputY - 490 //adjusted for box size
  }
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