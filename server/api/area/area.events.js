/**
 * Area model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Area = require('../../sqldb').Area;
var AreaEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AreaEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Area.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    AreaEvents.emit(event + ':' + doc._id, doc);
    AreaEvents.emit(event, doc);
    done(null);
  };
}

exports.default = AreaEvents;
//# sourceMappingURL=area.events.js.map
