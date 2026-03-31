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