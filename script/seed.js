"use strict";
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  db,
  models: { Product, User, Mail },
} = require("../server/db/models");

const products = [
  {
    title: "Submarine Exhibit",
    technique: "Oil on Panel 9 x 12",
    description:
      "The National Museum of the Pacific War in Fredericksburg, Texas has numerous weapons on display inside and on the adjacent grounds.  A submarine conning tower rising from the Texas brush stuck me as funny on the one hand, but the grounds and vegetation are designed to suggest the submarine surfacing through the ocean's surface.  Its a sight few of us will ever see in person and worthy of my attempt to capture it in oil paints.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles1.jpg",
  },
  {
    title: " Aircraft Mechanics",
    technique: "Oil on Panel 9 x 12",
    description:
      "From a photo provided by a B-52 crew chief responsible for engine maintenance in Barksdale AFB.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles2.jpg",
  },
  {
    title: "Curtiss Jenny",
    technique: "Oil on Panel 9 x 12",
    description:
      "Quick study of the color scheme and geometry of this antique biplane.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles3.jpg",
  },
  {
    title: "Early 20th Century Biplane",
    technique: "Oil on Panel 12 x 12 Available",
    description:
      "Carl pays homage to the early pioneers of aviation with this painting of a brightly colored biplane.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles4.jpg",
  },
  {
    title: "Roll Out ",
    technique: "Oil on canval 8 x 10",
    description: "Moving the triplane to the flight line.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles5.jpg",
  },
  {
    title: "Rescued Boats",
    technique: "Oil on Panel 8 x 14",
    description:
      "Two retired rescue boats rest on a lonely beach in Galveston, Texas. Long ago, these were regarded as extremely  for the ship's crew.  Now, they are a forgotten after thought baking in the Texas sun.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles6.jpg",
  },
  {
    title: "Shrimp Boats",
    technique: "Oil on Panel 9 x 12",
    description: "Shimp boats tied to the dock.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles7.jpg",
  },
  {
    title: "Swords to Plowshares",
    technique: "Oil on Panel 9 x 12",
    description:
      "What happens to a mighty warrior once the war is over?  Disarmed and stripped for parts, the remains are turned into the tools to rebuild a nation at peace.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles8.jpg",
  },
  {
    title: "Grounded",
    technique: "Oil on Canvas 8 x 10",
    description:
      "Driving past an airpark recently, I saw this classic twin tail plane abandoned in a back yard.  There is a certain beauty in something that once flew like a bird and is now grounded slowly submitting to encroaching  weeds.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles9.jpg",
  },
  {
    title: "Dauntless",
    technique: "Oil on Panel 10 x 10",
    description:
      "Ordinance crew preps a Dauntless for a mission while the pilot looks on. Created from numerous photos in the Navy Archieves.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles10.jpg",
  },
  {
    title: "Contact",
    technique: "Oil on Canvas 12 x 18",
    description:
      "The Pioneer Flight museum has vintage planes and re-enactors performing the duties of pilot and propeller puller.  Created from various photos I took at the annual fly-ins.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles11.jpg",
  },
  {
    title: "USS Oklahoma 8:02am",
    technique: "Oil on Canvas 12 x 18",
    description:
      "Created from researching dozens of photos and using 3D models arranged in the berthing positions around Ford Island.  At 8:02am the Oklahoma began to roll as a result of five Japanese torpedo it's to port side.  This is my fascination with American military lost battles.  I had considered doing Little Big Horn or the Alamo before settling on Pearl Harbor.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles12.jpg",
  },
  {
    title: "Flight Training",
    technique: "Oil on Canvas 12 x 18",
    description:
      "An acquaintance owns a PT-19 and allowed me to photograph it using models dressed in period costumes.  This is my early attempt at do an illustration like Norman Rockwell.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles13.jpg",
  },
  {
    title: "Roll Out",
    technique: "Oil on Canvas 8 x 10",
    description:
      "A team of volunteers move the Triplane they to the runway for first flight.  It took them a decade to build under the watchful eye of an expert vintage plane restorer.  It flew perfectly and still does.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles14.jpg",
  },
  {
    title: "Thumbs Up",
    technique: "Oil on Panel 12 x 18",
    description:
      "Created from researching dozens of photographs in the NASA archives.  The Apollo 12 crew safe and sound after a trip around the moon. The USS Hornet awaits their return.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles15.jpg",
  },
  {
    title: "Charlott's Girl",
    technique: "Oil on Canvas 8 x 10",
    description:
      "One of the many Model T's and other cars from the 1920s that are lovingly kept in running condition at the Pioneer Flight Museum by the volunteer staff.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles16.jpg",
  },
  {
    title: "Overdue",
    technique: "Oil on Panel 9 x 12",
    description:
      "A yacht owned by an acquaintance.  The elderly couple enjoy sailing up and down the west coast at their leisure. This will be their Christmas gift. Painted from a photograph.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles17.jpg",
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
    if (process.env.NODE_ENV !== "production") {
      await db.close(); // Only close the connection in non -production
    }
  }
};

if (require.main === module) {
  seed();
}

module.exports = seed;
