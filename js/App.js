

$(function(){

  console.log('in ready!');

  window.userListView = new UserListView();
  var router = new Router();

  router.on('route:home',function(){
    userListView.render();
  });

  Backbone.history.start();
});
