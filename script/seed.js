"use strict";
const {
  db,
  models: { Product },
} = require("../server/db/models");

const products = [
  {
    title: "The submarine",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description:
      "Carl draws inspiration from industrial and historical artifacts, capturing the essence of maritime history through the depiction of a submarine sculpture.",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/art1.jpg",
  },
  {
    title: "The Military Airplane",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A comfortable and stylish outdoor chair",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/art2.jpg",
  },
  {
    title: "Early 20th Century Biplane",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description:
      "Carl pays homage to the early pioneers of aviation with this painting of a brightly colored biplane.",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/art3.jpg",
  },
  {
    title: "Outdoors1",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A replica of a classic biplane",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors1.jpg",
  },
  {
    title: "Outdoors2",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A durable and stylish outdoor fire pit",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors2.jpg",
  },
  {
    title: "Outdoors3",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors3.jpg",
  },
  {
    title: "Faces1",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A replica of a classic biplane",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces1.jpg",
  },
  {
    title: "Faces2",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A durable and stylish outdoor fire pit",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces2.jpg",
  },
  {
    title: "Faces3",
    technique: "Oil on Panel /n 12 x 12 /n Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces3.jpg",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true }); // This will drop the existing tables and re-create them
    await Product.bulkCreate(products);
    console.log("Seeding success!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await db.close();
  }
};

if (require.main === module) {
  seed();
}

module.exports = seed;
