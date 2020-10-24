<style>
* {
  box-sizing: border-box;
}

body {
  font: 16px Arial;  
}

/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 1px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
  font-size: 12px;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9; 
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important; 
  color: #ffffff; 
}

textarea,
pre {
    -moz-tab-size : 4;
      -o-tab-size : 4;
         tab-size : 4;
}
</style>

<body style="background-color:#ECECE6;">
    <h1 align="center" style="color:#2A7CB9;" id="head">Code Autocomplete Tester</h1>
    <h3 align="center" style="color:black;" id="inst">Click on your team to begin a new test.</h3>
    <p align="center" style="color:black;" id="description">Total time: <span id="time">0</span>ms</p>

<nav align="center">
    <a href="#">Team 6 Test</a> |
    <a href="#">Team 13 Test</a>
</nav>

<h3>
    <form method="post" action="/form" autocomplete="off">
    <label for="sentence">Type the sentence as quickly and accurately as you can: </label>
    <textarea spellcheck="false" type="text" style="height:500px; width:1000px;" id="sentence" name="sentence"></textarea>
    <script src="autocomplete.js"></script>
    </form>
</h3>


</body>
