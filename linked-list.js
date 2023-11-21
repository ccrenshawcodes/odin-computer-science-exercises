class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
    }

    append(value) {
        let current = this.head;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = new Node(value);
    }

    prepend(value) {
        this.head = new Node(value, this.head);
    }

    size() {
        let current = this.head;
        let counter = 0;
        while (current !== null) {
            counter ++;
            current = current.nextNode;
        }
        return counter;
    }

    listHead() {
        return this.head;
    }

    tail() {
        let current = this.head;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        return current;
    }

    at(index) {
        let counter = 0;
        let current = this.head;
        while (counter < index) {
            current = current.nextNode;
            counter++;
        }
        return current;
    }

    pop() {
        let prev = this.head;
        let current = prev.nextNode;
        while (current.nextNode !== null) {
            prev = current;
            current = current.nextNode;
        }
        prev.nextNode = null;
    }

    contains(value) {
        let current = this.head;
        let result;
        while (current !== null) {
            if (current.value === value) {
                return result = true;
            } else {
                current = current.nextNode;
            }
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let counter = 0;
        while (current !== null) {
            if (current.value === value) {
                return counter;
            } else {
                counter++;
                current = current.nextNode;
            }
        }
        return null;
    }

    toString() {
        let result = '';
        let current = this.head;
        while (current !== null) {
            result += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        result += ` null `;
        return result;
    }
}

let firstNode = new Node('a');
let secondNode = new Node('d');
let thirdNode = new Node('g');
firstNode.nextNode = secondNode;
secondNode.nextNode = thirdNode;

let list = new LinkedList(firstNode);
console.log(list);
