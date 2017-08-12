/**
 * Employee model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Employee = require('../../sqldb').Employee;
var EmployeeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
EmployeeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Employee.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    EmployeeEvents.emit(event + ':' + doc._id, doc);
    EmployeeEvents.emit(event, doc);
    done(null);
  };
}

exports.default = EmployeeEvents;
//# sourceMappingURL=employee.events.js.map
