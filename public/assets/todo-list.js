$(document).on('ready', function(){

  $('form').on('submit', function(){
      event.preventDefault();
      var item = $('form input'); //this grabs the item in the field
      var todo = {item: item.val()}; //this adds this as an item in the todo variable

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
