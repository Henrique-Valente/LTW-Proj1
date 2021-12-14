class Node {   //Nó da Lista
    constructor(element){
        this.element = element;
        this.next = null;
    }

    to_String(){
        console.log("Valor: " + this.element + " Próximo: " + this.next.element);
    }
}

class CircularLinkedList {
    constructor(){ 
        this.head = null;
        this.size = 0;
    }

    list_size(){    //retorna o tamanho da lista
        return this.size;
    }

    get_last(){     //retorna o ultimo elemento da lista

        if(this.size == 0){
            return null;
        }

        else if(this.size == 1){
            return this.head;
        }
        
        else{
            let current = this.head;
            while(current.next != this.head){
                current = current.next;
            }
            return current;
        }   
    }

    add_node_end(element){    //adiciona um nó ao final da lista
        let node = new Node(element);

        if(this.head == null){
            this.head = node;
            node.next = node;
        }

        else{
            let temp = this.get_last();
            temp.next = node;
            node.next = this.head;
        }

        this.size++;
    }
    
    printList() {   //imprime a lista 
        let cur = this.head;
        let str = "";
        str += cur.element + " ";
        cur = cur.next;

        while (cur != this.head) {
            str += cur.element + " ";
            cur = cur.next;
        }

        console.log(str);
    }

    get_element_at_position(pos){  //retorna o elemento da posição pos
        let cur = this.head; 

        if(pos >= this.size){
            return null;
        } 
        else{
            for(let i=0; i<this.size;i++){
                if(i == pos) return cur.element;
                else cur = cur.next;
            }
        }
    }

    go_to_pos(pos){
        let cur = this.head;

        if(pos >= this.size) return null;
        else{
            for(let i=0; i<pos; i++){
                cur = cur.next;
            }
        }

        return cur;
    }
}