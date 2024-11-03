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
    technique: "Oil on Panel 9 x 12 Available",
    description:
      "The National Museum of the Pacific War in Fredericksburg, Texas has numerous weapons on display inside and on the adjacent grounds.  A submarine conning tower rising from the Texas brush stuck me as funny on the one hand, but the grounds and vegetation are designed to suggest the submarine surfacing through the ocean's surface.  Its a sight few of us will ever see in person and worthy of my attempt to capture it in oil paints.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles1.jpg",
  },
  {
    title: "Swords to Plowshares",
    technique: "Oil on Canvas 8 x 10 Sold",
    description: "The first step to becoming scrap metal.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles2.jpg",
  },
  {
    title: "Curtiss Jenny",
    technique: "Oil on Panel 9 x 12 Available",
    description:
      "Quick study of the color scheme and geometry of this antique biplane.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles3.jpg",
  },
  {
    title: "Scratch one wildcat",
    technique: "Oil on Canvas 8 x 10 Available",
    description:
      "Pilot successfully ditches after the Battle of the Coral Sea.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles4.jpg",
  },
  {
    title: "Contact!",
    technique: "Oil on Canvas 14 x 18 Available",
    description:
      "The ground crew awaits the word to spin the propeller, starting a Curtiss Jenny.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles10.jpg",
  },
  {
    title: "Abandoned for good",
    technique: "Oil on Panel 9 x 12 Available",
    description: "Shimp boats tied to the dock.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles7.jpg",
  },
  {
    title: "B52 Engine Mechanics",
    technique: "Oil on Panel 9 x 12 Available",
    description:
      "What happens to a mighty warrior once the war is over?  Disarmed and stripped for parts, the remains are turned into the tools to rebuild a nation at peace.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles8.jpg",
  },
  {
    title: "Dauntless",
    technique: "Oil on Panel 8 x 10 Available",
    description:
      "Ordinance crew preps a Dauntless for a mission while the pilot looks on. Created from numerous photos in the Navy Archieves.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles14.jpg",
  },
  {
    title: "USS. Oklahoma 8:02am",
    technique: "Oil on Canvas 9 x 12 Available",
    description:
      "Created from researching dozens of photos and using 3D models arranged in the berthing positions around Ford Island. At 8:02am the Oklahoma began to roll as a result of five Japanese torpedo it's to port side. This is my fascination with American military lost battles. I had considered doing Little Big Horn or the Alamo before settling on Pearl Harbor.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles11.jpg",
  },
  {
    title: "Farmer and pilots",
    technique: "Oil on Canvas 16 x 20 Available",
    description:
      "An air cadet lands her PT-19 in a farmer's field. Her instructor gets directions from the farmer.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles12.jpg",
  },
  {
    title: "Thumbs Up",
    technique: "Oil on Panel 12 x 18 Available",
    description:
      "Created from researching dozens of photographs in the NASA archives.  The Apollo 12 crew safe and sound after a trip around the moon. The USS Hornet awaits their return.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles15.jpg",
  },
  {
    title: "Charlott's Girl",
    technique: "Oil on Canvas 8 x 10 Available",
    description:
      "One of the many Model T's and other cars from the 1920s that are lovingly kept in running condition at the Pioneer Flight Museum by the volunteer staff.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles16.jpg",
  },
  {
    title: "Overdue",
    technique: "Oil on Panel 9 x 12 Sold",
    description:
      "A yacht owned by an acquaintance.  The elderly couple enjoy sailing up and down the west coast at their leisure. This will be their Christmas gift. Painted from a photograph.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles17.jpg",
  },
  {
    title: "Grand Prix",
    technique: "Oil on Canvas 9 x 12 Sold",
    description: "Painted from photographic references.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/Grand_prix.jpg",
  },
  {
    title: "Time to escape",
    technique: "Oil on Canvas 8 x 10 Sold",
    description: "Illustration for a book.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/Time_to_escape.jpg",
  },
  {
    title: "Rescued",
    technique: "Oil on Board 6 x 10 Available",
    description:
      "Abandoned on a beach behind a storage warehouse these two life boats enjoy retirement under palm trees.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/Rescued.jpg",
  },
  {
    title: "Saturday morning ritual",
    technique: "Oil on Canvas 8 x 10 Available",
    description:
      "The refreshing Saturday morning bagel & coffee after two hours kayaking on Lady Bird Lake in downtown Austin.",
    subcategory: "Vehicles",
    imageUrl: "/arts/vehicles/vehicles19.jpg",
  },
  {
    title: "Homage to John Singer Sargent",
    technique: "Oil on Canvas 9 x 12 Sold",
    description:
      "A painting inspired by 1800s architecture in Fredericksburg, Texas and a painting done by John Singer Sergent in Capri.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Homage_to_john_singer_sargent.jpg",
  },
  {
    title: "Fall at Bull Creek",
    technique: "Oil on Canvas 9 x 12 Available",
    description:
      "An on site pallet knife effort of a local creek and the leaves drifting in the current.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Fall_at_bull_creek.jpg",
  },
  {
    title: "Mission San Antonio",
    technique: "Oil on Panel 9 x 12 Available",
    description: "Mission San Antonio in San Antonio",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/outdoors3.jpg",
  },
  {
    title: "Mission Conception",
    technique: "Oil on Canvas 9 x 12 Available",
    description: "Mission Conception in San Antonio",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Mission_conception.jpg",
  },

  {
    title: "Outdoors6",
    technique: "Oil on Panel 12 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/JengaBuildingAustin.jpg",
  },
  {
    title: "Fire Engine #3",
    technique: "Oil on Panel Board 8 x 10 Sold",
    description: "An on site painting of an Austin firehouse",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/firehouse.jpg",
  },
  {
    title: "Anna's Chucks",
    technique: "Oil on Canvas 9 x 12 Sold",
    description:
      "An on site painting of a pair of wet Chuck Taylor tennis shoes, drying on the front pourch.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Chucks.jpg",
  },

  {
    title: "The House Painter",
    technique: "Oil on Panel Board 8 x 8 Available",
    description: "This is a study in green and blue",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/The_house_painter.png",
  },
  {
    title: "Church portico at sunrise",
    technique: "Oil on Panel Board 9 x 12 Available",
    description: "Galveston Island catholic church.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Church_portico_at_sunrise.jpg",
  },
  {
    title: "San Marcos pub",
    technique: "Oil on Canvas 9 x 12 Available",
    description: "On site painting of a side street in downtown San Marcos.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/San_marcos_pub.jpg",
  },
  {
    title: "Store front nocturn",
    technique: "Oil on Canvas 8 x 10 Sold",
    description: "Tourists pass by a Galveston gallery late one evening.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Store_front_nocturn.jpg",
  },
  {
    title: "Mule Ears",
    technique: "Oil on Canvas 12 x 16 Available",
    description:
      "Created from photo reference gathered while camping in Big Bend National Park.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Mule_ears.jpg",
  },
  {
    title: "Corpus Christi Gazebo",
    technique: "Oil on Canvas 8 x 10 Available",
    description:
      "Painted on-site and revised using photographic reference. A man readies his rod and reel for his afternoon fishing.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Corpus_christi_gazebo.jpg",
  },
  {
    title: "Breakfast Taco",
    technique: "Oil on Canvas 8 x 10 Available",
    description:
      "On-site painting of a food truck on IH 35, San Marcos, Texas.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Breakfast_taco.jpg",
  },
  {
    title: "Master copy",
    technique: "Oil on Canvas 12 x 16 Available",
    description: "Master copy of 1883 painting of Egyptian ruins.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Master_copy.jpg",
  },
  {
    title: "Kerrville restaurant",
    technique: "Oil on Canvas 9 x 12 Available",
    description:
      "The most unique looking Mexican restaurant in Kerrville, Texas.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Kerrville_restaurant.jpg",
  },
  {
    title: "Driving range nocturn",
    technique: "Oil on Canvas 12 x 16 Available",
    description: "A quiet night at the driving range.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Driving_range_nocturn.jpg",
  },
  {
    title: "Hole in the wall",
    technique: "Oil on Board 8 x 10 Available",
    description:
      "The marquee of a local college hangout near the University of Texas, Austin.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Hole_in_the_wall.jpg",
  },
  {
    title: "Paramount Theater nocturn",
    technique: "Oil on Canvas 14 x 20 Available",
    description: "Showtime at an Austin landmark",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Paramount_theater_nocturn.jpg",
  },
  {
    title: "Tennis Court Nocturn",
    technique: "Oil on Canvas 8 x 10 Available",
    description: "Painted on site at a local tennis court.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Tennis_court_nocturn.jpg",
  },
  {
    title: "Target Practice",
    technique: "Oil on Canvas 9 x 12 Available",
    description:
      "Hunters site in their scopes at the range before their hunting trip. Painted on location in New Mexico and adjusted using photographic reference.",
    subcategory: "Outdoors",
    imageUrl: "/arts/outdoors/Target_practice.jpg",
  },
  {
    title: "Perry",
    technique: "Oil on Panel Board 9 x 12 Sold",
    description:
      "A painting inspired by the 2024 summer Olympics using photographs for reference.",
    subcategory: "Faces",
    imageUrl: "/arts/faces/Perry.jpg",
  },
  {
    title: "En guard",
    technique: "Oil on Panel Board 9 x 12 Available",
    description:
      "Action inspired by the 2024 Summer Olympic games using photographs as reference.",
    subcategory: "Faces",
    imageUrl: "/arts/faces/En_guard.jpg",
  },
  {
    title: "Pretty girl in Cusco",
    technique: "Oil on Canvas 8 x 8 Sold",
    description: "A painting done using photographic reference.",
    subcategory: "Faces",
    imageUrl: "/arts/faces/Beautiful_in_cusco.jpg",
  },
  {
    title: "Gabriela The Nurse during Covid",
    technique: "Oil on Panel 9 x 12 Sold",
    description: "A replica of a classic biplane",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces1.jpg",
  },
  {
    title: "Faces2",
    technique: "Oil on Panel 9 x 12 Sold",
    description: "A durable and stylish outdoor fire pit",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces2.jpg",
  },
  {
    title: "Faces3",
    technique: "Oil on Panel 9 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces3.jpg",
  },
  {
    title: "Doctor Cory during Covid",
    technique: "Oil on Panel 12 x 16 Sold",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces4.jpg",
  },
  {
    title: "Faces5",
    technique: "Oil on Panel 9 x 12 Available",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces5.jpg",
  },
  {
    title: "Cousin Liam The Roller Girl",
    technique: "Oil on Panel 10 x 10 Sold",
    description: "A detailed portrait of a woman",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces6.jpg",
  },
  {
    title: "Game Night at Jeff House",
    technique: "Oil on Panel 13 x 36 Sold",
    description: "Game Night",
    subcategory: "Faces",
    imageUrl: "/arts/faces/faces7.jpg",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true }); // This will drop the existing tables and re-create them
    await Product.bulkCreate(products);
    const hashedPassword = await bcrypt.hash("Rocketman2019*", 10);
    await User.create({
      email: "carlcanga58@gmail.com",
      password: hashedPassword, // In a real application, hash the password before storing
      isAdmin: true,
    });
    // Create initial email settings
    await Mail.create({
      email: process.env.GMAIL_EMAIL,
      password: process.env.GMAIL_PASSWORD,
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
