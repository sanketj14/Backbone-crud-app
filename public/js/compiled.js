var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'repos/:id': 'viewrepo'
    }
});

var UserModel = Backbone.Model.extend({

  urlRoot: "https://sunilmore-rest-api.herokuapp.com/api/users",
  idAttribute: 'id'

});

var UserCollection = Backbone.Collection.extend({

  model: UserModel,
  url: "https://sunilmore-rest-api.herokuapp.com/api/users"

});

var UpdateUserModal = Backbone.View.extend({
  el: '#mymodal',

  events: {
    'click .saveuser': 'saveuser'
  },

  initialize: function(){
    // this.model = new UserModel();
  },

  saveuser: function(){
    this.model.set({
      name: $('.username').val(),
      sex: $('.usergender').val()
    })
    this.model.save({},{
      success: function(){
        this.$el.modal('hide');
        userlist.render();
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
          $('.username').val(this.model.attributes.name);
          $('.usergender').val(this.model.attributes.sex)
        }.bind(this)
      })
    }
  }
});

var UserList = Backbone.View.extend({
  el : '#RepoEntries',


  events: {
    'click .add': 'add',
    'click .edit': 'edit',
    'click .delete': 'delete'
  },

  initialize: function(){
    this.modal = new UpdateUserModal();
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
    var repo = new UserCollection();
    repo.fetch({
      success: function(repo){
        console.log('API consumed, voila!');
        var source = $('#RepoTableTemplate').html();
        var template = Handlebars.compile(source);
        this.$el.html(template(repo.toJSON()));
      }.bind(this)
    })

  }

});

var userlist = new UserList();
var router = new Router();

router.on('route:home',function(){
  userlist.render();
});
router.on('route:viewrepo',function(id){
  console.log('coming to router atleast')
  userRepos.render(id);
});
Backbone.history.start();
