import Ember from 'ember';
import shuffle from 'random-deep-thoughts/utils/shuffle';
// How to use
// thinkyBrain: Ember.inject.service('thinky-brain')
const { computed, get } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service('store'),

  ws: computed(function(){
    let store = get(this, 'store');
    return store.createRecord('word-struct');
  }),

  thoughtTuple: computed(function(){
    let ws              = get(this, 'ws');
    let positiveVerbs   = ws.get('positiveVerbs');
    let allVerbs        = ws.get('allVerbs');
    let modalVerbs      = ws.get('modalVerbs');
    let questions       = ws.get('questions');
    let subjects        = ws.get('subjects');
    let allConjunctives = ws.get('allConjunctives');

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
