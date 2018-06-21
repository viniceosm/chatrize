var socket;
socket = io.connect();

$(document).ready(function () {
    var href = window.location.href;
    href = href.split('/');
    href.shift();
    href.shift();
    href = href.join('/');
    href = href.substring(href.indexOf('/'), href.length);

    if (href == '/todos') {
        // Se for sala todos
        socket.emit('conectouSalaTodos');
    }

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

    $('#paneMensagem').submit(function () {
        if ($('#txtMensagem').val() != "") {
            socket.emit('chatMessage', $('#txtMensagem').val());
            $('#txtMensagem').val('');
        }
        return false;
    });
});

socket.on('retornoCadastroUsuario', function () {
    location.href = '/';
});

socket.on('erroCadastrarUsuario', function (data) {
    $('#msgValUsuario').html(data);
});

socket.on('retornoChatMessage', function (dado) {
    $('#mensagens').append('<li><strong>' + dado.user + '</strong>:' + dado.msg);
});

function validaBarraUsuario() {
    $('#msgValUsuario').html('');
    var valido = /^[a-zA-Z0-9_.-]*$/.test($('#formCadastroUsuario #txtNome').val());
    if (!valido) {
        $('#msgValUsuario').html('Os nomes de usuário só podem usar letras, números, sublinhados e pontos.');
    }
    return valido;
}