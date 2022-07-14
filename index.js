const express = require('express')
const app = express()
const { check, body, validationResult } = require('express-validator');
const { masukJSON, namaData, addContact, namaValid } = require('./utils/data')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')


//! belajar mengenai view engine
//! view engine adalah template yang ada pada express js
//! pada kali ini kita beljar template engine ejs

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.get('/', (req, res,) => {
    res.render('index', {
        judul: 'web index',
    })
})
app.get('/jajal/:id?', (req, res) => {
    res.send(` 
    ini adalah params ke :${req.params.id} yang memiliki query ${req.query.p}`)
})
app.get('/mahasiswa', (req, res) => {
    const mhs = [{
        nama: 'fahri',
        kelas: '12',
        umur: '19',
        jurusan: 'multimedia'


    }, {
        nama: 'iyan',
        kelas: '12',
        umur: '19',
        jurusan: 'multimedia'


    }, {
        nama: 'rian',
        kelas: '12',
        umur: '19',
        jurusan: 'multimedia'


    }]

    res.render('mahasiswa', { mhs, judul: 'web mahasiswa' })

})
app.get('/contact', (req, res) => {
    //!menampilkan data yang ada di json dengan memangil function masuk json
    const contacts = masukJSON()
    res.render('contact', {
        judul: 'web contact',
        contacts,
        flash: req.flash('msg')
    })

})
app.get('/contact/add', (req, res) => {
    res.render('add_kontak', {
        judul: 'web add'
    })
})

app.get('/contact/:nama', (req, res) => {
    const contacts = namaData(req.params.nama)
    res.render('detail', {
        judul: 'web detail',
        contacts,
    })
})
//! untuk express-validator cari di docs custom error massege dan dan custom validotr orsanitazer
//! cara kerja method post
app.post('/contact', [
    body('nama').custom((value) => {
        const custom = namaValid(value)
        if (custom) {
            throw new Error('nama suadah digunakan')
        }
        return true
    }),
    check('email', 'nomor email tidak valid').isEmail(),
    check('noHP', 'nomor hp tidak valid').isMobilePhone("id-ID")], (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('add_kontak', {
                judul: 'web add',
                errors: errors.array()
            })
        }
        //! ini akan di esekusi dan mengubah file json
        addContact(req.body)
        req.flash('msg', 'data anda telah di tambahkan')
        //! lalu file json akan kita lempar kek get dan di eskusi seperti biasa
        res.redirect('/contact')
    })

app.get('/index', (req, res) => {
    res.render('index', {
        judul: 'web index',
    })

})

app.use('/', (req, res) => {
    res.send('tidak ada halaman ini')
}).listen('3000', () => {
    console.log('login to browser');
})

