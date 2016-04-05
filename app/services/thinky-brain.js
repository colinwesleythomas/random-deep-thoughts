import Ember from 'ember';

// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get } = Ember;

export default Ember.Service.extend({
  positive_verbs: ["say", "think", "know", "understand"],
  negative_verbs: ["don't think", "don't know", "don't understand"],
  all_verbs: Ember.computed.union('positive_verbs', 'negative_verbs'),
  q_words: ["why", "how", "when", "that", "what"],
  nouns: [],
  subjects: ["you", "I"],
  modal_verbs: [
    "should",
    "might",
    "would never",
    "would",
    "may very well",
    "ought not",
    "could possibly",
    "sometimes have to",
    "don't have to"
  ],

  modal_verbs_infrequent: [
    "may in times of distress feel the need to",
    "certainly would be advised not to",
    "under no circumstances would be required to",
    "don't have to"
  ],


  thoughts: computed(function(){
    let positive_verbs = get(this, 'positive_verbs');
    let all_verbs = get(this, 'all_verbs');
    let modal_verbs = get(this, 'modal_verbs');
    let q_words = get(this, 'q_words');
    let subjects = get(this, 'subjects');
    // let nouns = get(this, 'nouns');
    let rpv = this.shuffle(positive_verbs); // random verbs
    let rv = this.shuffle(all_verbs); // random verbs
    let mv = this.shuffle(modal_verbs); // random verbs
    let qw = this.shuffle(q_words); // random question words
    let rs = this.shuffle(subjects); // random subjects
    let s = rs[0];
    let cw = this.shuffle(["if", "but only if", "however", "however only if", "so", "thus", "although"]);
    // phrase object
    let p = {};
    p.s1 = s; // subject
    p.s2 = s;
    p.s3 = s;
    p.s4 = s;

    p.mv1 = mv[0]; // Modal verb
    p.mv2 = mv[1];
    p.rv1 = rpv[0]; // positive only random verbs
    p.rv2 = rv[1];
    p.rv3 = rpv[2]; // positive only random verbs
    p.rv4 = rv[3];

    p.qw1 = qw[0]; // question word
    p.qw2 = qw[1];

    p.cw = cw[0]; // conjunction word

    let phrase = `
                  ${p.s1.capitalize()} ${p.mv1}
                  ${p.rv1} ${p.qw1}
                  ${p.s2} ${p.rv2}
                  ${p.cw}
                  ${p.s3} ${p.mv2} ${p.rv3}
                  ${p.qw2}
                  ${p.s4} ${p.rv4}.
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
