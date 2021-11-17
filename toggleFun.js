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
document.addEventListener("DOMContentLoaded", function( ) {
    var slider = document.getElementById("volume");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
})
// isto e um teste, ignorar
function toggletest(){

    var rangeValue = document.getElementById("test");

    for(let i=0;i<=10;i++){
    rangeValue.innerHTML += '<div>'+i+'</div>';
    }
}