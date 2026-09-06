const dotenv = require("dotenv")
dotenv.config();

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const tripRoutes = require("./routes/trip.routes")
const stopRoutes = require("./routes/stop.routes")
const activityRoutes = require("./routes/activity.routes")
const expenseRoutes = require("./routes/expense.route");
const placeRoutes = require("./routes/place.routes");
const errorMiddleware = require("./middleware/error.middleware");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/places", placeRoutes);

app.get("/api/health", (req,res)=>{
  res.status(200).json({
    success: true,
    message: "YatraFlow backend is running",
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`YatraFlow server running on port ${PORT}`)
})