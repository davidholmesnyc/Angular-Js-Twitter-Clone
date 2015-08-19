 
(function(){
  var twitter = twitter || {} // create a name space for our app that way we don't pollute the global space 
  twitter.tweets = []
  // constant values 
  twitter.MAX_TWEET_COUNT = 140
  twitter.MAX_TWEETS = 10
  twitter.FULLNAME = 'David Holmes NYC'
  twitter.USERNAME = 'davidholmesnyc'
  twitter.USERIMAGE = 'http://davidholmesnyc.com/headshot.png'
  twitter.FAKE_PROFILE_IMAGE = 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
  
  // functions 

  // handler for alerts  example  twitter.alert({text:"Test Alert"})
  twitter.alert = function(object){
    var dom = '.alert'
    var closeAlert = $(dom).on("click",".close",function(){
      return $(dom).hide()
    })
    $(dom).find(".text").html(object.text)
    return $(dom).show()
  }

  //generate fakeretweets  example twitter.enerateFakeRetweets() 
  twitter.generateFakeReTweets = function(){
      var retweets = []
      var favorites = []
      for (var b = chance.integer({min: 1, max: 20}) - 1; b >= 0; b--) {
        retweets.push({username:chance.name(),image:twitter.FAKE_PROFILE_IMAGE})
        favorites.push({username:chance.name(),image:twitter.FAKE_PROFILE_IMAGE})
      }
      return [retweets,favorites]
  }
  //generate fake tweets twitter.generateFakeTweets()
  twitter.generateFakeTweets = function(object){
      var tweets = []
      twitter.tweets = []
      for (var i = twitter.MAX_TWEETS - 1; i >= 0; i--) {
        var retweets  = twitter.generateFakeReTweets()
        var tweet = {
          'fullname':chance.name(),
          'image':twitter.FAKE_PROFILE_IMAGE,
          'username':chance.first(),
          'tweetBody':chance.sentence(),
          'retweetCount':retweets[0].length,
          'favoritesCount':retweets[1].slice(3).length,
          'timestamp':chance.date(),
          'retweets':retweets[0],
          'favorites':retweets[1].slice(3)
        }
        twitter.tweets.push(tweet)
      };
      return twitter.tweets
    }

    window.twitter = twitter

    twitter.alert({text:"This Demo Twitter Clone is written in Angular.JS and created by <a href='//www.davidholmesnyc.com'>David Holmes NYC</a> "})


  })()