import DS from 'ember-data';
import Ember from 'ember';
import shuffle from 'random-deep-thoughts/utils/shuffle';
import weightedList from 'random-deep-thoughts/utils/weighted-list';

const { attr }     = DS;
const { computed } = Ember;
const minSubjects  = 4;

export default DS.Model.extend({
  // These are all arrays of ember objects
  // The are created in teh thinky-brain service
  // but can come from backend or manually manipulated in UI
  questionWords:    attr(),
  // topicWords:       attr(),
  // buzzWords:        attr(),
  subjectWords:      attr(),
  positiveVerbWords: attr(),
  negativeVerbWords: attr(),
  modalVerbWords:    attr(),
  conjunctiveWords:  attr(),

  questions: computed('questionWords', function(){
    let seeds = this.get('questionWords');
    let list = [];
    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
      }
    });
    return shuffle(list);
  }).volatile(),

  subjects: computed('subjectWords', function(){
    let seeds       = this.get('subjectWords');
    let list        = [];
    let weights     = [];
    let subjectList = [];
    let randomItem  = null;

    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
        weights.push(item.get('weight'));
      }
    });

    randomItem = weightedList(list, weights);

    if (randomItem === 'one-they'){
      subjectList = ['one', 'they', 'one', 'they'];
    } else {
      // build up 4 of the same subject
      for (var i = 0; i < minSubjects; i++) {
        subjectList.push(randomItem);
      }
    }

    console.log('subjectList=', subjectList);
    return subjectList;
  }).volatile(),


  // topics: computed(function(){
  //   return shuffle([]);
  // }),
  //
  // buzzlist: computed(function(){
  //   return shuffle([]);
  // }),


  positiveVerbs: computed('positiveVerbWords', function(){
    let seeds = this.get('positiveVerbWords');
    let list = [];
    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
      }
    });    return shuffle(list);
  }).volatile(),

  negativeVerbs: computed('negativeVerbWords', function(){
    let seeds = this.get('negativeVerbWords');
    let list = [];
    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
      }
    });    return shuffle(list);
  }).volatile(),

  allVerbs: computed.union('positiveVerbs', 'negativeVerbs'),

  modalVerbs: computed('modalVerbWords', function(){
    let seeds = this.get('modalVerbWords');
    let list = [];
    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
      }
    });    return shuffle(list);
  }).volatile(),

  allConjunctives: computed('conjunctiveWords', function(){
    let seeds = this.get('conjunctiveWords');
    let list = [];
    seeds.forEach(function(item) {
      if (item.get('enabled')){
        list.push(item.get('value'));
      }
    });    return shuffle(list);
  }).volatile(),

  thoughtTuple: computed(function(){
    let positiveVerbs   = this.get('positiveVerbs');
    let allVerbs        = this.get('allVerbs');
    let modalVerbs      = this.get('modalVerbs');
    let questions       = this.get('questions');
    let subjects        = this.get('subjects');
    let allConjunctives = this.get('allConjunctives');
    let rpv = shuffle(positiveVerbs); // random verbs
    let rv  = shuffle(allVerbs);      // random verbs
    let mv  = shuffle(modalVerbs);    // random verbs
    let qw  = shuffle(questions);     // random question words
    let cw  = allConjunctives;
    let p = {}; // phrase object
    p.s1 = subjects[0]; // subject
    p.s2 = subjects[1];
    p.s3 = subjects[2];
    p.s4 = subjects[3];
    p.mv1 = mv[0]; // Modal verb
    p.mv2 = mv[1];
    p.qw1 = qw[0]; // question word
    p.qw2 = qw[1];
    p.rv1 = rpv[0]; // positive only random verbs
    p.rv2 = rv[1];
    p.rv3 = rpv[2]; // positive only random verbs
    p.rv4 = rv[3];
    p.cw = cw[0]; // conjunction word

    let verb_dict = {
      "say": {
        "why": "speak",
        "how": "speak",
        "when": "speak",
        "that": "say",
        "what": "say",
      }
    };

    if (p.rv2 === "say") {
      p.rv2 = verb_dict["say"][p.qw1];
    }

    if (p.rv4 === "say") {
      p.rv4 = verb_dict["say"][p.qw2];
    }

    let tuple = {
      structure: null,
      diagram: null,
      phrase: null,
    };

    let structure = `
                  Subject 1
                  Modal verb 1
                  Random verb 1
                  Question 1
                  Subject 2
                  Random verb 2
                  Conjunctive
                  Subject 3
                  Modal verb 3
                  Random verb 3
                  Question 2
                  Subject 4
                  Random verb 4
                 `;

    let diagram = {
      "Subject 1": p.s1.capitalize(),
      "Modal verb 1": p.mv1,
      "Random verb 1": p.rv1,
      "Question 1": p.qw1,
      "Subject 2": p.s2,
      "Random verb 2": p.rv2,
      "Conjunctive": p.cw,
      "Subject 3": p.s3,
      "Modal verb 2": p.mv2,
      "Random verb 3": p.rv3,
      "Question 2": p.qw2,
      "Subject 4": p.s4,
      "Random verb 4": p.rv4
    };

    let phrase = `
                  ${p.s1.capitalize()}
                  ${p.mv1}
                  ${p.rv1}
                  ${p.qw1}
                  ${p.s2}
                  ${p.rv2}
                  ${p.cw}
                  ${p.s3}
                  ${p.mv2}
                  ${p.rv3}
                  ${p.qw2}
                  ${p.s4}
                  ${p.rv4}.
                 `;

    tuple.structure = structure;
    tuple.diagram = diagram;
    tuple.phrase = phrase;

    return tuple;
  }).volatile(),
});
