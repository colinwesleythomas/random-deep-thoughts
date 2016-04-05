import Ember from 'ember';
import shuffle from 'random-deep-thoughts/utils/shuffle';
// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get } = Ember;

export default Ember.Service.extend({
  positive_verbs: [
    "say",
    "think",
    "know",
    "understand",
    "feel",
    "sense",
    "recognize",
  ],
  q_words: ["why", "how", "when", "that", "what"],

  negative_verbs: [
    "don't think",
    "don't know",
    "don't understand",
    "don't feel",
    "don't sense",
    "don't recognize",
  ],
  uncommon_verbs: ["anticipate"],
  all_verbs: Ember.computed.union('positive_verbs', 'negative_verbs'),
  topics: [], // todo
  buzzwords: [], // todo
  nouns: [],
  subjects: ["you", "I", "they"],
  alt_subjects: ["one", "they"],
  modal_verbs: [
    "should",
    "should not",
    "should never",
    "would be unlikely to",
    "might",
    "would never",
    "would",
    "may very well",
    "ought to",
    "ought not",
    "must",
    "must not",
    "could possibly",
    "sometimes have to",
    "don't have to"
  ],

  conjunction_words: ["if", "but only if", "however", "however only if", "so", "thus", "although"],
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
    let alt_subjects = get(this, 'alt_subjects');
    let conjunction_words = get(this, 'conjunction_words');

    // let nouns = get(this, 'nouns');
    let rpv = shuffle(positive_verbs); // random verbs
    let rv  = shuffle(all_verbs); // random verbs
    let mv  = shuffle(modal_verbs); // random verbs
    let qw  = shuffle(q_words); // random question words
    let rs  = shuffle(subjects); // random subjects
    // let ras = this.shuffle(alt_subjects); // random alt subjects
    let s  = rs[0];
    let cw = shuffle(conjunction_words);
    // phrase object
    let p = {};

    let num = Math.round(Math.random());

    if (num % 2 === 0){
      // even
      p.s1 = s; // subject
      p.s2 = s;
      p.s3 = s;
      p.s4 = s;
    } else {
      // odd use alt subjects
      p.s1 = alt_subjects[0]; // alt subject
      p.s2 = alt_subjects[1];
      p.s3 = alt_subjects[0];
      p.s4 = alt_subjects[1];
    }

    p.mv1 = mv[0]; // Modal verb
    p.mv2 = mv[1];


    p.qw1 = qw[0]; // question word
    p.qw2 = qw[1];

    p.rv1 = rpv[0]; // positive only random verbs

    p.rv2 = rv[1];
    p.rv3 = rpv[2]; // positive only random verbs

    p.rv4 = rv[3];

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

});
