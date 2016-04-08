import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  favorites: storageFor('favorites'),
  thinkyBrain: Ember.inject.service('thinky-brain'),
  diagram:  null,
  thoughts: null,
  debug:    false,

  init(){
    this._super();
    let ws = this.get('thinkyBrain').get('ws');
    let thoughtTuple = ws.get('thoughtTuple');
    console.log('thoughtTuple=', thoughtTuple);

    this.set('diagram', thoughtTuple.diagram);
    this.set('thoughts', thoughtTuple.phrase);
  },

  actions: {
    changeThoughts: function(){
      let ws = this.get('thinkyBrain').get('ws');
      let thoughtTuple = ws.get('thoughtTuple');
      console.log('thoughtTuple=', thoughtTuple);

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
