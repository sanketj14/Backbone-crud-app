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
