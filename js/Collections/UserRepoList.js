var UserRepoList = Backbone.Collection.extend({
    model: UserRepoListModel,

    initialize: function(model, options){
      console.log('collection fetching');
      this.url = 'https://sunilmore-rest-api.herokuapp.com/api/users/'+ options.id;
    },

    url: this.url
});
