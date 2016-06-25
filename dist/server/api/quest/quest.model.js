'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseRelationship = require('mongoose-relationship');

var _mongooseRelationship2 = _interopRequireDefault(_mongooseRelationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestSchema = new _mongoose2.default.Schema({
  title: String,
  info: String,
  complete: { type: Boolean, default: false },
  mission: { type: _mongoose2.default.Schema.ObjectId, ref: 'Mission', childPath: 'quests' }
});

QuestSchema.plugin(_mongooseRelationship2.default, { relationshipPathName: 'mission' });

exports.default = _mongoose2.default.model('Quest', QuestSchema);
//# sourceMappingURL=quest.model.js.map
