var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'repos/:id': 'viewrepo'
    }
});
