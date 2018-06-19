const express = require('express');
let router = express.Router();

const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const KEY = 'chaaaaaaaaaaaave';
const SECRET = 'seeeeeeeeeeeegredoo';
const cookie = cookieParser(SECRET);
let store = new sessions.MemoryStore();

let sessionMiddleware = sessions({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store
});

router.use(cookie);
router.use(sessionMiddleware);

const cUsuarios = require('./../mongo/controller/usuarios');

router.get('/', (req, res) => {
	var session = req.session;
	if (!session.exist) {
		res.redirect('/login');
	} else {
		var session = req.session;
		cUsuarios.pesquisarPorId(session._id, (usuario) => {
			res.render('home', {
				usuario
			});
		});
	}
});

router.get('/login', function (req, res) {
	res.render('index');
});

router.get('/cadastro', (req, res) => {
	res.render('cadastro');
});

router.post('/logar', function (req, res) {
	var campos = req.body;
	cUsuarios.logar({ nome: campos.nome, senha: campos.senha }, function (valido, usuario) {
		if (valido) {
			session = req.session;
			session.exist = true;
			session._id = usuario._id;
			res.redirect('/logando');
		} else {
			res.redirect('/');
		}
	});
});

router.get('/logando', function (req, res) {
	var session = req.session;
	if (session.exist) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

router.get('/sair', function (req, res) {
	req.session.destroy(function () {
		res.redirect('/login');
	});
});

module.exports = {
	router,
	sessionMiddleware
};