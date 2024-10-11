document.body.addEventListener('click', createRain);

function createRain() {
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('rain');
    rainDrop.style.left = `${Math.random() * window.innerWidth}px`;
    rainDrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    document.body.appendChild(rainDrop);

    setTimeout(() => {
        rainDrop.remove();
    }, 1000);
}
