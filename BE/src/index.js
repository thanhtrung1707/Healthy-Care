const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')


dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)

.then(() => {
    console.log('Kết nối MongoDB thành công!');
})
.catch((err)=>{
    console.error('Kết nối MongoDB thất bại:', err);
})
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại cổng ${port}`);
})