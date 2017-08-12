/**
 * Customer model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Customer = require('../../sqldb').Customer;
var CustomerEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CustomerEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Customer.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CustomerEvents.emit(event + ':' + doc._id, doc);
    CustomerEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CustomerEvents;
//# sourceMappingURL=customer.events.js.map
