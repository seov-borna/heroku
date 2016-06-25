'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newMission;

describe('Mission API:', function () {

  describe('GET /api/missions', function () {
    var missions;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/missions').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        missions = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      missions.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/missions', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/missions').send({
        name: 'New Mission',
        info: 'This is the brand new mission!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newMission = res.body;
        done();
      });
    });

    it('should respond with the newly created mission', function () {
      newMission.name.should.equal('New Mission');
      newMission.info.should.equal('This is the brand new mission!!!');
    });
  });

  describe('GET /api/missions/:id', function () {
    var mission;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/missions/' + newMission._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        mission = res.body;
        done();
      });
    });

    afterEach(function () {
      mission = {};
    });

    it('should respond with the requested mission', function () {
      mission.name.should.equal('New Mission');
      mission.info.should.equal('This is the brand new mission!!!');
    });
  });

  describe('PUT /api/missions/:id', function () {
    var updatedMission;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/missions/' + newMission._id).send({
        name: 'Updated Mission',
        info: 'This is the updated mission!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedMission = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedMission = {};
    });

    it('should respond with the updated mission', function () {
      updatedMission.name.should.equal('Updated Mission');
      updatedMission.info.should.equal('This is the updated mission!!!');
    });
  });

  describe('DELETE /api/missions/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/missions/' + newMission._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when mission does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/missions/' + newMission._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=mission.integration.js.map
