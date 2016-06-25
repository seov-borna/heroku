'use strict';

import mongoose from 'mongoose';

var MissionSchema = new mongoose.Schema({
  title: String,
  info: String,
  quests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quest'}]
});

export default mongoose.model('Mission', MissionSchema);
