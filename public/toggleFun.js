function toggleRules(){
    const x = document.getElementById("rules"); 
    if(x.style.display == "none"){
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

function sleep(ms) {   return new Promise(resolve => setTimeout(resolve, ms)); }

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

let current_holes = {value:0};
let current_seeds = {value:0};
let ai_level = {value:1};


// This function updates values in slider
let slider_holes ; let output_holes ;
let slider_seeds ; let output_seeds ;
let slider_ai    ; let output_ai    ;

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

    // ai start function
    slider_ai = document.getElementById("slider_ai");
    output_ai = document.getElementById("output_ai");
    output_ai.innerHTML = slider_ai.value;

    ai_level.value = slider_ai.value;

    slider_ai.oninput = function() {
        output_ai.innerHTML = this.value;
    }
})

let game;

window.onload = function() {
    game = new Game(current_holes.value,current_seeds.value);
    game.opponent = 1; //Começa com multiplayer por default ?
    board(game);
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
    ai_level.value = slider_ai.value;
    console.log(ai_level.value);

    game = new Game(current_holes.value,current_seeds.value);
    if(document.getElementById('opponent_AI').checked) game.opponent = 2; 
    else if(document.getElementById('opponent_player').checked) game.opponent = 1;
    board(game); 
}
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//

function genBeads(type,index,game){

    if(type === "mt" || type === "mb"){
	    var square = document.getElementById(type);
        square.innerHTML += "<div class=test>hi</div>"

        var square2 = document.getElementsByClassName("test")
        //console.log(square2.innerHTML)

    } else{
        var square = document.getElementById(type+index);
    }

    var number = game.board.get_element_at_position(index);
    
    

    for (let int = 0; int < number; int++) {
        let x = generateRandomIntegerInRange(35,0);
        let y = generateRandomIntegerInRange(0,35);
        square.innerHTML += "<div class=bead style=top:"+x+"px;"+"left:"+y+"px"+"></div>"
    }
}


//

function updateHoverOnPlayer() {
    let holes = (game.size);

    if (game.player == 1){

        for(let i = 0; i < holes/2-1; i++){
            addClass("pb"+i,"P1_hover"); 
        }
        for(let i = holes/2; i < holes-1; i++){
            removeClass("pt"+i,"P2_hover");
        }
    }
    if (game.player == 2 && game.opponent == 1){ 
        for(let i = 0; i < holes/2-1; i++){
            removeClass("pb"+i,"P1_hover");
        }
        for(let i = holes/2; i < holes-1; i++){
            addClass("pt"+i,"P2_hover");
        }  
    }
    if (game.player == 2 && game.opponent == 2){
        for(let i = 0; i < holes/2-1; i++){
            removeClass("pb"+i,"P1_hover");
        }
    }
}

function addClass(input,name_class) {
    //console.log(input)
    let tmp =  document.getElementById(input).classList.add(name_class);
}
function removeClass(input,name_class) {
    //console.log(input)
    let tmp = document.getElementById(input).classList.remove(name_class);
}

// funcao para limpar todos of filhos de um elemento
function clearBox(elementID) {
    let div = document.getElementById(elementID);
      
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
// funcao para dar reset ao tabuleiro
function reset(){
    clearBox('topmid');
    clearBox('botmid');
    clearBox('startsection');
    clearBox('endsection');  
    clearBox('playerTurnDisplay');
}

// funcao para gerar os buracos, type = "pb" e do P1, type = "pt" e do P2
function genDiv(type,index,game){
    if(type == 'pb'){
        return '<div class="pot border" id="'+type+index+'" style="width:'+(100/(game.size/2))+'%'+'" onClick="updateCanvas'+game.opponent+'('+index+')">'
            +'<div class="seedCountPB">'
                +game.board.get_element_at_position(index)
            +'</div>' 
        +'</div>';
    }else{
        return '<div class="pot border" id="'+type+index+'" style="width:'+(100/(game.size/2))+'%'+'" onClick="updateCanvas'+game.opponent+'('+index+')">'
            +'<div class="seedCountPT">'
                +game.board.get_element_at_position(index)
            +'</div>' 
        +'</div>';
    }
}
// funcao para gerar os buracos do score aka. lados, type = "mt" e do P1, type = "mb" e do P2
function genDivScore(type,index,game){
    if(type == 'mt'){
        return '<div class="pot border" id="'+type+'">'
            +'<div class="seedCountPB">'
                + "Score: " + game.board.get_element_at_position(index)
            +'</div>' 
        +'</div>';
    }else{
        return '<div class="pot border" id="'+type+'">'
            +'<div class="seedCountPT">'
                + "Score: " + game.board.get_element_at_position(index)
            +'</div>' 
        +'</div>';
    }
}

function board(game){
    if(game.player == 2 || game.player == 1) console.log("AI UPDATE");

    let rangeValue_topmid = document.getElementById("topmid");
    let rangeValue_botmid = document.getElementById("botmid");
    let rangeValue_leftmid = document.getElementById("startsection");
    let rangeValue_rightmid = document.getElementById("endsection");

    let holes = (game.size);
    let i=0;

    // adicionar que jogador é a vez
    document.getElementById('playerTurnDisplay').innerHTML += '<div>'+game.print_player()+'</div>';

    // preencher a parte de baixo = P1
    for(;i < holes/2-1;i++){
        rangeValue_botmid.innerHTML += genDiv("pb",i,game);
        genBeads("pb",i,game);
    }

    // preencher score do player 1, porque esta a direita
    rangeValue_rightmid.innerHTML += genDivScore("mt",i,game);
    genBeads("mt",i,game);

    i++; //incrementar
    
    temp = i;
    i = holes-1;

    // preencher score do player 2, porque esta a esquerda
    rangeValue_leftmid.innerHTML += genDivScore("mb",i,game);
    genBeads("mb",i,game);
    
    i--; //decrementar 

    // preencher a parte de cima = P2
    for(;i >= temp;i--){
        rangeValue_topmid.innerHTML += genDiv("pt",i,game);
        genBeads("pt",i,game);
    }

    updateHoverOnPlayer();
}

function updateCanvas1(index){
    let cur = game.board.go_to_pos(index);
    if(game.player == 1 && game.check_board_side(cur) == 1 || game.player == 2 && game.check_board_side(cur) == 2){
        if(cur.element != 0){
            game.move_pieces(index);
            reset();
            board(game);
            updateHoverOnPlayer();
            clearBox('playerTurnDisplay');
            document.getElementById('playerTurnDisplay').innerHTML += '<div>'+game.print_player()+'</div>';
        }

        game_over();
    }
}

function game_over(){
    if(game.status == 2){ //Quando o jogo terminar
        console.log("ALERT!");           
        setTimeout(() => {alert('The game has ended!')}, 100);
    }
}

//JOGO CONTRA COMPUTADOR

function updateCanvas2(index){
    let cur = game.board.go_to_pos(index);
    if(cur.element != 0){
        game.move_pieces(index);
        reset();
        board(game);
        updateHoverOnPlayer();
        clearBox('playerTurnDisplay');
        document.getElementById('playerTurnDisplay').innerHTML += '<div>'+game.print_player()+'</div>';
       
        game_over();

        if(game.player == 2 && game.status != 2){
            ai_move();
            game_over();
        } 
    }
}

async function ai_move(){
    await sleep(100);

    if(ai_level.value == 1) game.move_pieces(ai_1_selection()); // Mover as peças do jogo no backend
    else if(ai_level.value == 2) game.move_pieces(ai_2_selection());
    reset(); //Apaga os containers
    board(game);

    updateHoverOnPlayer();
    clearBox('playerTurnDisplay');
    document.getElementById('playerTurnDisplay').innerHTML += '<div>'+game.print_player()+'</div>';

    if(game.player == 2){
        await ai_move();
    }
}

function ai_1_selection(){
    let x = game.ai_level_1();
    let cur = game.board.go_to_pos(x);
    
    while(cur.element == 0){  //Se a posição selecionada pela AI for 0
        x = game.ai_level_1();
        cur = game.board.go_to_pos(x);
    }

    return x;
}

function ai_2_selection(){
    let x = game.ai_level_2();
    console.log(x);
    let cur = game.board.go_to_pos(x);
    
    while(cur.element == 0){  //Se a posição selecionada pela AI for 0
        console.log("Am i stuck here ? ");
        x = game.ai_level_2();
        cur = game.board.go_to_pos(x);
    }

    return x;
}