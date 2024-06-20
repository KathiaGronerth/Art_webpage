"use strict";
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  db,
  models: { Product, User, Mail },
} = require("../server/db/models");

const products = [
  {
    title: "The submarine",
    technique: "Oil on Panel 12 x 12 Available",
    description:
      "Carl draws inspiration from industrial and historical artifacts, capturing the essence of maritime history through the depiction of a submarine sculpture.",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/airplanes1.jpg",
  },
  {
    title: "The Military Airplane",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A comfortable and stylish outdoor chair",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/airplanes2.jpg",
  },
  {
    title: "Early 20th Century Biplane",
    technique: "Oil on Panel 12 x 12 Available",
    description:
      "Carl pays homage to the early pioneers of aviation with this painting of a brightly colored biplane.",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/airplanes3.jpg",
  },
  {
    title: "Early 20th Century Biplane",
    technique: "Oil on Panel 12 x 12 Available",
    description:
      "Carl pays homage to the early pioneers of aviation with this painting of a brightly colored biplane.",
    subcategory: "Airplanes",
    imageUrl: "/arts/airplanes/airplanes4.jpg",
  },
  {
    title: "Outdoors1",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A replica of a classic biplane",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors1.jpg",
  },
  {
    title: "Outdoors2",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A durable and stylish outdoor fire pit",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors2.jpg",
  },
  {
    title: "Outdoors3",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors3.jpg",
  },
  {
    title: "Outdoors4",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors4.jpg",
  },
  {
    title: "Outdoors5",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors5.jpg",
  },
  {
    title: "Outdoors6",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/JengaBuildingAustin.jpg",
  },
  {
    title: "Outdoors7",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/firehouse.jpg",
  },
  {
    title: "Outdoors8",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Chucks.jpg",
  },
  {
    title: "Outdoors9",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors5.jpg",
  },
  {
    title: "Outdoors9",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/BigSur.jpg",
  },
  {
    title: "Faces1",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A replica of a classic biplane",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces1.jpg",
  },
  {
    title: "Faces2",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A durable and stylish outdoor fire pit",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces2.jpg",
  },
  {
    title: "Faces3",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces3.jpg",
  },
  {
    title: "Faces4",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces4.jpg",
  },
  {
    title: "Faces5",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces5.jpg",
  },
  {
    title: "Faces6",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces6.jpg",
  },
  {
    title: "Faces7",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces7.jpg",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true }); // This will drop the existing tables and re-create them
    await Product.bulkCreate(products);
    const hashedPassword = await bcrypt.hash("Rocketman1!", 10);
    await User.create({
      email: "carl.canga@outlook.com",
      password: hashedPassword, // In a real application, hash the password before storing
      isAdmin: true,
    });
    // Create initial email settings
    await Mail.create({
      email: process.env.OUTLOOK_EMAIL,
      password: process.env.OUTLOOK_PASSWORD,
    });
    console.log("Seeding success!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    if (process.env.NODE_ENV === "production") {
      await db.close(); // Only close the connection in non -production
    }
  }
};

if (require.main === module) {
  seed();
}

module.exports = seed;
