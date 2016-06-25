'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MissionSchema = new _mongoose2.default.Schema({
  title: String,
  info: String,
  quests: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Quest' }]
});

exports.default = _mongoose2.default.model('Mission', MissionSchema);
//# sourceMappingURL=mission.model.js.map
