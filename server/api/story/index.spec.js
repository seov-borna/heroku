'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var storyCtrlStub = {
  index: 'storyCtrl.index',
  show: 'storyCtrl.show',
  create: 'storyCtrl.create',
  update: 'storyCtrl.update',
  destroy: 'storyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var storyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './story.controller': storyCtrlStub
});

describe('Story API Router:', function() {

  it('should return an express router instance', function() {
    storyIndex.should.equal(routerStub);
  });

  describe('GET /api/stories', function() {

    it('should route to story.controller.index', function() {
      routerStub.get
        .withArgs('/', 'storyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/stories/:id', function() {

    it('should route to story.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'storyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/stories', function() {

    it('should route to story.controller.create', function() {
      routerStub.post
        .withArgs('/', 'storyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/stories/:id', function() {

    it('should route to story.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'storyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/stories/:id', function() {

    it('should route to story.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'storyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/stories/:id', function() {

    it('should route to story.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'storyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
