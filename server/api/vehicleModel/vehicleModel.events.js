/**
 * VehicleModel model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var VehicleModel = require('../../sqldb').VehicleModel;
var VehicleModelEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
VehicleModelEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  VehicleModel.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    VehicleModelEvents.emit(event + ':' + doc._id, doc);
    VehicleModelEvents.emit(event, doc);
    done(null);
  };
}

exports.default = VehicleModelEvents;
//# sourceMappingURL=vehicleModel.events.js.map
