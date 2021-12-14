class Game {
    constructor(size, seeds){
        let board_game = new CircularLinkedList();
        for(let i=0; i<size+2; i++){
            if(i != size/2 && i != size+1)board_game.add_node_end(seeds);
            else board_game.add_node_end(0);
        }

        this.board = board_game;
        this.size = size+2;
        this.player = 1;
    }

    print_player(){
        if(this.player == 1) console.log("PLAYER 1:");
        else console.log("PLAYER 2:");
    }

    print_game(){
        this.board.printList();
    }


    check_state(cur){
        if(cur != this.board.go_to_pos((this.size-2)/2) && cur != this.board.go_to_pos(this.size-1)){
            this.player = 2;
        }
        this.print_game();
    }

    move_pieces(element){
        this.print_player();
        this.print_game();
        let pos = element; //Terá de ser element.value quando implementarmos os botões
        let cur = this.board.go_to_pos(pos);
        let temp = cur.element;
        
        cur.element = 0;
        cur = cur.next;
        for(let i=0; i<temp; i++){
            cur.element++;
            if(i != temp-1)cur = cur.next;
        }

        this.check_state(cur);
    }
}

let test = new Game(12,4);

test.print_game();
test.move_pieces(2);
test.move_pieces(3);
test.move_pieces(6);
