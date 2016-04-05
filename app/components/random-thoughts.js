import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  favorites: storageFor('favorites'),
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
    },
    addFavorite: function(thoughts){
      let favs = this.get('favorites');
      favs.pushObject(thoughts);
    }


  }
});
