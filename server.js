if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const IP = "127.0.0.1";
const PORT = 3000;
const fs = require("fs");
const multer = require('multer');


const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');

app.use(express.static(__dirname + "/public"));
app.use("/data", express.static(__dirname + "/data"));

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);

    }
});

const upload = multer({ storage: storage }).array('files', 12);

app.post('/upload', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.send("Something gone wrong");
        }
        res.send("Upload Complete");
    })
});

// Rutes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {
        name: req.user.name,
        pageTitle: 'home page', quizdata: quizzes
    });
});
app.get('/contact', (req, res) => {
    res.render('contact.ejs', { pageTitle: 'contact' });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});
app.get('/allgemeinwissenstest', (req, res) => {
    res.render('quizpage.ejs', {
        pageTitle: 'quiz',
        query: req.query.name, quizdata: quizzes
    });
});

app.get('/fileup', (req, res) => {
    res.render('fileup.ejs');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true

}));


app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});
// End Rutes

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        // console.log(users);
        res.redirect('/login');

    } catch {
        res.redirect('/register');

    };

});



app.delete('/logout', (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');

}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();

}

// -------------------------------------
const quizFileDir = fs
    .readdirSync("./data")
    .filter((name) => name.endsWith(".js"));

const quizzes = [];

for (const file of quizFileDir) {
    const quizFile = require(`./data/${file}`);
    quizzes.push({
        title: quizFile.quizData.title,
        slug: file.replace(".js", ""),
        quizDaten: quizFile.questions
    });
}

// ----------------------------------------

app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));





