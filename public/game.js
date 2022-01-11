class Game {
    constructor(size, seeds){
        let board_game = new CircularLinkedList();

        this.size = parseInt(size)+2;

        for(let i=0; i<this.size; i++){
            if(i != size/2 && i != (this.size-1))board_game.add_node_end(seeds);
            else board_game.add_node_end(0);
        }

        let cur1 = board_game.go_to_pos(size/2);
        let cur2 = board_game.go_to_pos(parseInt(size) + parseInt(1));

        this.board = board_game;
        this.player = 1;
        this.store1 = cur1;
        this.store2 = cur2;
    }

    check_board_side(cur){ // returns which side of the board the given node is in
        if(this.board.get_pos(cur) >= 0 && this.board.get_pos(cur) <= (this.size-2)/2) return 1;
        else return 2;
    }

    check_state(cur){
        if(cur.element == 1 && cur != this.store1 && cur != this.store2){
            if(this.player == 1 && this.check_board_side(cur) == 1 || this.player == 2 && this.check_board_side(cur) == 2){
                let cur_pos = this.board.get_pos(cur);
                let adjacent_hole = this.board.go_to_pos(this.size - cur_pos - 2);
                let temp = adjacent_hole.element;
                adjacent_hole.element = 0;
                cur.element = 0;
                if(this.player == 1) this.store1.element = parseInt(this.store1.element) + parseInt(temp);
                else this.store2.element = parseInt(this.store2.element) + parseInt(temp);
            }
        } 
        
        if(cur != this.board.go_to_pos((this.size-2)/2) && cur != this.board.go_to_pos(this.size-1)){
            if(this.player == 1) this.player = 2;
            else this.player = 1;
        }
        console.log("Depois");
        this.print_game();
    }

    move_pieces(element){
        this.print_player();
        console.log("Antes");
        this.print_game();
        let pos = element; 
        let cur = this.board.go_to_pos(pos);
        let temp = cur.element;
        
        cur.element = 0;
        cur = cur.next;
        for(let i=0; i<temp; i++){
            if(cur == this.store1 && this.player == 2 || cur == this.store2 && this.player == 1){
                cur = cur.next;
            }
            cur.element++;
            if(i != temp-1)cur = cur.next; // Para puder verificar o estado do último nó aumentado
        }

        this.check_state(cur);
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
}