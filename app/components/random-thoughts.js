import Ember from 'ember';

export default Ember.Component.extend({
  thinkyBrain: Ember.inject.service('thinky-brain'),
  thoughts: null,
  init(){
    this._super();
    this.set('thoughts', this.get('thinkyBrain').get('thoughts'));
  },

  actions: {
    changeThoughts: function(){
      let thoughts = this.get('thinkyBrain').get('thoughts');
      this.set('thoughts', thoughts);
    }
  }
});
