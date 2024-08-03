const { MongoClient } = require('mongodb');

async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
  const username = 'findr'
  const password = 'gaypride'
  const clusterUrl = 'findr'
  const uri = `mongodb+srv://${username}:${password}@${clusterUrl}.fshrp6s.mongodb.net/?retryWrites=true&w=majority&appName=findr`;

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = "findr";
  const collectionName = "users";

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const planets = [
    { 
        name: 'Celestara', 
        img: 'images/planet0.png', 
        info: 'Celestara is a captivating planet known for its ethereal beauty and serene environment. It lies within a distant star system, orbited by three moons that create a mesmerizing celestial dance in its night sky.', 
        humidity: '60%', 
        temperature: '18°C', 
        population: '2.2 billion', 
        funFact: 'Known for its serene beauty.' 
    },
    { 
        name: 'Aetherion', 
        img: 'images/planet1.png', 
        info: 'Aetherion has multicolored clouds and a vast ring system composed of shimmering ice crystals. Its atmosphere is rich in exotic gases, creating dazzling auroras that dance across the sky, visible even from its numerous, diverse moons.', 
        humidity: '70%', 
        temperature: '25°C', 
        population: '17 million', 
        funFact: 'Home to dazzling auroras.' 
    },
    { 
        name: 'Nebularis', 
        img: 'images/planet2.png', 
        info: 'Nebularis is a mysterious planet shrouded in dense, colorful nebulae, giving it an ever-shifting, cosmic appearance. Its surface, covered in dark, crystalline minerals, reflects the nebulae’s light. Currently uninhabited.', 
        humidity: '90%', 
        temperature: '12°C', 
        population: '0', 
        funFact: 'Covered in dark, crystalline minerals.' 
    },
    { 
        name: 'Stellarion', 
        img: 'images/planet3.png', 
        info: 'Often called the Red Planet due to its reddish appearance.', 
        humidity: '30%', 
        temperature: '20°C', 
        population: '1.1 billion', 
        funFact: 'Known as the Red Planet.' 
    },
    { 
        name: 'Cat Girl Planet', 
        img: 'images/planet7.png', 
        info: 'The largest planet in our solar system. Known for its Great Red Spot.', 
        humidity: '40%', 
        temperature: '22°C', 
        population: '5 billion', 
        funFact: 'Known for its Great Red Spot.' 
    },
    { 
        name: 'Luminara', 
        img: 'images/planet10.png', 
        info: 'Famous for its stunning ring system.', 
        humidity: '55%', 
        temperature: '15°C', 
        population: '3.3 billion', 
        funFact: 'Has a stunning ring system.' 
    },
    { 
        name: 'Planet Evan', 
        img: 'images/evanplanet.png', 
        info: 'Evan.', 
        humidity: '50%', 
        temperature: '16°C', 
        population: '1 million', 
        funFact: 'Named after its discoverer, Evan.' 
    },
    { 
        name: 'Gambit', 
        img: 'images/Gambit.png', 
        info: 'Hes him', 
        humidity: '45%', 
        temperature: '19°C', 
        population: '2.5 million', 
        funFact: 'Home to strategic thinkers.' 
    },
    { 
        name: 'ChatGpt', 
        img: 'images/Chatgpt.png', 
        info: 'Our saviour', 
        humidity: '60%', 
        temperature: '21°C', 
        population: '8 billion', 
        funFact: 'Known for its advanced AI.' 
    },
    { 
        name: 'Diddy Planet', 
        img: 'images/Diddy.png', 
        info: 'Named after the American rapper, record producer, and record executive, P Diddy', 
        humidity: '65%', 
        temperature: '23°C', 
        population: '4 billion', 
        funFact: 'Named after P Diddy.' 
    },
    { 
        name: 'Cooked Planet', 
        img: 'images/Cooked.png', 
        info: 'Lava planet where villain arcs begin. It’s literally cooked', 
        humidity: '5%', 
        temperature: '1500°C', 
        population: 'Uninhabited', 
        funFact: 'Surface temperatures can melt metal.' 
    }
];

  try {
    const insertManyResult = await collection.insertMany(planets);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

//   const findQuery = { prepTimeInMinutes: { $lt: 45 } };

//   try {
//     const cursor = await collection.find(findQuery).sort({ name: 1 });
//     await cursor.forEach(recipe => {
//       console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
//     });
//     // add a linebreak
//     console.log();
//   } catch (err) {
//     console.error(`Something went wrong trying to find the documents: ${err}\n`);
//   }
}

run();