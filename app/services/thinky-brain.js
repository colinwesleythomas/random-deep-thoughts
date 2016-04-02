import Ember from 'ember';

// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get } = Ember;

export default Ember.Service.extend({
  patterns: ["say", "don't say", "think", "don't think", "know", "don't know"],
  subjects: ["you", "I", "we", "they", "he", "she"],

  thoughts: computed(function(){
    let patterns = get(this, 'patterns');
    let subjects = get(this, 'subjects');
    let rp = this.shuffle(patterns); // random patterns
    let rs = this.shuffle(subjects); // random subjects
    let s = rs[0];
    let phrase = `${s} ${rp[0]} ${s} ${rp[1]} ${s} ${rp[2]} ${s} ${rp[3]}`;
    return phrase;
  }).volatile(),

  shuffle: function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

});
