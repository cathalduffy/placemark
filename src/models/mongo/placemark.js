import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  description: String,
  amenitiesRating: Number,
  foodRating: Number,
  cleanlinessRating: Number,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
