const  nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');


const sendEmailCreateOrder = async(email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD  // generated ethereal password
        }
    });
    transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>Bạn đã đặt sản phẩm: <b style="color: red;">${order.name}</b><br>Số lượng : <b style="color: red;">${order.amount}</b><br>Giá: <b style="color: red;">${order.price} VNĐ</b></div>
        <div>Hình ảnh sản phẩm</div>
        </div>`
        attachImage.push({path: order.image})
    })
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Bạn đã đặt hàng tại 2T Shop", // Subject line
        text: "Hello world?", // plain text body
        html: `<div style="color: red;"><b>Bạn đã đặt hàng thành công </b></div>${listItem}`,
        attachments: attachImage, // html body
      });
}

module.exports = {
    sendEmailCreateOrder
}