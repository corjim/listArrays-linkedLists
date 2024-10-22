## Linked List Implementation - README
Introduction
This project provides a basic implementation of Linked Lists in JavaScript. A Linked List is a linear data structure where each element (node) contains two components: the data itself and a reference (or pointer) to the next element in the list. This project includes both Singly Linked Lists and Doubly Linked Lists, along with common operations that can be performed on them.

Data Structures Implemented
Singly Linked List: A linked list where each node points to the next node in the sequence.
Doubly Linked List: A linked list where each node points to both the next and the previous node. 

# Doubly Linked List Methods
append(value): Adds a new node at the end of the list.
prepend(value): Adds a new node at the start of the list.
find(value): Finds the first node containing the specified value.
delete(value): Deletes the first node containing the specified value.
insertAt(index, value): Inserts a node with the given value at the specified index.
reverse(): Reverses the doubly linked list in place for optimized traversal.

# Circular Linked List (Advanced)
A Circular Linked List is a variant where the last node points back to the first node, creating a circle. Methods for circular linked lists are optimized for wrap-around operations.
