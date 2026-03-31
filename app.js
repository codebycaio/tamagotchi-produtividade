let vida = 100;

const btnDano = document.querySelector('#btn-dano')
const btnCura = document.querySelector('#btn-cura')
const rostoPet = document.querySelector('#rosto-pet')
const barraVida = document.querySelector('#barra-vida')

btnDano.addEventListener('click', function() {
    vida = vida - 10;

    if (vida < 0) {
        vida = 0;
    }
    
    rostoPet.innerText = "😭"
    barraVida.innerText = vida;
});

btnCura.addEventListener('click', function() {
    vida = vida + 5;

    if (vida > 100) {
        vida = 100;
    }
    
    rostoPet.innerText = "🤓";
    barraVida.innerText = vida;
});

const appsDeDano = ['tiktok', 'instagram', 'twitter', 'x', 'netflix'];
const appsDeCura = ['vs code', 'visual studio code', 'notion', 'figma'];

const inputApp = document.querySelector('#input-app');
const btnVerificar = document.querySelector('#btn-verificar');

btnVerificar.addEventListener('click', function() {
    const appDigitado = inputApp.value.toLowerCase();

    if (appsDeDano.includes(appDigitado)) {
        vida = vida - 15;
        rostoPet.innerText = "😭"
        console.log("Procrastinou! Perdeu vida.");
    } else if (appsDeCura.includes(appDigitado)) {
        vida = vida + 10;
         rostoPet.innerText = "🤓"
         console.log("Focou! Ganhou vida.");
    } else {
        console.log("App neutro. Nada acontece.")
    }

    if (vida < 0) vida = 0;
    if (vida > 100) vida = 100;

    barraVida.innerText = vida;

    inputApp.value = "";
 });



