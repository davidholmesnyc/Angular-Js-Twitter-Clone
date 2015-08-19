(function(){
  var app = angular.module('app', ['twitterlist', 'tweetbox']); // create our angular.js app 
  var tweets = twitter.generateFakeTweets() // generate fake tweets .. you can see this function in twitter.js
  

  // this is the module for the tweetlist
  var twitterlist = angular
  .module("twitterlist",[])
  .controller('MyCtrl',["$scope",function($scope){
   $scope.twitter = twitter
   $scope.tweets = tweets
   $scope.myVar = true;
   
   $scope.reply = function(tweet){
    tweet.show = !tweet.show;
    var index = this.$index
    setTimeout(function(){
      $(".tweetlist textarea").eq(index).focus()
    },50)
   }
   $scope.replyToTweet = function(tweet){
      var index = this.$index
      tweet.reply = 'grey-text'
      tweet.replyText = 'Replied'
      tweet.replied = 'false'
      tweet.repliedText =  $(".tweetlist textarea").eq(index).val()
      twitter.alert({"text":"Action Submitted"})
   }
   $scope.retweet = function(tweet){
    if(tweet.retweet === 'text-selected')
      tweet.retweet = ''
    else
      tweet.retweet = 'text-selected'
    twitter.alert({"text":"Action Submitted"})
   }
   $scope.favorite = function(tweet){
    if(tweet.favorite === 'text-selected')
      tweet.favorite = ''
    else
      tweet.favorite = 'text-selected'
    twitter.alert({"text":"Action Submitted"})
   }
   $scope.more = function(tweet){
    tweet.showMore = !tweet.showMore;
   }

   $( document ).on( "sendTweet",function(event,newTweet){
    $scope.tweets.unshift(newTweet)
   });
  }])
  
  // this is the module for the tweetbox container
  var tweetbox = angular
  .module("tweetbox",[])
  .controller('buildBox',["$scope",function($scope){
   $scope.twitter = twitter
   $scope.tweets = tweets
   $scope.sendTweet = function(){
    var newTweet = {
      'fullname':twitter.FULLNAME,
      'username':twitter.USERNAME,
      'image':twitter.USERIMAGE,
      'tweetBody':$(".tweetbox").val(),
      'timestamp':new Date(),
      'retweets':[],
      'favorites':[]
    }
    $( document ).trigger('sendTweet', newTweet);
    $scope.twitter.currentTweetCount  = $scope.twitter.MAX_TWEET_COUNT
    $scope.twitter.max_tweet_class = ''
    $(".tweetbox").val(" ")
    twitter.alert({"text":"Tweet Submitted"})
    $(".tweetbox").focus()
   }
   
   $scope.down = function(e) {
      var textCount = e.target.value.length 
      var remainingCount = $scope.twitter.MAX_TWEET_COUNT - textCount
      if(remainingCount === 0 ){
        $scope.twitter.currentTweetCount = 0 
        $scope.twitter.max_tweet_class = 'max-tweet'
      }else{
        $scope.twitter.currentTweetCount = remainingCount
        $scope.twitter.max_tweet_class = ''
     }
  }

  }])
})()