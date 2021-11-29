function toggleRules(){
    const x = document.getElementById("rules"); 
    if(x.style.display == "none"){
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}
function toggleScore(){
    const x = document.getElementById("score"); 
    if(x.style.display == "none"){
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

// Current board settings

let current_holes = {value:""};
let current_seeds = {value:""};


// This function updates values in slider
let slider_holes ; let output_holes ;

let slider_seeds ; let output_seeds ;

document.addEventListener("DOMContentLoaded", function( ) {
    // holes start function
    slider_holes = document.getElementById("slider_holes");
    output_holes = document.getElementById("output_holes");
    output_holes.innerHTML = slider_holes.value;

    current_holes.value = slider_holes.value;

    slider_holes.oninput = function() {
        output_holes.innerHTML = this.value;
    }

    // seeds start function
    slider_seeds = document.getElementById("slider_seeds");
    output_seeds = document.getElementById("output_seeds");
    output_seeds.innerHTML = slider_seeds.value;
    
    current_seeds.value = slider_seeds.value;

    slider_seeds.oninput = function() {
        output_seeds.innerHTML = this.value;
    }
})


function toggleCancel(){

    slider_holes.value = current_holes.value;
    output_holes.innerHTML = current_holes.value;

    slider_seeds.value = current_holes.value;
    output_seeds.innerHTML = current_holes.value;
    
}

function toggleApply(){

    current_holes.value = slider_holes.value;
    current_seeds.value = slider_seeds.value;
    for(let i=0; i<current_holes.value; i++){   //Função aqui temporariamente para fins de teste
        game_board[i] = current_seeds.value;
    }

}

function debbug(){
    console.log('current_holes.value ' + current_holes.value + ' current_seeds.value ' + current_seeds.value)
}

let game_board = [];

function board(){

    var rangeValue = document.getElementById("test");

    for(let i=0; i<current_holes.value; i++){
        game_board[i] = current_seeds.value;
        console.log("Posição " + i + " : " + game_board[i]);
    }

    for(let i=0;i<=10;i++){
        rangeValue.innerHTML += '<div class="holes border">'+i+'</div>';
    }
}

let score_player_1;
let score_player_2;

let button_pressed_number;

function printboard(){
    console.log("---------------------------------------");

    for(i = 0; i<current_holes.value; i++){
        if(i == current_holes.value -1) console.log(game_board[i]);
        else console.log(game_board[i]);
    }

    console.log("---------------------------------------");
}

//O player 1 é o da parte de baixo do tabuleiro
function move_player_1(element){
    let pos = element.value;
    let seed_number = game_board[pos];
    game_board[pos] = 0;

    if(pos < 2) 
        for (i = parseInt(pos)+1; i <= parseInt(pos) + parseInt(seed_number); i++){
            console.log("corri " + i + " vezes");
            game_board[i]++;
        } 
}