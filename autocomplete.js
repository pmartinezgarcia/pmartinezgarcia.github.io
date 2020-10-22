var options = new Map(); //(k,v) = (letter, array of strings that start w/ that letter)

//populates hash map with arrays of strings that start with the same letter
function populateHashMap() {
    //will change this once we have the template
    let text = document.getElementById("text").value.split(" ");
    for (var i = 0; i < text.length; i++) {
        let word = options.get(text[i]);
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
function autocomplete2() {

}