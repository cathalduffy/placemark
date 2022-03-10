// unit tests that call the functions saved in models to test application

import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCategories, testPlacemarks, tramore, beaches, mountains, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Placemark Model tests", () => {

  let beachesList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    beachesList = await db.categoryStore.addCategory(beaches);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(beachesList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const mountainsList = await db.categoryStore.addCategory(mountains);
    const placemark = await db.placemarkStore.addPlacemark(mountainsList._id, tramore)
    assert.isNotNull(placemark._id);
    assertSubset (tramore, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(beachesList._id);
    assert.equal(testPlacemarks.length, testPlacemarks.length)
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const mountainsList = await db.categoryStore.addCategory(mountains);
    const placemark = await db.placemarkStore.addPlacemark(mountainsList._id, tramore)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (tramore, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});