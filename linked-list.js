/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;


  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {

    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length += 1;

  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);

  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;

  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;

  }

  // FURTHER STUDY

  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;

    while (current !== null) {
      next = current.next;  // Store the next node
      current.next = prev;  // Reverse the current node's pointer
      prev = current;       // Move the 'prev' pointer to current node
      current = next;       // Move to the next node
    }

    this.head = prev;  // Update the head to the new first node
  }

  // Function to pivot the list around a value

  pivotAround(value) {
    let smallerHead = null, smallerTail = null;
    let greaterHead = null, greaterTail = null;

    let current = this.head;

    while (current !== null) {
      let nextNode = current.next;
      current.next = null; // Disconnect the current node from the rest

      if (current.val < value) {
        if (smallerHead === null) {
          smallerHead = smallerTail = current;
        } else {
          smallerTail.next = current;
          smallerTail = current;
        }
      } else {
        if (greaterHead === null) {
          greaterHead = greaterTail = current;
        } else {
          greaterTail.next = current;
          greaterTail = current;
        }
      }

      current = nextNode;
    }

    // If there are no smaller elements, return the greater list
    if (smallerHead === null) {
      this.head = greaterHead;
    } else {
      // Connect the two lists
      smallerTail.next = greaterHead;
      this.head = smallerHead;
    }
  }

}


// Function to merge two sorted linked lists


function mergeSortedLists(a, b) {
  let dummyNode = new Node(0); // Temporary node to start the new list
  let tail = dummyNode;  // Pointer to the last node of the new list

  let aCur = a.head;
  let bCur = b.head;

  // Traverse both lists and add the smaller node to the new list
  while (aCur !== null && bCur !== null) {
    if (aCur.val <= bCur.val) {
      tail.next = aCur;
      aCur = aCur.next;
    } else {
      tail.next = bCur;
      bCur = bCur.next;
    }
    tail = tail.next;
  }

  // If there are remaining nodes in either list, append them to the new list
  if (aCur !== null) {
    tail.next = aCur;
  } else if (bCur !== null) {
    tail.next = bCur;
  }

  return dummyNode.next;  // The new list starts from dummyNode.next

}

// Circular Arrays

class CircularArray {
  constructor(capacity) {
    this.arr = new Array(capacity);
    this.capacity = capacity;
    this.size = 0;
    this.start = 0;
  }

  // Add an element to the circular array
  add(element) {
    if (this.size === this.capacity) {
      throw new Error("Array is full");
    }
    let end = (this.start + this.size) % this.capacity;
    this.arr[end] = element;
    this.size++;
  }

  // Get an element at a given index (logical index)
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }
    let actualIndex = (this.start + index) % this.capacity;
    return this.arr[actualIndex];
  }

  // Remove the first element
  remove() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }
    this.start = (this.start + 1) % this.capacity;
    this.size--;
  }

  // Print the current state of the array
  print() {
    let result = [];
    for (let i = 0; i < this.size; i++) {
      result.push(this.get(i));
    }
    console.log(result.join(", "));
  }
}

module.exports = LinkedList;
module.exports = CircularArray;

