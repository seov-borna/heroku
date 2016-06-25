/**
 * Quest model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _quest = require('./quest.model');

var _quest2 = _interopRequireDefault(_quest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
QuestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _quest2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    QuestEvents.emit(event + ':' + doc._id, doc);
    QuestEvents.emit(event, doc);
  };
}

exports.default = QuestEvents;
//# sourceMappingURL=quest.events.js.map
