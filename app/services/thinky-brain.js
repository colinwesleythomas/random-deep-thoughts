import Ember from 'ember';

// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get } = Ember;

export default Ember.Service.extend({
  verbs: ["say", "think", "know", "don't say", "don't think", "don't know"],
  q_words: ["why", "how", "when", "that", "who"],
  nouns: [],
  subjects: ["you", "I"],
  modal_verbs: ["should", "might", "could possibly", "may very well"],


  thoughts: computed(function(){
    let verbs = get(this, 'verbs');
    let modal_verbs = get(this, 'modal_verbs');
    let q_words = get(this, 'q_words');
    let subjects = get(this, 'subjects');
    // let nouns = get(this, 'nouns');
    let rv = this.shuffle(verbs); // random verbs
    let mv = this.shuffle(modal_verbs); // random verbs
    let qw = this.shuffle(q_words); // random question words
    let rs = this.shuffle(subjects); // random subjects
    let s = rs[0];
    let cw = this.shuffle(["if", "but if", "however", "however if", "so", "thus", "although"]);
    // phrase object
    let p = {};
    p.s1 = s; // subject
    p.s2 = s;
    p.s3 = s;
    p.s4 = s;

    p.mv = mv[0]; // Modal verb

    p.rv1 = rv[0]; // random verbs
    p.rv2 = rv[1];
    p.rv3 = rv[2];
    p.rv4 = rv[3];

    p.qw1 = qw[0]; // question word
    p.qw2 = qw[1];

    p.cw = cw[0]; // conjunction word

    let phrase = `
                  ${p.s1} ${p.mv}
                  ${p.rv1} ${p.qw1}
                  ${p.s2} ${p.rv2}
                  ${p.cw}
                  ${p.s3} ${p.rv3}
                  ${p.qw2}
                  ${p.s4} ${p.rv4}
                 `;
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
