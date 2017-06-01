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
