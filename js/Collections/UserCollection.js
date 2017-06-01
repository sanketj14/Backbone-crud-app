var UserCollection = Backbone.Collection.extend({

  model: UserModel,
  url: "https://sunilmore-rest-api.herokuapp.com/api/users"

});
