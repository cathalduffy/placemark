// Contains the functions used to read/update data in Mongo for placemarks

import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByCategoryId(id) {
    console.log(`method ${  id}`)
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    console.log(placemarks)
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
    await placemark.save();
  },

  async placemark(name, latitude, longitude, description) {
    const newPlacemark = new Placemark({
      name,
      latitude,
      longitude,
      // donor: donor._id,
      category: category._id,
    });
    await newPlacemark.save();
    return newPlacemark;
  },
};
