let vida = Number(localStorage.getItem('vidaPet')) || 100;

const btnDano = document.querySelector('#btn-dano');
const btnCura = document.querySelector('#btn-cura');
const rostoPet = document.querySelector('#rosto-pet');
const barraVida = document.querySelector('#barra-vida');
// Selecionamos o novo elemento da barra de progresso visual
const barraInterna = document.querySelector('#barra-interna');

// --- FUNÇÃO: MOSTRAR TOAST ---
// Busca o elemento #toast pelo ID, igual a todos os outros elementos
const toast = document.querySelector('#toast');

function mostrarToast(mensagem) {
    // Define o texto que vai aparecer dentro do toast
    toast.innerText = mensagem;

    // classList.add() adiciona uma classe CSS no elemento.
    // Quando a classe 'visivel' é adicionada, o CSS muda opacity de 0 para 1 (aparece)
    toast.classList.add('visivel');

    // setTimeout executa uma função depois de um tempo (em milissegundos).
    // Aqui: depois de 2500ms (2.5 segundos), remove a classe 'visivel' (some).
    setTimeout(function() {
        toast.classList.remove('visivel');
    }, 2500);
}

// --- FUNÇÃO AUXILIAR (atualizarVisual) ---
// Em vez de escrever barraVida.innerText e barraInterna.style.width toda hora,
// criamos UMA função que faz tudo isso de uma vez so.
// Sempre que a vida mudar, chamamos essa função.
function atualizarVisual() {
    // Atualiza o texto com o número atual de vida
    barraVida.innerText = vida;

    // .style.width controla a largura (em %) da barra interna.
    // Template literal (`) permite misturar texto e variáveis com ${}.
    barraInterna.style.width = `${vida}%`;

    // Muda a cor com base no estado atual da vida
    if (vida > 60) {
        barraInterna.style.background = 'linear-gradient(90deg, #7c3aed, #22c55e)';
    } else if (vida > 30) {
        barraInterna.style.background = 'linear-gradient(90deg, #d97706, #f59e0b)';
    } else {
        barraInterna.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    }

    localStorage.setItem('vidaPet', vida.toString())
}

// Chamamos logo de início para a barra aparecer corretamente ao carregar a página
atualizarVisual();

// --- BOTÕES DE SIMULAÇÃO ---
btnDano.addEventListener('click', function () {
    vida = vida - 10;
    if (vida < 0) vida = 0;
    rostoPet.innerText = "😭";
    atualizarVisual(); // usamos a função em vez de repetir código
});

btnCura.addEventListener('click', function () {
    vida = vida + 5;
    if (vida > 100) vida = 100;
    rostoPet.innerText = "🤓";
    atualizarVisual();
});

// --- LISTAS DE APPS ---
const appsDeDano = JSON.parse(localStorage.getItem('dano')) || ['tiktok', 'instagram', 'twitter', 'x', 'netflix'];
const appsDeCura = JSON.parse(localStorage.getItem('cura')) || ['vs code', 'visual studio code', 'notion', 'figma'];

// --- VERIFICAR APP ABERTO ---
const inputApp = document.querySelector('#input-app');
const btnVerificar = document.querySelector('#btn-verificar');

btnVerificar.addEventListener('click', function () {
    const appDigitado = inputApp.value.toLowerCase();

    if (appsDeDano.includes(appDigitado)) {
        vida = vida - 15;
        rostoPet.innerText = "😭";
        mostrarToast('😩 Procrastinou! -15 de vida.');
    } else if (appsDeCura.includes(appDigitado)) {
        vida = vida + 10;
        rostoPet.innerText = "🤓";
        mostrarToast('🧠 Focou! +10 de vida.');
    } else {
        mostrarToast('🤔 App neutro. Nenhum efeito.');
    }

    if (vida < 0) vida = 0;
    if (vida > 100) vida = 100;

    atualizarVisual();
    localStorage.setItem('dano', JSON.stringify(appsDeDano));
    localStorage.setItem('cura', JSON.stringify(appsDeCura));
    inputApp.value = "";
});

// --- CADASTRAR NOVO APP ---

const inputNovoApp = document.querySelector('#input-novo-app');
const selectCategoria = document.querySelector('#select-categoria');
const btnCadastrarApp = document.querySelector('#btn-cadastrar-app');

btnCadastrarApp.addEventListener('click', function () {

    // .value captura o texto digitado. .toLowerCase() normaliza (evita bugs de maiúsculas).
    const novoApp = inputNovoApp.value.toLowerCase();

    // Pegamos qual foi a opção do <select> escolhida utilizando .value ("dano" ou "cura").
    const categoriaEscolhida = selectCategoria.value;

    // Verificamos se NÃO (!) é um texto vazio, para não salvar apps em branco.
    if (novoApp !== "") {

        if (categoriaEscolhida === 'dano') {
            appsDeDano.push(novoApp);
            mostrarToast('💀 "' + novoApp + '" adicionado como Dano!');
        } else if (categoriaEscolhida === 'cura') {
            appsDeCura.push(novoApp);
            mostrarToast('✅ "' + novoApp + '" adicionado como Cura!');
        }

        localStorage.setItem('dano', JSON.stringify(appsDeDano));
        localStorage.setItem('cura', JSON.stringify(appsDeCura));

        inputNovoApp.value = "";

    } else {
        mostrarToast('⚠️ Digite o nome de um app primeiro.');
    }
});
