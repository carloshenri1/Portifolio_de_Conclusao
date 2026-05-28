// Mensagem de boas-vindas no console
console.log("Bem-vindo ao meu portfólio! Sinta-se à vontade para explorar os códigos.");

// Efeito dinâmico nos cards de projetos
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = "0px 10px 20px rgba(130, 87, 229, 0.2)";
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = "none";
    });
});