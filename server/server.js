const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require('./helper/jwt');

app.use(cors());
app.options("*", cors());

// middleware
// app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());

// Routes
const categoryRoutes = require('./routes/categories')
const productRoutes = require('./routes/products')
const imageUploadRoutes = require('./routes/imageUpload')
const userRoutes = require('./routes/user');
const productReviewsRouter  = require('./routes/productReviews');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const whishListRoutes = require('./routes/whishList');
const searchRoutes = require('./routes/search');
// stripe
const stripeRoutes = require('./routes/stripe');


app.use("/uploads",express.static("uploads"))
app.use(`/api/category`, categoryRoutes)
app.use(`/api/products`, productRoutes)
app.use(`/api/imageUpload`, imageUploadRoutes)
app.use(`/api/user`, userRoutes);
app.use(`/api/reviews`, productReviewsRouter)
app.use(`/api/cart`, cartRoutes);
app.use(`/api/my-list`, whishListRoutes);
app.use(`/api/orders`, ordersRoutes)
app.use(`/api/stripe`, stripeRoutes)
app.use(`/api/search`, searchRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connection is ready...')
  // Server
app.listen(process.env.PORT, ()=> {
  console.log(`Server is running at https://localhost:${process.env.PORT}`)
})
}).catch((err) => {
  console.log(err)
})