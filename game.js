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
        this.opponent = 0; // 0 -> Por definir, 1 -> Contra jogador online, 2 -> Contra AI, 3 -> Contra jogador localmente
        this.status = 1; // 1 -> Jogo por terminar , 2 -> Jogo terminou
    }

    check_board_side(cur){ // returns which side of the board the given node is in
        if(this.board.get_pos(cur) >= 0 && this.board.get_pos(cur) <= (this.size-2)/2) return 1;
        else return 2;
    }

    move_pieces(element){
        this.print_player();
        //console.log("Antes");
        //this.print_game();
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
        
        if(this.check_end() == 1) return;
        else this.status = 2;
    }

    check_end(){
        let cur = this.board.head;
        let i=0;
        let j=this.size/2+1;
        let check_player_1 = 0; // 1 -> Ainda não terminou , 2 -> Já terminou
        let check_player_2 = 0; // 1 -> Ainda não terminou , 2 -> Já terminou
        for(i; i<(this.size-2)/2;i++){
            if(cur.element != 0){
                check_player_1 = 1;
                break;
            }
            cur = cur.next;
        }
        cur = this.board.go_to_pos(j);
        for(j; j<this.size-1;j++){
            if(cur.element != 0){
                check_player_2 = 1;
                break;
            }
            cur = cur.next;
        }
        if(check_player_1 == 1 && check_player_2 == 1) return 1; //O jogo ainda não terminou
        else return 0; //O jogo terminou
    }

    print_player(){
        if(this.player == 1) {
            //console.log("PLAYER 1:");
            return "Player: 1";
        }
        else{
            //console.log("PLAYER 2:");
            return "Player: 2";
        } 
    }

    print_game(){
        this.board.printList();
    }

    ai_level_1(){
        return Math.floor(Math.random() * 6) + 7;
    }

    ai_level_2(){
        let cur = this.board.go_to_pos(this.size/2 + 1);
        let max = cur.element;
        let output = cur;
        for(let i=this.size/2 + 1; i<this.size-1; i++){
            if(cur.element == max){ //Este if é para fazer com que não seja sempre o primeiro máx. nos casos
                                    //em que há vários máximos
                let rand = Math.floor(Math.random() * 2);
                if(rand == 1) output = cur;
            }

            if(cur.element > max){
                max = cur.element;
                output = cur;
            } 
            cur = cur.next;
        }

        return this.board.get_pos(output);
    }

    //**********************Funções para comunicar com o servidor**********************
    array_to_list(array, pos_i){
        let cur = this.board.go_to_pos(pos_i);
        for(let i=0; i<(this.size-2)/2;i++){
            cur.element = array[i];
            cur = cur.next;
        }
    }

    fill_my_side(array, store){
        this.array_to_list(array,0);
        this.store1.element = store;
    }

    fill_enemy_side(array, store){
        this.array_to_list(array,(this.size)/2);
        this.store2.element = store;
    }
}       