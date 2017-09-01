var itemno = 0; // global variable couting the items


function addItem() {
    // prepare individual item and add it to the list
    itemno++;
    var itemToAdd = document.getElementById('name').value; // input text value
    if (!validateItem(itemToAdd)) {
        return;
    };
    var list = document.getElementById('list'); // refrence to list element under which we will create the list
    var list_item = prepareListItem(itemno, itemToAdd); // prepare the list item

    list.appendChild(list_item); // adding the list item in list
    document.getElementById('name').value = ''; // clearing the text value after every entry

}

function validateItem(itemToAdd) {
    // valdiate to check if item is empty
    if (itemToAdd === '') {
        return false;
    } else {
        return true;
    }
}

function prepareListItem(itemno, itemToAdd) {
    // prepare the item and register the events to it
    var cb_node = createCheckBoxNode(itemno);
    var li_node = createLiNode(itemToAdd, itemno);
    var btn_node = createButtonNode(itemno);
    var div_node = createDivNode(cb_node, li_node, btn_node, itemno);

    btn_node.addEventListener("click", function (event) {
        var node = document.getElementById('div' + event.target.id.substring(3));
        list.removeChild(node);
    }); // adding click handler to button to delete the item


    cb_node.addEventListener("click", function (event) {
        var node = document.getElementById('li' + event.target.id.substring(2));

        if (document.getElementById(event.target.id).checked) {
            node.style.textDecoration = 'line-through';
        } else {
            node.style.textDecoration = '';
        }

    }); // adding click handler to checkbox to show it completed

    return div_node;
}


function createLiNode(itemToAdd, itemno) {
    // li and it's content
    var li_node = document.createElement('li');
    var text_node_for_li = document.createTextNode(itemToAdd);
    li_node.appendChild(text_node_for_li);
    li_node.id = 'li' + itemno;
    return li_node;
}


function createButtonNode(itemno) {
    // button and it's value
    var btn_node = document.createElement('BUTTON');
    btn_node.id = 'btn' + itemno;
    var text_node_for_btn = document.createTextNode('x');
    btn_node.appendChild(text_node_for_btn);
    return btn_node;
}

function createDivNode(cb_node, li_node, btn_node, itemno) {
    // creating div item to encapsulate all other nodes
    var div_node = document.createElement('div');
    div_node.appendChild(cb_node);
    div_node.appendChild(li_node);
    div_node.appendChild(btn_node);
    div_node.id = 'div' + itemno;
    return div_node;
}


function createCheckBoxNode(itemno) {
    // create checkbox 
    var cb_node = document.createElement('input');
    cb_node.type = 'checkbox';
    cb_node.id = 'cb' + itemno;
    return cb_node;
}

function resetItems() {
    // reset the list 
    var myNode = document.getElementById("list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}


function handle(e) {
    // hadling the enter event on addItem textbox
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that rusn
        addItem();
    }
}