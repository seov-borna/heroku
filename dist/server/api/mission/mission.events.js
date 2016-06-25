/**
 * Mission model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _mission = require('./mission.model');

var _mission2 = _interopRequireDefault(_mission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MissionEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MissionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _mission2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    MissionEvents.emit(event + ':' + doc._id, doc);
    MissionEvents.emit(event, doc);
  };
}

exports.default = MissionEvents;
//# sourceMappingURL=mission.events.js.map
