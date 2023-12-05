class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(this.sortAndDedupe(arr));
    }

    sortAndDedupe (arr) {
        const sorted = arr.sort((a, b) => a - b);
        for (let i = 0; i < sorted.length; i++) {
            while (sorted[i] === sorted[i + 1]) {
                sorted.splice(i, 1);
            }
        }
        return sorted;
    }

    buildTree(arr, start = 0, end = arr.length - 1) {

        if (start > end) {
            return null;
        } else {
            const mid = Math.floor((start + end) / 2);
            const node = new Node(arr[mid]);
    
            node.left = this.buildTree(arr, start, mid - 1);
            node.right = this.buildTree(arr, mid + 1, end);
            
            return node;
        }
    }

    find(val, root = this.root) {
        if (root === null) {
            console.log('that value was not found in the tree.');
            return;
        }
        if (val === root.data) {
            return root;
        } else if (val < root.data) {
            return this.find(val, root.left);
        } else if (val > root.data) {
            return this.find (val, root.right);
        }
    }

    insert (value, root = this.root) {
        if (root === null) {
            root = new Node(value);
            return root;
        } else if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert (value, root.right);
        }
        return root;
    }

    deleteNode(value, root = this.root) {
        if (root === null) {
            console.log('that value was not found in the tree.');
            return;
        }
        if (root.data === null) {
            return root;
        }
        
        if (root.data > value) {
            root.left = this.deleteNode(value, root.left);
            return root;
        } else if (root.data < value) {
            root.right = this.deleteNode(value, root.right);
            return root;
        }
        
        if (root.left === null) {
            let temp = root.right;
            root = null;
            return temp;
        } else if (root.right === null) {
            let temp = root.left;
            root = null; 
            return temp;
        } else {
            let parent = root;
            let child = root.right;

            while (child.left !== null) {
                parent = child;
                child = child.left;
            }

            if (parent !== root) {
                parent.left = child.right;
            } else {
                parent.right = child.right;
            }

            root.data = child.data;

            child = null;
            return root;
        }
    }

    levelOrder (callback, queue = [this.root], printed = []) {
        while (queue.length > 0) {
            const first = queue.shift();
            if (first.left) {
                queue.push(first.left);
            }
            if (first.right) {
                queue.push(first.right);
            }

            callback ? callback(first.data) : printed.push(first.data);
        }
        return printed;
    }

    inOrder (root = this.root, result = [], callback) {
        if (root === null) {
            return;
        } else {
            this.inOrder(root.left, result, callback);
            callback ? callback(root) : result.push(root.data);
            this.inOrder(root.right, result, callback);
            
            if (result.length > 0) return result;
        }
    }

    preOrder (root = this.root, result = [], callback) {
        if (root === null) {
            return;
        } else {
            callback ? callback(root) : result.push(root.data);
            this.preOrder(root.left, result, callback);
            this.preOrder(root.right, result, callback);

            if (result.length > 0) return result;
        }
    }

    postOrder (root = this.root, result = [], callback) {
        if (root === null) {
            return;
        } else {
            this.postOrder(root.left, result, callback);
            this.postOrder(root.right, result, callback);
            callback ? callback(root) : result.push(root.data);

            if (result.length > 0) return result;
        }
    }

    height (root = this.root) {
        if (root === null) {
            return;
        } else if (root.left === null && root.right === null) {
            return 0;
        } else {
            let leftHeight;
            let rightHeight;

            if (root.left) leftHeight = this.height(root.left);
            if (root.right) rightHeight = this.height(root.right);

            if (leftHeight >= rightHeight) {
                return leftHeight + 1;
            } else {
                return rightHeight + 1;
            }
        }
    }

    depth (val, root = this.root, total = 0) {
        if (val === root) {
            return total;
        } else {
            if (val.data < root.data) {
                total = this.depth(val, root.left, total) + 1;
            } else if (val.data > root.data) {
                total = this.depth(val, root.right, total) + 1;
            }
        }
        return total;
    }

    isBalanced (root = this.root) {
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
        const difference = leftHeight - rightHeight;
        if (difference > 1 || difference < -1) {
            return false;
        } else {
            return true;
        }
    }

    rebalance () {
        const newArray = this.inOrder();
        this.root = this.buildTree(newArray);
    }

    //  not mine :) 
    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

function driver () {
    const myArr = [4, 7, 2, 13, 27, 11, 58];
    const myTree = new Tree(myArr);
    myTree.prettyPrint();

    console.log(myTree.isBalanced());

    console.log(myTree.preOrder());
    console.log(myTree.inOrder());
    console.log(myTree.postOrder());

    myTree.insert(400);
    myTree.insert(230);
    myTree.insert(500);

    console.log(myTree.isBalanced());
    myTree.rebalance();
    console.log(myTree.isBalanced());

    myTree.prettyPrint();
    console.log(myTree.preOrder());
    console.log(myTree.inOrder());
    console.log(myTree.postOrder());
}
driver();
