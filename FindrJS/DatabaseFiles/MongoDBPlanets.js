import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Define the Planet schema
const planetSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    info: { type: String, required: true },
    humidity: { type: String, required: true },
    temperature: { type: String, required: true },
    population: { type: String, required: true },
    funFact: { type: String, required: true }
});

// Create the Planet model
const Planet = model('Planet', planetSchema);

// Export the Planet model
export default Planet;
