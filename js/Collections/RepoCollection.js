var RepoCollection = Backbone.Collection.extend({
  model: RepoListModel,

  url: "https://api.github.com/users"
})
