import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render();
    this.render('index-header', {
      into: 'application',
      outlet: 'top-route-header'
    })
  }
});
