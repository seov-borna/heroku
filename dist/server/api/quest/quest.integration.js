'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newQuest;

describe('Quest API:', function () {

  describe('GET /api/quests', function () {
    var quests;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/quests').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        quests = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      quests.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/quests', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/quests').send({
        name: 'New Quest',
        info: 'This is the brand new quest!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newQuest = res.body;
        done();
      });
    });

    it('should respond with the newly created quest', function () {
      newQuest.name.should.equal('New Quest');
      newQuest.info.should.equal('This is the brand new quest!!!');
    });
  });

  describe('GET /api/quests/:id', function () {
    var quest;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/quests/' + newQuest._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        quest = res.body;
        done();
      });
    });

    afterEach(function () {
      quest = {};
    });

    it('should respond with the requested quest', function () {
      quest.name.should.equal('New Quest');
      quest.info.should.equal('This is the brand new quest!!!');
    });
  });

  describe('PUT /api/quests/:id', function () {
    var updatedQuest;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/quests/' + newQuest._id).send({
        name: 'Updated Quest',
        info: 'This is the updated quest!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedQuest = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedQuest = {};
    });

    it('should respond with the updated quest', function () {
      updatedQuest.name.should.equal('Updated Quest');
      updatedQuest.info.should.equal('This is the updated quest!!!');
    });
  });

  describe('DELETE /api/quests/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/quests/' + newQuest._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when quest does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/quests/' + newQuest._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=quest.integration.js.map
