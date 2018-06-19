const express = require('express');
const model = require('./../models/usuarios')();

const crud = {
	pesquisar: (query, callback) => {
		model.find(query, {})
		.exec((err, usuarios) => {
			if (err) throw err;
			callback(usuarios);
		});
	},
	logar: (query, callback) => {
		model.find(query, {}, (err, usuarios) => {
			if (err) throw err;
			if (usuarios.length == 1) {
				callback(true, usuarios[0]);
			} else {
				callback(false);
			}
		});
	},
	criar: (fields, callback) => {
		model.create(fields, (err, usuario) => {
			if (err) throw err;
			callback();
		});
	},
	pesquisarPorId: (query, callback) => {
		model.findById(query, (err, usuario) => {
			if (err) throw err;
			callback(usuario);
		});
	},
	pesquisarPorNome: (query, callback) => {
		model.findOne({ nome: query }, (err, usuario) => {
			if (err) throw err;
			callback(usuario);
		});
	}
}

module.exports = crud;