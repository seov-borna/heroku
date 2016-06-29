'use strict';

import mongoose from 'mongoose';

var StorySchema = new mongoose.Schema({
  title: String,
  info: String,
  missions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mission'}]
});

export default mongoose.model('Story', StorySchema);
