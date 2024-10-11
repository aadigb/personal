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

const heartButton = document.getElementById('heart-button');
heartButton.addEventListener('click', function(event) {
    event.stopPropagation();
    createHeart(event.pageX, event.pageY);
});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}
