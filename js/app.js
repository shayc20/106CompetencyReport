var serverURL = "http://restclass.azurewebsites.net/API2/";
var todos = [];

function addToDo() {
  console.log("adding new task");
  //get the value from input
  var text = $('#txt-task').val();
  var todo = {
    text: text,
    user: 'shay',
    status: 0 //new
  };
  if (text != "") {
    console.log(todo.text);
    $('#txt-task').val('');
    displayTodo(todo);
    $.ajax({
      url: serverURL + "Todos",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(todo),
      success: function (response) {
        console.log("It worked!", response);
        // show notification
        $("#alert-box").removeClass("hidden");
        // hide notification
        setTimeout(function () {
          $("#alert-box").addClass("hidden");
        }, 3000);

      },
      error: function (errorDetails) {
        console.log("Something went wrong.. ", errorDetails);

      }
    });
  } else {
    console.log('user input is empty');
  }
  //set focus to input

  $('#txt-task').focus();



}

function displayTodo(todo) {
  if (todo.status == 0) {
    var li = `<li id="${todo.id}">${todo.text} <button onclick="markDone(${todo.id})">Done</button></li>`;
    $('#pending-list').append(li);
  } else {
    var li2 = `<li> ${todo.text}</li>`;
    $("#donetodos").append(li2);
  }

}

function markDone(id) {
    console.log("item Done", id);
    $("#"+id).remove();

    for(var i=0;i<todos.length;i++){
      if(todos[i].id==id){
        todos[i].status=1;
        displayTodo(todos[i]);
      }
    }
    
}

function loadData() {

  $.ajax({
    url: serverURL + "Todos",
    type: "GET",
    success: function (res) {
      console.log("it worked" + res);

      for (var i = 0; i < res.length; i++) {
        if (res[i].user == "shay") {
          todos.push(res[i]);
          displayTodo(res[i]);
        }
      }

    },
    error: function (errorDetails) {
      console.error("error getting data", error);

    }
  })
}

function init() {
  console.log("init the to do app");
  //sensing the user actions
  $('#btn-add').click(addToDo)
  $('#txt-task').keypress(function (e) {
    if (e.key === "Enter") {
      addToDo();
    }
  });

  loadData();
}
//when the browser finishes rendering HTML, execute init.

window.onload = init