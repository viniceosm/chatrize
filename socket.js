let io;

let users = [];
let connections = [];

module.exports = function (_io) {
    io = _io;

    io.sockets.on('connection', function (socket) {
        const cUsuarios = require('./mongo/controller/usuarios');

        // cadastro usuario
        socket.on('cadastroUsuario', function (obj) {
            cUsuarios.pesquisarPorNome(obj.nome)
                .then((usuario) => {
                    let validaCaractereEspecial = (/^[a-zA-Z0-9_.-]*$/.test(obj.nome));

                    if (!validaCaractereEspecial) {
                        socket.emit('erroCadastrarUsuario', 'Os nomes de usuário só podem usar letras, números, sublinhados e pontos.');
                    } else if (usuario == undefined) {
                        cUsuarios.criar({ nome: obj.nome, senha: obj.senha })
                            .then(function () {
                                socket.emit('retornoCadastroUsuario');
                            });
                    } else {
                        socket.emit('erroCadastrarUsuario', 'Este usuário já existe.');
                    }
                });
        });

        //conectou na sala todos
        socket.on('conectouSalaTodos', function () {
            if (!users.includes(socket.request.session.nome)) {
                connections.push(socket);
                socket.id = users.length;
                socket.username = socket.request.session.nome;
                users.push(socket.username);
            }

            io.emit('retornoPessoasConectas', users);

            // manda pros conectados quem acabou de entrar
            connections.forEach((connection, i) => {
                connection.emit('retornoConectouSalaTodos', socket.username);
            });
        });

        socket.on('chatMessage', function (dado) {
            io.emit('retornoChatMessage', { msg: dado, user: socket.username });
        });

        // desconectou (trocou de rota ou atualizou a mesma)
        socket.on('disconnect', function () {
            // users.splice(users.map(function (e) {
            //     return e.username;
            // }).indexOf(socket.username), 1);

            // connections.splice(connections.indexOf(socket.username), 1);
        });
    });
};