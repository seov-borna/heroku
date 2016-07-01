'use strict';

import mongoose from 'mongoose';
import relationship from 'mongoose-relationship';

var QuestSchema = new mongoose.Schema({
  title: String,
  info: String,
  complete: { type: Boolean, default: false },
  type: {type: String, enum: ['DEFAULT', 'DAILY', 'URGENT', 'IMPORTANT'], default: 'DEFAULT'},
  mission: {type: mongoose.Schema.ObjectId, ref: 'Mission', childPath: 'quests'}
});

QuestSchema.plugin(relationship, { relationshipPathName: 'mission' });

export default mongoose.model('Quest', QuestSchema);