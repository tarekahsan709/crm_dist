/**
 * Permission model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Permission = require('../../sqldb').Permission;
var PermissionEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PermissionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Permission.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    PermissionEvents.emit(event + ':' + doc._id, doc);
    PermissionEvents.emit(event, doc);
    done(null);
  };
}

exports.default = PermissionEvents;
//# sourceMappingURL=permission.events.js.map
