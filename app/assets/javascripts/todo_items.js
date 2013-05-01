function createListDOMElement(todoItem) {
  var listElement = $('<li />');
  $('<input />').attr('type', 'checkbox').attr('class', 'done').appendTo(listElement);
  listElement.append(todoItem.name);
  $('<i />').attr('class', 'icon-remove-sign delete').appendTo(listElement);
  $('#todo').append(listElement);
  listElement.attr('task_id', todoItem.id);
  listElement.hide().fadeIn();
  $('#new-text').val('');
  if (todoItem.completed) {
    completeDOMElement(listElement);
  }
}

function addListItem() {
  $.ajax({
    url: "/todo_items",
    method: "post",
    data: {"todo_item": {"name": $('#new-text').val()}},
    dataType: "json",
    success: createListDOMElement,
    error: function() {
      alert("Couldn't add a todo because the server was down.");
    }
  });
}

function completeDOMElement(listElement) {
  if(listElement.attr('class') === 'completed'){
    listElement.removeClass('completed');
    $('#todo').append(listElement);
  } else {
    listElement.addClass('completed');
    $('#completed').append(listElement);
  }
  listElement.hide().fadeIn();
}

function completeListItem(todoItemDOMElement) {
  $.ajax({
    url: "/todo_items/complete",
    method: "post",
    data: {"id": todoItemDOMElement.attr('task_id')},
    dataType: "json",
    success: function(todoItem) {
      completeDOMElement(todoItemDOMElement);
    },
    error: function() {
      alert("failed to complete item.");
    }
  });
}

function deleteItem(listElement) {
  listElement.slideUp(400, function() {listElement.remove()});
}

function deleteListItem(todoItemDOMElement) {
  $.ajax({
    url: "/todo_items/destroy",
    method: "post",
    data: {"id": todoItemDOMElement.attr('task_id')},
    dataType: "json",
    success: function(todoItem){
      deleteItem(todoItemDOMElement);
     },
    error: function() {
      alert("failed to delete item.");
    }
  });
}

$(document).ready(function(){
  $('#add').on('click', addListItem);
  $(document).on('click', '.delete', function () {
    deleteListItem($(this).parent()); // this is the checkbox
    // we want to pass the listElement which has the id on it
    // so we use .parent.
  });
  $(document).on('click', '.done', function () {
    completeListItem($(this).parent()); // this is the checkbox
    // we want to pass the listElement which has the id on it
    // so we use .parent.
  });
  $.ajax({
    url: "/todo_items",
    method: "get",
    dataType: "json",
    success: function(todoItems) {
      for (var i=0; i<todoItems.length; i+=1) {
        createListDOMElement(todoItems[i]);
      }
    }
  });
});
