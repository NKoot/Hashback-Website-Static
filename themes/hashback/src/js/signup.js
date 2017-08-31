import angular from 'angular';
import angularSanitize from 'angular-sanitize';
// import uiselect from 'ui-select';
import firebase from 'firebase';
import angularMessages from 'angular-messages';
// import ngmap from 'ngmap';
import localStorageModule from 'angular-local-storage';
import angularRecaptcha from 'angular-recaptcha';

angular.module('access.app', [angularSanitize, angularMessages, angularRecaptcha, localStorageModule])
    .config(() => {
    	// Initialize Firebase
    	//test dev
    	var config = {
			apiKey           : "AIzaSyD9RUtVQAvNRA4-lxZ8WCBfrU3aWyh8dy0",
            authDomain       : "hashback-5377c.firebaseapp.com",
            databaseURL      : "https://hashback-5377c.firebaseio.com",
            projectId        : "hashback-5377c",
            storageBucket    : "hashback-5377c.appspot.com",
            messagingSenderId: "317555284824"
    	};

    	firebase.initializeApp(config);
    })
    .config(($interpolateProvider) => {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .controller('MainCtrl', ['$http', '$q', '$scope', 'localStorageService', function ($http, $q, $scope, localStorageService) {
        console.log('loaded');
        var self = this;
        this.data = {};
        this.complete = false;
        this.errorMessage = null;
        localStorageService.clearAll();

        // this.sendForm = function () {
        //     console.log('clicked', this.data);
        // };



        self.saveRequest = function () {
        	var accessRequest = {
        		created: firebase.database.ServerValue.TIMESTAMP,
				name: self.data.name,
				email: self.data.email
			}
			var requestRef = firebase.database().ref('requests');
        	var newRequestRef = requestRef.push();
        	newRequestRef.set(accessRequest).then(function () {
    			$scope.$applyAsync(function() {
    				self.complete = true;
    			});
				console.log('request saved',  accessRequest, newRequestRef.key);
    		}).catch(function(error) {
        			self.errorMessage = 'Something went wrong. Please try later';
        			console.log('error save accessRequest', error);
			});
        }

    }]);