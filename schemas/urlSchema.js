const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

const counter = mongoose.model('counter', CounterSchema);

const url_schema = Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});

url_schema.pre('save', function(next){
  const doc = this;
  console.log("Pre save start: " + doc)
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      doc.created_at = new Date();
      doc._id = counter.seq;
      console.log("Pre save end: " + doc)
      next();
  });
});

module.exports = mongoose.model('Url', url_schema);
