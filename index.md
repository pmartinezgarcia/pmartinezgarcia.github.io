<style>

.list-elements {
  position: absolute;
  border-bottom: none;
  border-top: none;
  left: 0;
  right: 0;
}

.list-elements div {
  padding: 1px;
  background-color: #fff;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  font-size: 12px;
}

.list-elements div:hover {
  background-color: DodgerBlue;
  color: #ffffff;
}

.selection {
  background-color: Blue !important;
  color: #ffffff;
}

textarea, /* for tab chars */
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


<h3>
    <form method="post" action="/form" autocomplete="off">
    <select id="autocomplete-select">
      <option value="">--Please choose an option--</option>
      <option value="1">tab select</option>
      <option value="2">arrow select</option>
    </select>
    <label for="sentence">Type the sentence as quickly and accurately as you can: </label>
    <br>
    <textarea spellcheck="false" type="text" style="height:500px; width:1000px;" id="sentence" name="sentence"></textarea>
    <script src="autocomplete.js"></script>
    </form>
</h3>


</body>
