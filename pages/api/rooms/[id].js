import connectDB from "../../../config/db";
import Room from "../../../models/Room";

connectDB();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const room = await Room.findById(id);

        if (!room) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: room });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
