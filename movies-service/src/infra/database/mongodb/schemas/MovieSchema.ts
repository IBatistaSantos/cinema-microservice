
import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    name: String,
    sinopsis: String,
    duration: Number,
    release_date: Date,
    categories: [String],
  },
  {
    timestamps: true
  }
);

const MovieSchema =  mongoose.model('Movie', movieSchema);

export {MovieSchema}