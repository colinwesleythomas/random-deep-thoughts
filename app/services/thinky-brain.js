import Ember from 'ember';
// import shuffle from 'random-deep-thoughts/utils/shuffle';
// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get, guidFor, A } = Ember;
// const { create } = Ember.Object;

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  wordStruct: null,

  init() {
    this._super();
    let store = get(this, 'store');
    let ws = store.createRecord('word-struct');
    ws.set('id', guidFor(ws));

    let questionWords     = A([]);
    let subjectWords      = A([]);
    let positiveVerbWords = A([]);
    let negativeVerbWords = A([]);
    let modalVerbWords    = A([]);
    let conjunctiveWords  = A([]);


    // questions
    let seedWordQuestions = ['why', 'how', 'that', 'what', 'when'];
    seedWordQuestions.forEach((seed)=>{
      let obj = Ember.Object.create({value: seed, enabled: true, weight: 1});
      questionWords.pushObject(obj);
    });


    // subjects
    // let seedWordSubjects = ['you', 'I', 'they', 'one-they'];
    subjectWords.pushObject( Ember.Object.create({value: 'you',  enabled: true, weight: 0.4, pair: null}) );
    subjectWords.pushObject( Ember.Object.create({value: 'I',    enabled: true, weight: 0.4, pair: null }) );
    subjectWords.pushObject( Ember.Object.create({value: 'they', enabled: true, weight: 0.1, pair: 'one'}) );
    // subjectWords.pushObject( Ember.Object.create({value: 'one',  enabled: true, weight: 0.1, pair: 'they'}) );
    subjectWords.pushObject( Ember.Object.create({value: 'one-they',  enabled: true, weight: 0.1, pair: 'they'}) );


    // positive verbs
    let seedWordPositiveVerbs = [
      "say",
      "think",
      "know",
      "understand",
      "feel",
    ];

    seedWordPositiveVerbs.forEach((seed)=>{
      let obj = Ember.Object.create({value: seed, enabled: true, weight: 1});
      positiveVerbWords.pushObject(obj);
    });

    // negative verbs
    let seedWordNegativeVerbs = [
      "don't say",
      "don't think",
      "don't know",
      "don't understand",
      "don't feel",
    ];

    seedWordNegativeVerbs.forEach((seed)=>{
      let obj = Ember.Object.create({value: seed, enabled: true, weight: 1});
      negativeVerbWords.pushObject(obj);
    });


    // modal verbs
    let seedWordModalVerbs = [
       "should",
       "should not",
       "should never",
       "would be likely to",
       "would be unlikely to",
       "would never",
       "might",
       "might not",
       "would",
       "would not",
       "may very well",
       "ought to",
       "ought not",
       "ought",
       "must",
       "must not",
       "must never",
       "could possibly",
       "could possibly not",
       "sometimes have to",
    ];

    seedWordModalVerbs.forEach((seed)=>{
      let obj = Ember.Object.create({value: seed, enabled: true, weight: 1});
      modalVerbWords.pushObject(obj);
    });


    // conjunctive words
    let seedWordConjunctiveWords = [
      "if",
      "but only if",
      "however",
      "however only if",
      "so that",
      "so",
      "thus",
      "therefore",
      ", which is why"
    ];
    seedWordConjunctiveWords.forEach((seed)=>{
      let obj = Ember.Object.create({value: seed, enabled: true, weight: 1});
      conjunctiveWords.pushObject(obj);
    });

    // seed the words
    ws.set('questionWords', questionWords);
    ws.set('subjectWords', subjectWords);
    ws.set('positiveVerbWords', positiveVerbWords);
    ws.set('negativeVerbWords', negativeVerbWords);
    ws.set('modalVerbWords', modalVerbWords);
    ws.set('conjunctiveWords', conjunctiveWords);

    this.set('wordStruct', ws);
  },
  ws: computed.alias('wordStruct')
});
