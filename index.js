require('dotenv').config()

import Twit from 'twit-promise'

const genString = () => {
  let eyes = ""
  let heyches = ""

  // Maximum of 15 occurances
  let hOcc = Math.ceil(Math.random() * 15)
  let iOcc = Math.ceil(Math.random() * 15)

  for(let i = 0; i < hOcc; i++) { heyches += "h" }
  for(let i = 0; i < iOcc; i++) { eyes += "i" }

  let s = `O${heyches} sh${eyes}t`

  // 20% chance of SCREAMING
  return Math.random() > .2 ? s : s.toUpperCase()
}

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

// An array of the topics/keywords we want to track
const topics = [
  'Trump',
]

const users = [
  "_dte",
  "nytimes",
  "qz",
  "bbcbreaking",
  "washingtonpost",
  "cnn",
  "cnnbrk",
]

const stream = T.stream('statuses/filter', {
  track: topics,
  follow: users,
})

stream.on('tweet', tweet => {
  const status = `https://twitter.com/${name}/status/${tweet.id_str}`
  const commentary = genString()

  T.post('statuses/update', {status: [commentary, status].join('\n')})
    .then( function(result) {
      console.log(result.data)
      console.log(result.response.statusCode)
    })
})