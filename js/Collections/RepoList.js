var UserRepoList = Backbone.Collection.extend({
    model: RepolistView,

    url:  function(){
      'https://api.github.com/user/repos'
    }
});
