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

