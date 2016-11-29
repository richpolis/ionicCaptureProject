angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaCapture) {

  $scope.audioCapturado = { capturado: false };


  $scope.playAudio = function(){
    // Play the audio file at url
    var src = "myrecording.amr";
    var my_media = new Media($scope.audioCapturado.localURL,
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
    });

    // Play audio
    my_media.play();

    // Mute volume after 2 seconds
    /*setTimeout(function() {
        my_media.setVolume('0.0');
    }, 2000);*/

    // Set volume to 1.0 after 5 seconds
    /*setTimeout(function() {
        my_media.setVolume('1.0');
    }, 5000);*/
  }

  $scope.mediaAudio = function(){
    var src = "myrecording.amr";
    var mediaRec = new Media(src,
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        }
    );

    // Record audio
    mediaRec.startRecord();

    // Stop recording after 10 seconds
    setTimeout(function() {
        mediaRec.stopRecord();
    }, 10000);
  }

  $scope.captureAudio = function() {
    var options = { limit: 1, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioFiles) {

        console.log(JSON.stringify(audioFiles));

        var audioFile = audioFiles[0],
        fileReader = new FileReader(),
        file;
        fileReader.onload = function (readerEvt) {
            var base64 = readerEvt.target.result;
            console.log(base64);
            $scope.audioCapturado.audioBase64 = base64;
        };
        //fileReader.reasAsDataURL(audioFile); //This will result in your problem.
        file = new window.File(audioFile.name, audioFile.localURL, 
                               audioFile.type, audioFile.lastModifiedDate, audioFile.size);
        fileReader.readAsDataURL(file); //This will result in the solution.

        $scope.audioCapturado = audioFile;
        $scope.audioCapturado.capturado = true;

        }, function(err) {
          // An error occurred. Show a message to the user
          console.log('captureError' ,e);
        });
      }

  $scope.captureImage = function() {
    var options = { limit: 1 };

    $cordovaCapture.captureImage(options).then(function(imageData) {
      console.log(JSON.stringify(imageData));
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }

  $scope.captureVideo = function() {
    var options = { limit: 1, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
      console.log(JSON.stringify(videoData));
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
