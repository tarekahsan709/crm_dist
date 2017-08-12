/**
 * Problem model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Problem = require('../../sqldb').Problem;
var ProblemEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ProblemEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Problem.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ProblemEvents.emit(event + ':' + doc._id, doc);
    ProblemEvents.emit(event, doc);
    done(null);
  };
}

exports.default = ProblemEvents;
//# sourceMappingURL=problem.events.js.map
