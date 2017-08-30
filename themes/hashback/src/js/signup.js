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
			apiKey           : "AIzaSyB9rb6JeY1CYWc0HgFm0wLpeyvBQLFeyOQ",
			authDomain       : "chatnbook-dev.firebaseapp.com",
			databaseURL      : "https://chatnbook-dev.firebaseio.com",
			projectId        : "chatnbook-dev",
			storageBucket    : "chatnbook-dev.appspot.com",
			messagingSenderId: "198609674690"
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
				phone: self.data.phone,
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