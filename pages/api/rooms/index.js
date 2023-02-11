import connectDB from "../../../config/db";
import Room from "../../../models/Room";

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const rooms = await Room.find({});

        res.status(200).json({ success: true, data: rooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
