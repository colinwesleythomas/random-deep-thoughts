import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  favorites: storageFor('favorites'),
  thinkyBrain: Ember.inject.service('thinky-brain'),
  diagram: null,
  thoughts: null,
  debug: true,

  init(){
    this._super();
    let thoughtTuple = this.get('thinkyBrain').get('thoughtTuple');
    this.set('diagram', thoughtTuple.diagram);
    this.set('thoughts', thoughtTuple.phrase);
  },

  actions: {
    changeThoughts: function(){
      let thoughtTuple = this.get('thinkyBrain').get('thoughtTuple');
      this.set('diagram', thoughtTuple.diagram);
      this.set('thoughts', thoughtTuple.phrase);
    },

    addFavorite: function(thoughts){
      let favs = this.get('favorites');
      favs.pushObject(thoughts);
    },

    removeFavorite: function(thoughts){
      let favs = this.get('favorites');
      favs.removeObject(thoughts);
    }

  }
});
