import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import Weather from "../utils/weather.js"

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      const placemarkId = request.params.id
      console.log(`test placemarkid${  request.params.id}`)
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
        const latitude = placemark.latitude;
        const longitude = placemark.longitude;
        const readWeather = await Weather.readWeather(latitude, longitude);
        console.log(readWeather);
        const weather = {
          name: readWeather.name,
          latitude: readWeather.coord.lat,
          longitude: readWeather.coord.lon,
          temperature: Math.round(readWeather.main.temp - 273.15),
          feelsLike: Math.round(readWeather.main.feels_like - 273.15),
          clouds: readWeather.weather[0].description,
          windSpeed: readWeather.wind.speed,
          windDirection: readWeather.wind.deg,
          visibility: readWeather.visibility / 1000,
          humidity: readWeather.main.humidity,
        };
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return weather;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemark(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
  },

  findByCat: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const categoryId = request.params.id
      console.log(`test${  request.params.id}`)
      try {
        const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(categoryId);
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
