const model = require('./../models/usuarios')();

const crud = {
	pesquisar: (query) => {
		return new Promise((resolve) => {
			model.find(query, {})
				.exec((err, usuarios) => {
					if (err) throw err;
					resolve(usuarios);
				});
		});
	},
	logar: (query) => {
		return new Promise((resolve) => {
			model.find(query, {}, (err, usuarios) => {
				if (err) throw err;
				if (usuarios.length == 1) {
					resolve([true, usuarios[0]]);
				} else {
					resolve([false]);
				}
			});
		});
	},
	criar: (fields) => {
		return new Promise((resolve) => {
			model.create(fields, (err, usuario) => {
				if (err) throw err;
				resolve();
			});
		});
	},
	pesquisarPorId: (query) => {
		return new Promise((resolve) => {
			model.findById(query, (err, usuario) => {
				if (err) throw err;
				resolve(usuario);
			});
		});
	},
	pesquisarPorNome: (query) => {
		return new Promise((resolve) => {
			model.findOne({ nome: query }, (err, usuario) => {
				if (err) throw err;
				resolve(usuario);
			});
		});
	}
}

module.exports = crud;