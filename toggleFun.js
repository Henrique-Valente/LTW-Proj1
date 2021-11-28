function Seed(id) {
    this.id = id
}

function Holes(capacity) {
    this.capacity = capacity
}

function Board(holes_capacity) {
    this.holes_capacity = holes_capacity
}

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
    fill_holes();

}

function debbug(){
    console.log('current_holes.value ' + current_holes.value + ' current_seeds.value ' + current_seeds.value)
}

function board(){

    var rangeValue = document.getElementById("test");

    for(let i=0;i<=10;i++){
        rangeValue.innerHTML += '<div class="holes border">'+i+'</div>';
    }
}
 // var rangeValue = document.getElementById("test");
    // rangeValue.innerHTML = '<div>'+i+'</div>' +'<div>' + slider_holes.value + '</div>';
// console.log(slider_holes.getAttribute('default'));

    // for(let i=0;i<=10;i++){
        // rangeValue.innerHTML += '<div>'+i+'</div>';
    // }

let player_1 = [];
let player_2 = [];
let score_player_1;
let score_player_2;
    
function fill_holes(){
    let index ;
        
    for (index = 0; index < current_holes.value; index++) {
        player_1.push(current_seeds.value);
        player_2.push(current_seeds.value);
    } 
}

let button_pressed_number;

function move_press(){
    
}

//O player 1 é o da parte de baixo do tabuleiro
function move_player_1(){
    
}