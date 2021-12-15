class Game {
    constructor(size, seeds){
        let board_game = new CircularLinkedList();

        this.size = parseInt(size)+2;

        for(let i=0; i<this.size; i++){
            if(i != size/2 && i != (this.size-1))board_game.add_node_end(seeds);
            else board_game.add_node_end(0);
        }

        this.board = board_game;
        this.player = 1;
    }

    print_player(){
        if(this.player == 1) {
            console.log("PLAYER 1:");
            return "Player: 1";
        }
        else{
            console.log("PLAYER 2:");
            return "Player: 2";
        } 
    }

    print_game(){
        this.board.printList();
    }


    check_state(cur){
        if(cur.element == 1){
            let cur_pos = this.board.get_pos(cur);
            let adjacent_hole = this.board.go_to_pos(this.size - cur_pos - 2);
            let temp = adjacent_hole.element;
            adjacent_hole.element = 0;
            cur.element += temp;
        }
        
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