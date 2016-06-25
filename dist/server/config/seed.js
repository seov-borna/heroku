/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _mission = require('../api/mission/mission.model');

var _mission2 = _interopRequireDefault(_mission);

var _quest = require('../api/quest/quest.model');

var _quest2 = _interopRequireDefault(_quest);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_thing2.default.find({}).remove().then(function () {
  _thing2.default.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

var mission1 = new _mission2.default({
  title: 'Wall of Inspiration',
  info: 'You need to create a wall of inspiration with photo galleries in order to remind yourself of whats important after all.',
  quests: []
});

_mission2.default.find({}).remove().then(function () {
  _mission2.default.create(mission1).then(function () {
    console.log('finished populating missions');
  });
});

var quest1 = new _quest2.default({
  title: 'Save dem Influencers',
  info: 'Collect Pictures of Influencive People',
  complete: false,
  mission: mission1._id
});

quest1.save();

/*Quest.find({}).remove()
  .then(() => {
    Quest.create({
      title: 'Build Quest Management Tool',
      info: 'A Quest Management Tool is needed in order to document progression of tasks.',
      complete: true
    }, {
      title: 'Build Mission Management Tool',
      info: 'A Mission Management Tool is needed in order to document progression of missions.',
      complete: false
    })
    .then(() => {
      console.log('finished populating quests');
    });
  });  */

_user2.default.find({}).remove().then(function () {
  _user2.default.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
