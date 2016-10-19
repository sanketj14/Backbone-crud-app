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
