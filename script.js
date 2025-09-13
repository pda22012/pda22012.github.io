function startGame() {
  // Hide the start screen
  const startScreen = document.getElementById('startScreen');
  startScreen.style.display = 'none';

  // Show the A-Frame scene
  const scene = document.getElementById('scene');
  scene.setAttribute('visible', true);

  console.log("Game started!");
}

  // Start background music
  const music = document.querySelector('#mainmusic');
  music.components.sound.playSound();
}
