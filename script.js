function startGame() {
  // Hide start screen
  document.getElementById('startScreen').style.display = 'none';

  // Show cake choice screen
  document.getElementById('choiceScreen').style.display = 'block';

  // Start background music
  const music = document.querySelector('#mainmusic');
  if (music && music.components.sound) {
    music.components.sound.playSound();
  }
}
