// import angular from 'angular';
// import angularSanitize from 'angular-sanitize';
// import uiselect from 'ui-select';
// import firebase from 'firebase';
// import angularMessages from 'angular-messages';
// import ngmap from 'ngmap';
// import localStorageModule from 'angular-local-storage';
// import angularRecaptcha from 'angular-recaptcha';

// angular.module('hotel.app', [uiselect, angularSanitize, angularMessages, ngmap, localStorageModule, angularRecaptcha])
//     .config(() => {
//     	// Initialize Firebase
//     	//test dev
//     	var config = {
// 			apiKey           : "AIzaSyB9rb6JeY1CYWc0HgFm0wLpeyvBQLFeyOQ",
// 			authDomain       : "chatnbook-dev.firebaseapp.com",
// 			databaseURL      : "https://chatnbook-dev.firebaseio.com",
// 			projectId        : "chatnbook-dev",
// 			storageBucket    : "chatnbook-dev.appspot.com",
// 			messagingSenderId: "198609674690"
//     	};

//   //   	var config = {
// 		//     apiKey: "AIzaSyCpbUGlOBSQTjXpkRhSS8kejOLM-y436JU",
// 		//     authDomain: "chatnbook-app.firebaseapp.com",
// 		//     databaseURL: "https://chatnbook-app.firebaseio.com",
// 		//     projectId: "chatnbook-app",
// 		//     storageBucket: "chatnbook-app.appspot.com",
// 		//     messagingSenderId: "595087924241"
// 		// };
//     	firebase.initializeApp(config);
//     })
//     .config(($interpolateProvider) => {
//       $interpolateProvider.startSymbol('[[');
//       $interpolateProvider.endSymbol(']]');
//     })
//     .controller('MainCtrl', ['$http', '$q', '$scope', 'localStorageService', function ($http, $q, $scope, localStorageService) {
//         console.log('loaded');
//         var self = this;
//         this.data = {};
//         this.complete = false;
//         this.searchText = null;
//         this.errorMessage = null;
//         self.hotelExist = {};
//         localStorageService.clearAll();

//         // this.sendForm = function () {
//         //     console.log('clicked', this.data);
//         // };

//         this.searchHotel = function (text) {
//         	if (text !== '' && self.searchText !== text) {
// 	    		self.searchText = text;
// 				var config = {
// 					withCredentials: true,
// 					crossDomain: true
// 				};
// 				var url = 'https://api.chatnbook.com/v2/search?text=' + text + '&count=50';

// 				return $http.get(url, config).then(function (response) {
// 					self.hotels = response.data;
// 					return self.hotels;
// 				}).catch(function (error) {
// 					console.log('search error ', error);
// 					self.errorMessage = 'Something went wrong. Please try later';
// 				});
//         	} else if (text === '') {
//         		self.hotels = [];
//         		self.selectedHotel = null;
//         	}
//         }

//         self.findHotelInFB = function (item) {
//             firebase.database().ref('providers').child(item.id).once('value', function(snapshot) {
//                 $scope.$applyAsync(function() {
//                     self.fbHotel = snapshot.val() ? snapshot.val() : {};
//                 });
//             });
//         }

//         self.resetNewHotel = function () {
//         	self.newHotel = false;
//         	self.data.newHotel = {};
//         	self.hotelExist = {};
//         }

//         self.compareHotel = function (path, text) {
//             var pathName;
//             if (text) {
//             	if (path === 'website') {
//             		text = text.replace(/^(?:https?:\/\/(?:www\.))/g, '');
//             		text = text.replace(/(\/$)?/g, '');
//             		// console.log('compareHotel', text);
//                     pathName = `link/${path}/url`;
//             	} else {
//                     pathName = `info/${path}`;
//                 }
//             	var ref = firebase.database().ref('providers');
//     			ref.orderByChild(pathName).equalTo(text).once('value', function(snapshot) {
//     				if (_.isObject(snapshot.val())) {
//     					$scope.$applyAsync(function() {
//     						self.hotelExist[path] = true;
//     					});
//     					// console.log('self.hotelExist', self.hotelExist);
//     				} else {
//     					$scope.$applyAsync(function() {
//     						self.hotelExist[path] = false;
//     					});
//     					// console.log('self.hotelExist', self.hotelExist);
//     				}
//     			});
//             }
//         }

//         self.saveRequest = function () {
//         	var ownerRequest = {
//         		created: firebase.database.ServerValue.TIMESTAMP,
// 				name: self.data.name,
// 				phone: self.data.phone,
// 				email: self.data.email
// 			}
//             var links = (self.selectedHotel && !_.get(self.data.newHotel, 'name')) ? self.fbHotel.link : self.data.newHotel.link;
// 			var requestWithHotel;
//         	if (self.selectedHotel && !_.get(self.data.newHotel, 'name')) {
//         		requestWithHotel = $q.resolve(_.extend(ownerRequest, {hotel: {
//                     id: self.selectedHotel.id,
//                     new: false,
//                     link: links
//                 }}));
//         	} else {
//         		requestWithHotel = self.saveNewHotel().then(function (hotelId) {
//         			return _.extend(ownerRequest, {hotel: {
//                         id: hotelId,
//                         new: true,
//                         link: links
//                     }});
//         		});
//         	}
//         	requestWithHotel.then(function () {
//         		var requestRef = firebase.database().ref('ownerRequests');
//         		var newRequestRef = requestRef.push();
//         		newRequestRef.set(ownerRequest).then(function () {
//         			$scope.$applyAsync(function() {
//         				self.complete = true;
//         			});
//         			// console.log('owner request saved',  ownerRequest, newRequestRef.key);
//         		}).catch(function(error) {
//         			self.errorMessage = 'Something went wrong. Please try later';
//         			console.log('error save ownerRequest', error);
//         		});
//         	})

//         }

//         self.setHotelCoords = function (latitude, longitude) {
//             self.data.newHotel.latitude = latitude;
//             self.data.newHotel.longitude = longitude;
// 	    };
// 	    self.markerPositionChange = function () {
//             var coords = this.position;
//             self.setHotelCoords(coords.lat(), coords.lng());
// 	    };

// 	    self.dragMapMarkerEnd = function (ev) {
//             console.log('Map drag coords ', ev.latLng.lat(), ev.latLng.lng());
//             self.setHotelCoords(ev.latLng.lat(), ev.latLng.lng());
// 	    };

//         self.saveNewHotel = function () {
//         	var address = `${self.data.newHotel.country} ${self.data.newHotel.city} ${self.data.newHotel.address}`;
//         	var newHotel = {
//         		info: {
// 					type: 1,
// 					name: self.data.newHotel.name,
// 					address: address,
// 					coords: {
// 						latitude: self.data.newHotel.latitude,
// 						longitude: self.data.newHotel.longitude
// 					},
//                 }
//         	}
//         	var requestRef = firebase.database().ref('providersRequests');
//     		var newRequestRef = requestRef.push();
//     		return newRequestRef.set(newHotel).then(function () {
//     			return newRequestRef.key;
//     		}).catch(function(error) {
//     			throw error;
//     		});
//         }

//     }]);