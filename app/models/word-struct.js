import DS from 'ember-data';
import Ember from 'ember';
import shuffle from 'random-deep-thoughts/utils/shuffle';
// const { attr } = DS;
const { computed, get } = Ember;

export default DS.Model.extend({

  questions: computed(function(){
    return shuffle(["why", "how", "when", "that", "what"]);
  }),

  topics: computed(function(){
    return shuffle([]);
  }),

  buzzwords: computed(function(){
    return shuffle([]);
  }),

  subjects: computed(function(){
    let st = get(this, 'subjectTuples');
    let random = shuffle(st);
    return random[0];
  }).volatile(),

  subjectTuples: computed(function(){
    // four subjects in sentence
    // 40% you
    // 40% I
    // 10% one/they
    // 10% they
    let yous     = ["you", "you", "you", "you"];
    let is       = ["I", "I", "I", "I"];
    let theys    = ["they", "they", "they", "they"];
    let oneTheys = ["one", "they", "one", "they"];

    let tuples = [
      yous, yous, yous, yous,
      is, is, is, is,
      theys, oneTheys,
    ];
    return shuffle(tuples);
  }).volatile(),

  verbTuples: computed(function(){
    // p = positive form
    // n = negative form
    // ab = avoidance before
    // aa = avoidance after
    return [
      {p: "say",        n: "don't say", ab: [], aa: []},
      {p: "think",      n: "don't think", ab: [], aa: []},
      {p: "know",       n: "don't know", ab: [], aa: []},
      {p: "understand", n: "don't understand", ab: [], aa: []},
      {p: "feel",       n: "don't feel", ab: [], aa: []},
      // {p: "sense",      n: "don't sense", ab: [], aa: []},
      // {p: "recognize",  n: "don't recognize", ab: [], aa: []},
    ];
  }),

  modalVerbTuples: computed(function(){
    // p = positive form
    // n = negative form
    // sn = strong negative form
    // ab = avoidance before
    // aa = avoidance after
    return [
      {p: "should", n: "should not", sn: "should never", ab: [], aa: []},
      {p: "would be likely to", n: "would be unlikely to", sn: "would never", ab: [], aa: []},
      {p: "might", n: "might not", sn: "might never", ab: [], aa: []},
      {p: "would", n: "would not", sn: "would never", ab: [], aa: []},
      {p: "may very well", n: "may very well not", sn: "may very well never", ab: [], aa: []},
      {p: "ought to", n: "ought not", sn: "ought never", ab: [], aa: []},
      {p: "must", n: "must not", sn: "must never", ab: [], aa: []},
      {p: "could possibly", n: "could possibly not", sn: "could possibly never", ab: [], aa: []},
      {p: "sometimes have to", n: "sometimes must not", sn: "sometimes must never", ab: [], aa: []},
      // {p: "has to", n: "does not have to", sn: "never has to", ab: [], aa: []},
    ];


    // Original list
      // modal_verbs: [
      //   "should",
      //   "should not",
      //   "should never",
      //   "would be unlikely to",
      //   "might",
      //   "would never",
      //   "would",
      //   "may very well",
      //   "ought to",
      //   "ought not",
      //   "must",
      //   "must not",
      //   "could possibly",
      //   "sometimes have to",
      //   "don't have to"
      // ],

    // TBD infrequent forms


      // modal_verbs_infrequent: [
      //   "may in times of distress feel the need to",
      //   "certainly would be advised not to",
      //   "under no circumstances would be required to",
      //   "don't have to"
      // ],
      //


    // [
    //   "may in times of distress feel the need to",
    //   "certainly would be advised not to",
    //   "under no circumstances would be required to",
    //   "don't have to"
    // ],
  }),

  conjunctiveTuples: computed(function(){
    // p = positive form
    // n = negative form
    // ab = avoidance before
    // aa = avoidance after
    return [
      {p: "if", n: "if not", ab: [], aa: []},
      {p: "but only if", n: "but only if not", ab: [], aa: []},
      {p: "however", n: "however not", ab: [], aa: []},
      {p: "however if", n: "however only if", ab: [], aa: []},
      {p: "so that", n: "so not to", ab: [], aa: []},
      {p: "thus", n: "thus never", ab: [], aa: []},
    ];
  }),

  positiveVerbs: computed(function(){
    let vt = get(this, 'verbTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.p);});
    return shuffle(l);
  }),

  negativeVerbs: computed(function(){
    let vt = get(this, 'verbTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.n);});
    return shuffle(l);
  }),

  allVerbs: computed.union('positiveVerbs', 'negativeVerbs'),

  positiveModalVerbs: computed(function(){
    let vt = get(this, 'modalVerbTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.p);});
    return shuffle(l);
  }),

  negativeModalVerbs: computed(function(){
    let vt = get(this, 'modalVerbTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.n);});
    return shuffle(l);
  }),

  strongNegativeModalVerbs: computed(function(){
    let vt = get(this, 'modalVerbTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.sn);});
    return shuffle(l);
  }),

  modalVerbs: computed.union('positiveModalVerbs', 'negativeModalVerbs', 'strongNegativeModalVerbs'),

  positiveConjunctives: computed(function(){
    let vt = get(this, 'conjunctiveTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.p);});
    return shuffle(l);
  }),

  negativeConjunctives: computed(function(){
    let vt = get(this, 'conjunctiveTuples');
    let l  = [];
    vt.forEach(item =>{l.push(item.n);});
    return shuffle(l);
  }),

  allConjunctives: computed.union('positiveConjunctives', 'negativeConjunctives'),


});
