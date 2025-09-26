// express
const express = require("express");
const app = express();


const cookieParser = require('cookie-parser'); // Tarayıcıdaki çerezleri (cookie) okumak için
const session = require('express-session'); // Kullanıcı oturumlarını (session) yönetmek için
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Oturumları veritabanında saklamak için
const csurf = require("csurf"); // CSRF ataklarına karşı güvenlik sağlamak için

// node modules
const path = require("path");

// routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// custom modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");
const log = require("./middlewares/log");
const error = require("./middlewares/error-handling");

// template engine
app.set("view engine", "ejs");

// models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const Role = require("./models/role");

// middleware
app.use(express.urlencoded({ extended: true }));// Kullanıcının HTML formları (<form>) aracılığıyla gönderdiği verileri
//  (örneğin, bir kayıt formundaki kullanıcı adı ve şifre) sunucunun okuyup anlayabilmesini sağlar.
app.use(cookieParser());// Tarayıcının sunucuya gönderdiği küçük bilgi parçacıkları olan çerezleri (cookie) okur. 
// Bu, bir sonraki adım olan session (oturum) yönetimi için bir ön hazırlıktır.
app.use(session({ //Kullanıcı için sunucu tarafında bir "oturum" başlatır, bu oturum bilgilerini saklar ve tarayıcıya bu oturuma ait bir kimlik (cookie olarak) gönderir.
    secret: "hello world",//Size verilen giriş kartının kopyalanamaması için kullanılan gizli bir mühür veya imza gibidir. Bu sayede sahte kartlar yapılamaz.
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: new SequelizeStore({
        db: sequelize//: Bu en kritik ayarlardan biridir. Etkinlik görevlisinin, sizin kayıt bilgilerinizi geçici bir not kağıdına (sunucunun hafızası) değil, 
        // şirketin ana bilgisayarındaki kalıcı kayıt sistemine (veritabanı) işlemesini sağlar. Bu sayede, görevli değişse 
        // veya elektrikler kesilse (sunucu yeniden başlasa) bile sizin kayıtlarınız kaybolmaz.
    })
}));

app.use(locals);
app.use(csurf());

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes); 
app.use("*", (req, res) => {
    res.status(404).render("error/404", { title: "not found "});
});
app.use(log);
app.use(error);

Blog.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
});
User.hasMany(Blog);

Blog.belongsToMany(Category, { through: "blogCategories"});
Category.belongsToMany(Blog, { through: "blogCategories"});

Role.belongsToMany(User, {through: "userRoles"});
User.belongsToMany(Role, {through: "userRoles"});

(async () => {
    // await sequelize.sync({ force: true });
    // await dummyData();
})();

app.listen(3000, function() {
    console.log("listening on port 3000");
});