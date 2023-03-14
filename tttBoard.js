var cells = document.getElementsByClassName('cell');
var mark = 'X'

for(var i = 0; i < cells.length; ++i) {

    cells[i].addEventListener('mouseover', function(){
        this.style.backgroundColor = 'red';
    });

    cells[i].addEventListener('mouseout', function() {
        // Change the background color of the cell back to white
        this.style.backgroundColor = 'white';
      });

    cells[i].addEventListener('click', function(){
        if(this.innerHTML == '') {
            this.innerHTML = mark;
            this.style.fontFamily = 'Comic Sans MS';
            this.style.fontSize = '30px';
            this.style.textAlign = 'center';
            this.style.verticalAlign = 'middle';
            if(mark == 'X') {
                mark = 'O';
            } else {
                mark = 'X';
            }
        }
    });
}