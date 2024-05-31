// Função para mudar o title do site quando o usuário estiver em outra aba
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        document.title = "🛍️ Volte para suas compras";
    }
    else {
        document.title = "Venus Cosméticos";
    }
});

// Função para exibir ou remover a visualização do modal de newsletter
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var modal = document.getElementById('modal');
        modal.style.display = 'flex';

        var span = document.getElementsByClassName('close')[0];
        span.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }, 2000); 
});

// Função de validação de email
document.addEventListener('DOMContentLoaded', function() {
    const formModal = document.getElementById('newsletter-modal');
    const formSection = document.getElementById('newsletter-section');

    const emailInputModal = document.getElementById('email-newsletter-modal');
    const emailInputSection = document.getElementById('email-newsletter-section');

    const emailErrorModal = document.getElementById('email-error-newsletter-modal');
    const emailErrorSection = document.getElementById('email-error-newsletter-section');

    formModal.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!isValidEmail(emailInputModal.value)) {
            emailErrorModal.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        
        emailErrorModal.textContent = ''; 
        alert('E-mail cadastrado com sucesso')
        modal.style.display = 'none';
    });

    formSection.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!isValidEmail(emailInputSection.value)) {
            emailErrorSection.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        
        emailErrorSection.textContent = ''; 
        emailInputSection.value = '';
        alert('E-mail cadastrado com sucesso')
        modal.style.display = 'none';
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});



function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../Assets/menu.png";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../Assets/close.png";
    }
}