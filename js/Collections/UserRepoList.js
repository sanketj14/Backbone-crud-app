var UserRepoList = Backbone.Collection.extend({
    model: RepolistView,

    initialize: function(model, options){
      this.url = 'https://api.github.com/'+ options.id +'/repos'
    },

    url: this.url

});
