const multer = require("multer");
const path = require("path");

// destination: function(req, file, cb) { ... } (Dosyalar Nereye Kaydedilecek?)
// Bu fonksiyon, yüklenen dosyaların hangi klasöre kaydedileceğini belirler.

// filename: function(req, file, cb) { ... } (Dosyanın Adı Ne Olacak?)
// Bu fonksiyon, kaydedilen dosyanın adının ne olacağını belirler. Bu, aynı isme sahip dosyaların birbirinin üzerine yazmasını önlemek için hayati öneme sahiptir.

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;