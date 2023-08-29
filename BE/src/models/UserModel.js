const mongose = require('mongoose')
const userSchema = new mongose.Schema(
    {
        name: { type: String},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        isAdmin: { type: Boolean, default:false,required: true},
        phone: { type: Number},
        address: { type: String},
        avatar: { type: String},
        city: {type: String},
    },
    {
        timestamps: true
    }
);
const User = mongose.model("User",userSchema);
module.exports = User;