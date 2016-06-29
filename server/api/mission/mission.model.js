'use strict';

import mongoose from 'mongoose';
import relationship from 'mongoose-relationship';

var MissionSchema = new mongoose.Schema({
  title: String,
  info: String,
  quests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quest'}],
  story: {type: mongoose.Schema.ObjectId, ref: 'Story', childPath: 'missions'}
});

MissionSchema.plugin(relationship, { relationshipPathName: 'story' });

export default mongoose.model('Mission', MissionSchema);
