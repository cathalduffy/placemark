import { db } from "../models/db.js";

export const placemarkController = {
    index: {
        handler: async function (request, h) {
            const placemarks = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
              title: "Placemark",
              placemarks: placemarks,
            };
     return h.view("about-placemark-view", viewData);
      },
    },
  };
