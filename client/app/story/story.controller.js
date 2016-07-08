'use strict';
(function(){

class StoryComponent {
  constructor(Story, Auth) {
  	var vm = this;
    vm.message = 'Hello';

    Story.query(function(stories) {
      vm.stories = stories;
      console.log(vm.stories);
    });

    vm.newStory = null;

    vm.createStory = function(){
      vm.newStory.user = Auth.getCurrentUser();
      vm.newStory = new Story(vm.newStory);
      vm.newStory.$save(function() {
        vm.stories.push(vm.newStory);
        vm.newStory = {};
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.deleteStory = function(index){
      vm.stories[index].$delete(function() {
        vm.stories.splice(index, 1);
      }, function() {
        alert('Error! Something went wrong');
      });
    };

    vm.toggleEdit = function(index){
      vm.stories[index].edit = !vm.stories[index].edit;
      console.log(vm.stories);
    };

    vm.updateStory = function(index){
      vm.stories[index].$update(function() {
      }, function() {
        alert('Error! Something went wrong');
      });
    };
  }
}

angular.module('lifeApp')
  .component('story', {
    templateUrl: 'app/story/story.html',
    controller: StoryComponent,
    controllerAs: 'ctrl'
  });

})();
