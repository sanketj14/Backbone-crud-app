var UserModel = Backbone.Model.extend({

  urlRoot: "https://sunilmore-rest-api.herokuapp.com/api/users",
  idAttribute: 'id'

});

var UserCollection = Backbone.Collection.extend({

  model: UserModel,
  url: "https://sunilmore-rest-api.herokuapp.com/api/users"

});

var UpdateUserModalView = Backbone.View.extend({
  el: '#mymodal',

  events: {
    'click .saveuser': 'saveUser'
  },

  initialize: function(){
    // this.model = new UserModel();
  },

  saveUser: function(){
    this.model.set({
      name: $('.firstName').val(),
      sex: $('.lastName').val()
    })
    this.model.save({},{
      success: function(){
        this.$el.modal('hide');
        userListView.render();
      }.bind(this)
    })
  },

  render: function(id){
    this.model = new UserModel({id: id});
    console.log('id',id);
    if(!id){
      console.log('adding user');
      var source = $('#addUser').html();
      var template = Handlebars.compile(source);
      this.$el.html(template({}));
      this.$el.modal('show');
      return false;
    }
    else {
      console.log('editing user');
      this.model.fetch({
        success: function(model){
          console.log('model fetching');
          var source = $('#addUser').html();
          var template = Handlebars.compile(source);
          this.$el.html(template(this.model.attributes));
          this.$el.modal('show');
          $('.firstName').val(this.model.attributes.name);
          $('.lastName').val(this.model.attributes.sex);
        }.bind(this)
      })
    }
  }
});

var UserListView = Backbone.View.extend({
  el : '#RepoEntries',


  events: {
    'click .add': 'add',
    'click .edit': 'edit',
    'click .delete': 'delete'
  },

  initialize: function(){
    this.modal = new UpdateUserModalView();
  },

  add: function(){
    // console.log('modal',modal);
    this.modal.render();
  },

  delete: function(e){
    var id = $(e.target).parent().parent().data('id');
    this.model = new UserModel({id: id});
    this.model.destroy({
      success: function(){
        alert('user deleted!');
        this.render();
      }.bind(this)

    })
    return false;
  },

  edit: function(e){
    var id = $(e.target).parent().parent().data('id');
    this.modal.render(id);
    return false;
  },

  render: function(){
    var users = new UserCollection();
    users.fetch({
      success: function(users){
        console.log('API consumed, voila!');
        var source = $('#RepoTableTemplate').html();
        var template = Handlebars.compile(source);
        this.$el.html(template(users.toJSON()));
      }.bind(this)
    })

  }

});



$(function(){

  console.log('in ready!');

  window.userListView = new UserListView();
  var router = new Router();

  router.on('route:home',function(){
    userListView.render();
  });

  Backbone.history.start();
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  }
});

