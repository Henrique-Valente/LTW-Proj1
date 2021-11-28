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

window.onload = function() {
    board();
  };

function toggleCancel(){

    slider_holes.value = current_holes.value;
    output_holes.innerHTML = current_holes.value;

    slider_seeds.value = current_seeds.value;
    output_seeds.innerHTML = current_seeds.value;
    
}

function toggleApply(){
    reset();

    current_holes.value = slider_holes.value;
    current_seeds.value = slider_seeds.value;

    board();
    
}

function debbug(){
    console.log('current_holes.value ' + current_holes.value + ' current_seeds.value ' + current_seeds.value)
}

function reset(){

    for(let i=0;i < current_holes.value / 2;i++){
        let rangeValue_reset = document.getElementById("pt"+i);
        rangeValue_reset.remove();
    }

    for(let i=0;i < current_holes.value / 2;i++){
        let rangeValue_reset = document.getElementById("pb"+i);
        rangeValue_reset.remove();
    }
    
}

function board(){

    let rangeValue_topmid = document.getElementById("topmid");
    let rangeValue_botmid = document.getElementById("botmid");

    for(let i=0;i < current_holes.value / 2;i++){
        rangeValue_topmid.innerHTML += '<div class="pot border" id="pt'+i+'">'+i+'</div>';
    }
    for(let i=0;i < current_holes.value / 2;i++){
        rangeValue_botmid.innerHTML += '<div class="pot border" id="pb'+i+'">'+i+'</div>';
    }
}
 // var rangeValue = document.getElementById("test");
    // rangeValue.innerHTML = '<div>'+i+'</div>' +'<div>' + slider_holes.value + '</div>';
// console.log(slider_holes.getAttribute('default'));

    // for(let i=0;i<=10;i++){
        // rangeValue.innerHTML += '<div>'+i+'</div>';
    // }