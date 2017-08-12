/**
 * Dealer model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Dealer = require('../../sqldb').Dealer;
var DealerEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
DealerEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Dealer.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    DealerEvents.emit(event + ':' + doc._id, doc);
    DealerEvents.emit(event, doc);
    done(null);
  };
}

exports.default = DealerEvents;
//# sourceMappingURL=dealer.events.js.map
