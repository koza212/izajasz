const bgMusic = document.getElementById('bgMusic');
const musicFile = localStorage.getItem('bgMusic') || 'background1.m4a';
bgMusic.src = 'assets/sound/' + musicFile;
document.body.addEventListener('click', () => {
    bgMusic.play();
}, { once: true });
