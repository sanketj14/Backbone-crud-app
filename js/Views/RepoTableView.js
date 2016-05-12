var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'repos/:id': 'viewrepo'
    }
});

var RepoListModel = Backbone.Model.extend({
  urlRoot: "https://sunilmore-rest-api.herokuapp.com/api/users",
  idAttribute: 'id'
});

var UserRepoListModel = Backbone.Model.extend({

});

var UserRepoList = Backbone.Collection.extend({
    model: UserRepoListModel,

    initialize: function(model, options){
      console.log('collection fetching');
      this.url = 'https://sunilmore-rest-api.herokuapp.com/api/users/'+ options.id;
    },

    url: this.url
});

var RepoCollection = Backbone.Collection.extend({
  model: RepoListModel,

  url: "https://sunilmore-rest-api.herokuapp.com/api/users"
})

var userModal = Backbone.View.extend({
  el: '#mymodal',

  events: {
    'click .saveuser': 'saveuser'
  },

  initialize: function(){
    // this.model = new RepoListModel();
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
    this.model = new RepoListModel({id: id});
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

var RepoEntries = Backbone.View.extend({
  el : '#RepoEntries',


  events: {
    'click .viewrepo': 'viewRepo',
    'click .add': 'add',
    'click .edit': 'edit',
    'click .delete': 'delete'
  },

  initialize: function(){
    this.modal = new userModal();
  },

  add: function(){
    // console.log('modal',modal);
    this.modal.render();
  },

  delete: function(e){
    var id = $(e.target).parent().parent().data('id');
    this.model = new RepoListModel({id: id});
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

  viewRepo: function(event){
    var id = $(event.currentTarget).data('id');
    // console.log('navigating to repo, so route is calling')
    // Backbone.history.navigate('repos/'+id, true);
    var userdetail = new UserRepoTable();
    userRepos.render(id);
  },

  render: function(){
    var repo = new RepoCollection();
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



var UserRepoTable = Backbone.View.extend({
  el: '#mymodal',

  events: {
    'click .back': 'home'
  },

  home: function(){
    console.log('routing')
    Backbone.history.navigate('/', true)
  },

  render: function(id){
    var userrepolist = new UserRepoList([], {id: id});
    // var model = new RepoListModel();
    userrepolist.fetch({
      success: function(userrepolist){
        console.log('routing')
        var source = $('#UserRepoTableTemplate').html();
        var template = Handlebars.compile(source);
        console.log('routing',userrepolist.toJSON());
        this.$el.html(template(userrepolist.toJSON()));
        this.$el.modal('show');
      }.bind(this)
    })
  }
});

var userlist = new RepoEntries();
var userRepos = new UserRepoTable();
var router = new Router();

router.on('route:home',function(){
  userlist.render();
});
router.on('route:viewrepo',function(id){
  console.log('coming to router atleast')
  userRepos.render(id);
});
Backbone.history.start();
