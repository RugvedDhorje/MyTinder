const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// Get user by emailId
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });

// // Get all the users on feed
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });

// // find user by Id and Delete
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted Successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// // Find user by Id and Update
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Updates not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills can't be more than 10");
//     }

//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(user);
//     res.send("user updated Successfully");
//   } catch (err) {
//     res.status(400).send("UPDATE FAILED :" + err.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database Connected Successfully.....");
    app.listen(5000, () => {
      console.log("server connected Successfully");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!");
  });
