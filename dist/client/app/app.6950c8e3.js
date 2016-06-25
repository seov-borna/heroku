"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}angular.module("lifeApp",["lifeApp.auth","lifeApp.admin","lifeApp.constants","ngCookies","ngResource","ngSanitize","btford.socket-io","ui.router","ui.bootstrap","validation.match"]).config(["$urlRouterProvider","$locationProvider",function(a,b){a.otherwise("/"),b.html5Mode(!0)}]),angular.module("lifeApp.admin",["lifeApp.auth","ui.router"]),angular.module("lifeApp.auth",["lifeApp.constants","lifeApp.util","ngCookies","ui.router"]).config(["$httpProvider",function(a){a.interceptors.push("authInterceptor")}]),angular.module("lifeApp.util",[]),function(){function a(a,b,c,d,e,f,g){var h=f.safeCb,i={},j=e.userRoles||[];c.get("token")&&"/logout"!==a.path()&&(i=g.get());var k={login:function(a,e){var f=a.email,j=a.password;return b.post("/auth/local",{email:f,password:j}).then(function(a){return c.put("token",a.data.token),i=g.get(),i.$promise}).then(function(a){return h(e)(null,a),a})["catch"](function(a){return k.logout(),h(e)(a.data),d.reject(a.data)})},logout:function(){c.remove("token"),i={}},createUser:function(a,b){return g.save(a,function(d){return c.put("token",d.token),i=g.get(),h(b)(null,a)},function(a){return k.logout(),h(b)(a)}).$promise},changePassword:function(a,b,c){return g.changePassword({id:i._id},{oldPassword:a,newPassword:b},function(){return h(c)(null)},function(a){return h(c)(a)}).$promise},getCurrentUser:function(a){if(0===arguments.length)return i;var b=i.hasOwnProperty("$promise")?i.$promise:i;return d.when(b).then(function(b){return h(a)(b),b},function(){return h(a)({}),{}})},isLoggedIn:function(a){return 0===arguments.length?i.hasOwnProperty("role"):k.getCurrentUser(null).then(function(b){var c=b.hasOwnProperty("role");return h(a)(c),c})},hasRole:function l(a,b){var l=function(a,b){return j.indexOf(a)>=j.indexOf(b)};return arguments.length<2?l(i.role,a):k.getCurrentUser(null).then(function(c){var d=c.hasOwnProperty("role")?l(c.role,a):!1;return h(b)(d),d})},isAdmin:function(){return k.hasRole.apply(k,[].concat.apply(["admin"],arguments))},getToken:function(){return c.get("token")}};return k}a.$inject=["$location","$http","$cookies","$q","appConfig","Util","User"],angular.module("lifeApp.auth").factory("Auth",a)}();var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b){_classCallCheck(this,a),this.users=b.query()}return a.$inject=["User"],_createClass(a,[{key:"delete",value:function(a){a.$remove(),this.users.splice(this.users.indexOf(a),1)}}]),a}();angular.module("lifeApp.admin").controller("AdminController",a)}(),angular.module("lifeApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginController",controllerAs:"vm"}).state("logout",{url:"/logout?referrer",referrer:"main",template:"",controller:["$state","Auth",function(a,b){var c=a.params.referrer||a.current.referrer||"main";b.logout(),a.go(c)}]}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupController",controllerAs:"vm"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsController",controllerAs:"vm",authenticate:!0})}]).run(["$rootScope",function(a){a.$on("$stateChangeStart",function(a,b,c,d){"logout"===b.name&&d&&d.name&&!d.authenticate&&(b.referrer=d.name)})}]),angular.module("lifeApp.admin").config(["$stateProvider",function(a){a.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"admin",authenticate:"admin"})}]),function(a,b){a.module("lifeApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b,c,d){_classCallCheck(this,a),this.$http=b,this.socket=d,this.awesomeThings=[],c.$on("$destroy",function(){d.unsyncUpdates("thing")})}return a.$inject=["$http","$scope","socket"],_createClass(a,[{key:"$onInit",value:function(){var a=this;this.$http.get("/api/things").then(function(b){a.awesomeThings=b.data,a.socket.syncUpdates("thing",a.awesomeThings)})}},{key:"addThing",value:function(){this.newThing&&(this.$http.post("/api/things",{name:this.newThing}),this.newThing="")}},{key:"deleteThing",value:function(a){this.$http["delete"]("/api/things/"+a._id)}}]),a}();angular.module("lifeApp").component("main",{templateUrl:"app/main/main.html",controller:a})}(),angular.module("lifeApp").config(["$stateProvider",function(a){a.state("main",{url:"/",template:"<main></main>"})}]),function(){var a=function b(a,c){_classCallCheck(this,b),this.message="Hello",a.get("/api/quests").success(function(a){c.quests=a,console.log(c.quests)}).error(function(a){alert("Error! Something went wrong")}),c.createQuest=function(){a.post("/api/quests",c.newQuest).success(function(){c.quests.push(c.newQuest),c.newQuest={}}).error(function(a){alert("Error! Something went wrong")})},c.deleteQuest=function(b){a["delete"]("/api/quests/"+c.quests[b]._id).success(function(){c.quests.splice(b,1)}).error(function(a){alert("Error! Something went wrong")})},c.toggleEdit=function(a){c.quests[a].edit=!c.quests[a].edit},c.updateQuest=function(b){a.put("/api/quests/"+c.quests[b]._id,c.quests[b]).success(function(){c.quests[b].edit=!1}).error(function(a){alert("Error! Something went wrong")})}};a.$inject=["$http","$scope"],angular.module("lifeApp").component("quests",{templateUrl:"app/quests/quests.html",controller:a})}(),angular.module("lifeApp").config(["$stateProvider",function(a){a.state("quests",{url:"/quests",template:"<quests></quests>"})}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SettingsController=function(){function a(b){_classCallCheck(this,a),this.Auth=b}return a.$inject=["Auth"],_createClass(a,[{key:"changePassword",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.changePassword(this.user.oldPassword,this.user.newPassword).then(function(){b.message="Password successfully changed."})["catch"](function(){a.password.$setValidity("mongoose",!1),b.errors.other="Incorrect password",b.message=""})}}]),a}();angular.module("lifeApp").controller("SettingsController",SettingsController);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),LoginController=function(){function a(b,c){_classCallCheck(this,a),this.user={},this.errors={},this.submitted=!1,this.Auth=b,this.$state=c}return a.$inject=["Auth","$state"],_createClass(a,[{key:"login",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){b.$state.go("main")})["catch"](function(a){b.errors.other=a.message})}}]),a}();angular.module("lifeApp").controller("LoginController",LoginController),function(){function a(a,b,c,d,e){var f;return{request:function(a){return a.headers=a.headers||{},c.get("token")&&e.isSameOrigin(a.url)&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status&&((f||(f=d.get("$state"))).go("login"),c.remove("token")),b.reject(a)}}}a.$inject=["$rootScope","$q","$cookies","$injector","Util"],angular.module("lifeApp.auth").factory("authInterceptor",a)}(),function(){angular.module("lifeApp.auth").run(["$rootScope","$state","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,d){d.authenticate&&("string"==typeof d.authenticate?c.hasRole(d.authenticate,_.noop).then(function(d){return d?void 0:(a.preventDefault(),c.isLoggedIn(_.noop).then(function(a){b.go(a?"main":"login")}))}):c.isLoggedIn(_.noop).then(function(c){c||(a.preventDefault(),b.go("main"))}))})}])}(),function(){function a(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}a.$inject=["$resource"],angular.module("lifeApp.auth").factory("User",a)}(),angular.module("lifeApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(a,b){b.addClass("footer")}}}),angular.module("lifeApp").factory("Modal",["$rootScope","$uibModal",function(a,b){function c(){var c=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],d=arguments.length<=1||void 0===arguments[1]?"modal-default":arguments[1],e=a.$new();return angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(){var a=arguments.length<=0||void 0===arguments[0]?angular.noop:arguments[0];return function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("lifeApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}});var NavbarController=function a(b){_classCallCheck(this,a),this.isLoggedIn=b.isLoggedIn,this.isAdmin=b.isAdmin,this.getCurrentUser=b.getCurrentUser};NavbarController.$inject=["Auth"],angular.module("lifeApp").controller("NavbarController",NavbarController),angular.module("lifeApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),angular.module("lifeApp").controller("OauthButtonsCtrl",["$window",function(a){this.loginOauth=function(b){a.location.href="/auth/"+b}}]),angular.module("lifeApp").directive("oauthButtons",function(){return{templateUrl:"components/oauth-buttons/oauth-buttons.html",restrict:"EA",controller:"OauthButtonsCtrl",controllerAs:"OauthButtons",scope:{classes:"@"}}}),angular.module("lifeApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]);var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),SignupController=function(){function a(b,c){_classCallCheck(this,a),this.Auth=b,this.$state=c}return a.$inject=["Auth","$state"],_createClass(a,[{key:"register",value:function(a){var b=this;this.submitted=!0,a.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){b.$state.go("main")})["catch"](function(c){c=c.data,b.errors={},angular.forEach(c.errors,function(c,d){a[d].$setValidity("mongoose",!1),b.errors[d]=c.message})})}}]),a}();angular.module("lifeApp").controller("SignupController",SignupController),function(){function a(a){var b={safeCb:function(a){return angular.isFunction(a)?a:angular.noop},urlParse:function(a){var b=document.createElement("a");return b.href=a,""===b.host&&(b.href=b.href),b},isSameOrigin:function(c,d){return c=b.urlParse(c),d=d&&[].concat(d)||[],d=d.map(b.urlParse),d.push(a.location),d=d.filter(function(a){var b=c.hostname===a.hostname,d=c.protocol===a.protocol,e=c.port===a.port||""===a.port&&("80"===c.port||"443"===c.port);return b&&d&&e}),d.length>=1}};return b}a.$inject=["$window"],angular.module("lifeApp.util").factory("Util",a)}(),angular.module("lifeApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@example.com</code> / <code>test</code></p><p>Admin account is <code>admin@example.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=vm.login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && vm.submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && vm.submitted">Please enter a valid email.</p><p class=help-block>{{ vm.errors.other }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Login</button> <a class="btn btn-default btn-lg btn-register" ui-sref=signup>Register</a></div><hr><div class=row><div class="col-sm-4 col-md-3"><oauth-buttons classes=btn-block></oauth-buttons></div></div></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=vm.user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=vm.user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)">Password must be at least 3 characters.</p></div><div class=form-group><label>Confirm New Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.newPassword ng-minlength=3 required><p class=help-block ng-show="form.confirmPassword.$error.match && vm.submitted">Passwords must match.</p></div><p class=help-block>{{ vm.message }}</p><button class="btn btn-lg btn-primary" type=submit>Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.register(form) novalidate><div class=form-group ng-class="{ \'has-success\': form.name.$valid && vm.submitted,\n                                            \'has-error\': form.name.$invalid && vm.submitted }"><label>Name</label><input name=name class=form-control ng-model=vm.user.name required><p class=help-block ng-show="form.name.$error.required && vm.submitted">A name is required</p></div><div class=form-group ng-class="{ \'has-success\': form.email.$valid && vm.submitted,\n                                            \'has-error\': form.email.$invalid && vm.submitted }"><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && vm.submitted">Doesn\'t look like a valid email.</p><p class=help-block ng-show="form.email.$error.required && vm.submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ vm.errors.email }}</p></div><div class=form-group ng-class="{ \'has-success\': form.password.$valid && vm.submitted,\n                                            \'has-error\': form.password.$invalid && vm.submitted }"><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && vm.submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.password }}</p></div><div class=form-group ng-class="{ \'has-success\': form.confirmPassword.$valid && vm.submitted,\n                                            \'has-error\': form.confirmPassword.$invalid && vm.submitted }"><label>Confirm Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.password ng-minlength=3 required><p class=help-block ng-show="form.confirmPassword.$error.match && vm.submitted">Passwords must match.</p></div><div><button class="btn btn-inverse btn-lg btn-register" type=submit>Sign up</button> <a class="btn btn-default btn-lg btn-login" ui-sref=login>Login</a></div><hr><div class=row><div class="col-sm-4 col-md-3"><oauth-buttons classes=btn-block></oauth-buttons></div></div></form></div></div><hr></div>'),a.put("app/admin/admin.html",'<div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class="list-group user-list"><li class=list-group-item ng-repeat="user in admin.users"><div class=user-info><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span></div><a ng-click=admin.delete(user) class=trash><span class="fa fa-trash fa-2x"></span></a></li></ul></div>'),a.put("app/main/main.html",'<header class=hero-unit id=banner><div class=container><h1>\'Allo, \'Allo!</h1><p class=lead>Kick-start your next web app with Angular Fullstack</p><img src=assets/images/yeoman.462ccecb.png alt="I\'m Yeoman"></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Features:</h1><ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="thing in $ctrl.awesomeThings"><li><a href=# uib-tooltip={{thing.info}}>{{thing.name}}<button type=button class=close ng-click=$ctrl.deleteThing(thing)>&times;</button></a></li></ul></div></div><form class=thing-form><label>Syncs in realtime across clients</label><p class=input-group><input class=form-control placeholder="Add a new thing here." ng-model=$ctrl.newThing> <span class=input-group-btn><button type=submit class="btn btn-primary" ng-click=$ctrl.addThing()>Add New</button></span></p></form></div>'),a.put("app/quests/quests.html",'<div class=container><h1>Games</h1><div class=row><table class="table table-striped"><thead><th>Title</th><th>Info</th><th>Complete</th><th>Actions</th></thead><tbody><tr ng-repeat="quest in quests"><td ng-hide=quest.edit>{{quest.title}}</td><td ng-show=quest.edit><input ng-model=quest.title></td><td ng-hide=quest.edit>{{quest.info}}</td><td ng-show=quest.edit><input ng-model=quest.info></td><td ng-hide=quest.edit><input type=checkbox ng-model=quest.complete disabled></td><td ng-show=quest.edit><input type=checkbox ng-model=quest.complete></td><td ng-hide=quest.edit><button class="btn btn-success" ng-click=toggleEdit($index)>Edit</button> <button class="btn btn-danger" ng-click=deleteQuest($index)>Delete</button></td><td ng-show=quest.edit><button class="btn btn-primary" ng-click=updateQuest($index)>Save</button> <button class="btn btn-danger" ng-click=toggleEdit($index)>Cancel</button></td></tr><tr><td><input ng-model=newQuest.title></td><td><input ng-model=newQuest.info></td><td><button class="btn btn-primary" ng-click=createQuest()>Add New</button></td></tr></tbody></table></div></div>'),a.put("components/footer/footer.html",'<div class=container><p>Angular Fullstack v3.7.5 | <a href=https://twitter.com/tyhenkel>@tyhenkel</a> | <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="nav.isCollapsed = !nav.isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href=/ class=navbar-brand>life</a></div><div uib-collapse=nav.isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in nav.menu" ui-sref-active=active><a ui-sref={{item.state}}>{{item.title}}</a></li><li ng-show=nav.isAdmin() ui-sref-active=active><a ui-sref=admin>Admin</a></li><li ui-sref-active=active><a ui-sref=quests>Quests</a></li></ul><ul class="nav navbar-nav navbar-right"><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=signup>Sign up</a></li><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=login>Login</a></li><li ng-show=nav.isLoggedIn()><p class=navbar-text>Hello {{ nav.getCurrentUser().name }}</p></li><li ng-show=nav.isLoggedIn() ui-sref-active=active><a ui-sref=settings><span class="glyphicon glyphicon-cog"></span></a></li><li ng-show=nav.isLoggedIn()><a ui-sref=logout>Logout</a></li></ul></div></div></div>'),a.put("components/oauth-buttons/oauth-buttons.html",'<a ng-class=classes ng-click="OauthButtons.loginOauth(\'google\')" class="btn btn-social btn-google"><i class="fa fa-google-plus"></i> Connect with Google+</a>')}]);