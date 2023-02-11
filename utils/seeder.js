const Room = require("../models/Room");
const mongoose = require("mongoose");
const rooms = require("../data/rooms");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://anthony:admin123@cluster0.kzgwkex.mongodb.net/bookit?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All rooms are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
