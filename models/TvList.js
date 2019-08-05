const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvlistSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  programe: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  programe_description: {
    type: String
  },
  programe_category: {
    type: String
  },
  start: Date,
  end: Date,
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const TvList = mongoose.model("TvList", tvlistSchema);

module.exports = TvList;
