import connectDB from "../../../config/db";
import User from "../../../models/User";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  connectDB().catch((error) => res.json({ error: "Connection failed!" }));

  //if post method is accepted
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Form data is required!" });
    }
    //deconstruct form input data needed
    const { name, email, password } = req.body;

    //check duplicate users
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res
        .status(422)
        .json({ message: "User already exist with this email" });
    }

    //create User with hashed password into database
    User.create(
      { name, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) {
          return res.status(404).json({ err });
        }
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res.status(500).json({ message: "Post method not valid" });
  }
}
