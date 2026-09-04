document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('btnSusto');
    const mensagem = document.getElementById('mensagem');

    let clicado = false;

    botao.addEventListener('click', () => {
        if (!clicado) {
            mensagem.textContent = "O Huggy Wuggy está te observando no escuro! 😱";
            mensagem.style.color = "#e60000";
            mensagem.style.fontWeight = "bold";
            botao.textContent = "Fugir!";
            clicado = true;
        } else {
            mensagem.textContent = "Você conseguiu escapar... por enquanto.";
            mensagem.style.color = "#0055ff";
            botao.textContent = "Voltar para a Fábrica";
            clicado = false;
        }
    });
});