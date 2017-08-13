const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./configuration')
const base58 = require('./encodingModule/encodingBase58.js')

const Url = require('./schemas/urlSchema.js')
mongoose.connect('mongodb://' + config.d.host + '/' + config.d.name)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'markups/index.html'))
})

app.get('/:encoded_id', function(req, res){

  const base58Id = req.params.encoded_id
  console.log(base58Id)

  const id = base58.decode(base58Id)

  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.long_url)
    } else {
      res.redirect(config.host)
    }
  })

})

app.post('/api/shorten', function(req, res){
  const longUrl = req.body.url
  let shortUrl = ''

  console.log(req.body)

  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.host + base58.encode(doc._id)

      res.send({'shortUrl': shortUrl})
    } else {

      const newUrl = Url({
        long_url: longUrl
      })

      console.log("newUrl not saved: " + newUrl)

      newUrl.save(function(err) {
        if (err){
          console.log(err)
        }

        console.log("newUrl saved:" + newUrl)

        shortUrl = config.host + base58.encode(newUrl._id)

        console.log("shortUrl: " + shortUrl)

        res.send({'shortUrl': shortUrl})
      })
    }
  })
})

const port = Number(process.env.PORT || 8080)

const server = app.listen(port, () => console.log('Server listening on port 8080'))
