/**
 * Grade model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Grade = require('../../sqldb').Grade;
var GradeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
GradeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Grade.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    GradeEvents.emit(event + ':' + doc._id, doc);
    GradeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = GradeEvents;
//# sourceMappingURL=grade.events.js.map
