var socket;
socket = io.connect();

$(document).ready(function () {
    //campo usuario cadastro
    $('#formCadastroUsuario #txtNome').on('input', function (e) {
        validaBarraUsuario();
    });
    $('#formCadastroUsuario').submit(function (e) {
        var nome = $('#formCadastroUsuario [name="nome"]').val();
        var senha = $('#formCadastroUsuario [name="senha"]').val();

        if (validaBarraUsuario()) {
            socket.emit('cadastroUsuario', { nome, senha });
        }
        e.preventDefault();
    });
});

socket.on('retornoCadastroUsuario', function () {
    location.href = '/';
});

socket.on('erroCadastrarUsuario', function (data) {
    $('#msgValUsuario').html(data);
});

function validaBarraUsuario() {
    $('#msgValUsuario').html('');
    var valido = /^[a-zA-Z0-9_.-]*$/.test($('#formCadastroUsuario #txtNome').val());
    if (!valido) {
        $('#msgValUsuario').html('Os nomes de usuário só podem usar letras, números, sublinhados e pontos.');
    }
    return valido;
}