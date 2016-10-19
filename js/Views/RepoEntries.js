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
