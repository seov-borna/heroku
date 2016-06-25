'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var missionCtrlStub = {
  index: 'missionCtrl.index',
  show: 'missionCtrl.show',
  create: 'missionCtrl.create',
  update: 'missionCtrl.update',
  destroy: 'missionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var missionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mission.controller': missionCtrlStub
});

describe('Mission API Router:', function() {

  it('should return an express router instance', function() {
    missionIndex.should.equal(routerStub);
  });

  describe('GET /api/missions', function() {

    it('should route to mission.controller.index', function() {
      routerStub.get
        .withArgs('/', 'missionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/missions/:id', function() {

    it('should route to mission.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'missionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/missions', function() {

    it('should route to mission.controller.create', function() {
      routerStub.post
        .withArgs('/', 'missionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/missions/:id', function() {

    it('should route to mission.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'missionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/missions/:id', function() {

    it('should route to mission.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'missionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/missions/:id', function() {

    it('should route to mission.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'missionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
