'use strict';

import mongoose from 'mongoose';
import relationship from 'mongoose-relationship';

var StorySchema = new mongoose.Schema({
  title: String,
  info: String,
  missions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mission'}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User', childPath: 'stories'}
});

StorySchema.plugin(relationship, { relationshipPathName: 'user' });

export default mongoose.model('Story', StorySchema);
