let pilhas = 0;
let estadoAtual = 'entrada';

const localTxt = document.getElementById('local-atual');
const pilhasTxt = document.getElementById('chaves-count');
const narrativaTxt = document.getElementById('texto-narrativa');
const btnAcao1 = document.getElementById('btn-acao1');
const btnAcao2 = document.getElementById('btn-acao2');
const btnReiniciar = document.getElementById('btn-reiniciar');

function atualizarJogo(local, texto, acao1Texto, acao1Func, acao2Texto, acao2Func) {
    localTxt.textContent = local;
    narrativaTxt.textContent = texto;
    pilhasTxt.textContent = pilhas;

    btnAcao1.textContent = acao1Texto;
    btnAcao1.onclick = acao1Func;

    if (acao2Texto) {
        btnAcao2.style.display = "block";
        btnAcao2.textContent = acao2Texto;
        btnAcao2.onclick = acao2Func;
    } else {
        btnAcao2.style.display = "none";
    }
}

function cenaEntrada() {
    atualizarJogo(
        'Entrada Principal',
        'Você está na recepção escura. Há uma porta trancada que precisa de 3 pilhas para carregar o GrabPack.',
        'Procurar Pilha no Balcão',
        () => {
            if (pilhas === 0) {
                pilhas++;
                atualizarJogo('Entrada Principal', 'Você encontrou a primeira pilha escondida no balcão!', 'Continuar', cenaEntrada);
            } else {
                atualizarJogo('Entrada Principal', 'Não há mais nada útil aqui.', 'Voltar', cenaEntrada);
            }
        },
        'Ir para a Sala dos Brinquedos',
        cenaGalpão
    );
}

function cenaGalpão() {
    atualizarJogo(
        'Galpão de Brinquedos',
        'Você ouve barulhos pesados nos dutos de ar... O Huggy Wuggy está por perto!',
        'Investigar caixas',
        () => {
            if (pilhas === 1) {
                pilhas++;
                atualizarJogo('Galpão de Brinquedos', 'Você encontrou a segunda pilha dentro de uma caixa do Huggy Wuggy!', 'Continuar', cenaGalpão);
            } else {
                atualizarJogo('Galpão de Brinquedos', 'Apenas caixas vazias.', 'Voltar', cenaGalpão);
            }
        },
        'Ir para a Sala Máster',
        cenaSalaMaster
    );
}

function cenaSalaMaster() {
    if (pilhas < 2) {
        atualizarJogo(
            'Sala Máster',
            'A porta está trancada por dentro. Você precisa explorar outras áreas primeiro!',
            'Voltar ao Galpão',
            cenaGalpão
        );
        return;
    }

    atualizarJogo(
        'Sala Máster',
        'Você vê a última pilha sobre a mesa, mas o Huggy Wuggy aparece na sua frente!',
        'Pegar pilha e Correr!',
        () => {
            if (pilhas === 2) {
                pilhas++;
                cenaFuga();
            }
        },
        'Tentar Esconder',
        () => {
            atualizarJogo(
                'Game Over',
                'O Huggy Wuggy te encontrou! Tente novamente.',
                'Recomeçar',
                reiniciar
            );
        }
    );
}

function cenaFuga() {
    atualizarJogo(
        'Porta de Saída',
        'Com as 3 pilhas, você carrega o GrabPack, abre a porta e consegue escapar da Playtime Co.!',
        'Jogar Novamente',
        reiniciar
    );
}

function reiniciar() {
    pilhas = 0;
    cenaEntrada();
}

btnReiniciar.onclick = reiniciar;

// Inicia o jogo
cenaEntrada();