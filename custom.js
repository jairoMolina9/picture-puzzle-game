var moves = 0;

function makeGrid() {
  var grid = document.getElementById("grid");

  var numbers = [];

  for(var x = 1; x <= 9; x++) {
    var img_numb = Math.floor(Math.random() * 9) + 1;

    while(numbers.includes(img_numb)) {
      img_numb = Math.floor(Math.random() * 9) + 1;
    }

    numbers.push(img_numb);

    grid.innerHTML += ("<label><div> <input class = 'img-checkbox' type='checkbox' name='img' value='"+img_numb+"'> <img id='"+img_numb+"' src = 'img/"+img_numb+".png'> </div></label>");
  }
}

function swapImages() {

  var imgChecked = [];
  var checkboxes_html = [];

  var checkboxes = document.getElementsByClassName('img-checkbox');

  for(var i=0; checkboxes[i]; ++i){
      if(checkboxes[i].checked){
           imgChecked.push(checkboxes[i].value);
           checkboxes_html.push(checkboxes[i]);
      }
    }

if(imgChecked.length < 2) {
  alert("Must click at least 2 images")
} else {
  var tmpval = checkboxes_html[0].value;
  checkboxes_html[0].value = checkboxes_html[1].value;
  checkboxes_html[1].value = tmpval;

  var img_1 = document.getElementById(imgChecked[0]);
  var img_2 = document.getElementById(imgChecked[1]);

  var tmp_src = img_1.src;
  var tmp_id = img_1.id;

  img_1.src = img_2.src;
  img_2.src = tmp_src;

  img_1.id = img_2.id;
  img_2.id = tmp_id;

  moves++;
}

  document.getElementById("counter").innerHTML = "Moves:" + moves;
  checkWin();
}

function checkLimit(){
  $('.img-checkbox').on('change', function() {
   if($('.img-checkbox:checked').length > 2) {
       this.checked = false;
   }
});

}

function checkWin() {

  var checkboxes = document.getElementsByClassName('img-checkbox');
  var won = true;

  //uncheck all checkboxes
  for(var i=0; checkboxes[i]; ++i){
      checkboxes[i].checked = false;
    }

  //check if checkboxes are in ordered
  for(var i=0; checkboxes[i]; ++i){
      if(checkboxes[i].value != i+1) {
        won = false;
        break;
    }
  }

  //end the game if won
  if(won) {
    endGame();
  }
}

function endGame() {
  document.getElementById("swap").disabled = true;
  $('input[type=checkbox]').attr('disabled','true');
  document.getElementById("counter").innerHTML += "<span class = 'won-text'> YOU WON</span>";
}
