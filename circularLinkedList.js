class Node {   //Nó da Lista
    constructor(element){
        this.element = element;
        this.next = null;
    }
}
class CircularLinkedList {
    constructor(){ 
        this.head = null;
        this.size = 0;
    }

    list_size(){
        return this.size;
    }

    get_last(){

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

    add_node_end(element){
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
    
    printList() {
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

    get_position(element){
        let cur = this.head; 
        let pos = 0;

        if(cur.element == element){
            return pos;
        } 

        else{
            cur = cur.next;
            pos++;

            while(cur.element != element){
                if(cur == this.head) return null;
                cur = cur.next;
                pos++;
            }
    
            return pos;
        }
    }
}



