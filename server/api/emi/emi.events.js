/**
 * Emi model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Emi = require('../../sqldb').Emi;
var EmiEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
EmiEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Emi) {
  for (var e in events) {
    var event = events[e];
    Emi.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc, options, done) {
    EmiEvents.emit(event + ':' + doc._id, doc);
    EmiEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Emi);
exports.default = EmiEvents;
//# sourceMappingURL=emi.events.js.map
