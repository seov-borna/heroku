/**
 * Mission model events
 */

'use strict';

import {EventEmitter} from 'events';
import Mission from './mission.model';
var MissionEvents = new EventEmitter();

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
  Mission.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MissionEvents.emit(event + ':' + doc._id, doc);
    MissionEvents.emit(event, doc);
  }
}

export default MissionEvents;
