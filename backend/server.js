const express = require("express");
const app = express()
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
// const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");
// const multer = require("multer");
// const {storage} = require("./cloudConfig.js");
// const upload = multer({ storage });
// const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");
const ruleRoutes = require("./routes/rules");


// --------------------------------------------------------------------


// const dbUrl  = process.env.ATLASDB_URL;


// main()
//     .then(() => {
//         console.log("connected to db")
//     })
//     .catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(dbUrl);
// }

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24 * 3600,
// });


// const sessionOptions = {
//     store,
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true,

//     },
// };


// app.use(session(sessionOptions));
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currUser = req.user;
//     next();
// });


// -------------------------------------------Functions---------------------------------------







// -----------------------------------------------Routes-----------------------------------------




dotenv.config();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rules", ruleRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("http://localhost:5050/"));
})
.catch(err => console.error(err));