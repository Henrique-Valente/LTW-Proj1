class Game {
    constructor(size, seeds){
        let board_game = new CircularLinkedList();
        for(let i=0; i<size+2; i++){
            board_game.add_node_end(seeds);
        }

        this.board = board_game;
        this.size = size+2;
    }

    print_state(){
        this.board.printList();
    }

    move_pieces(element){
        let pos = element; //Terá de ser element.value quando implementarmos os botões
        let cur = this.board.go_to_pos(pos);
        let temp = cur.element;
        
        cur.element = 0;
        cur = cur.next;
        for(let i=0; i<temp; i++){
            cur.element++;
            cur = cur.next;
        }
    }
}
