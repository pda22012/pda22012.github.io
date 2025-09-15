function startGame() {
  // Hide the start screen
  const startScreen = document.getElementById('startScreen');
  startScreen.style.display = 'none';

  // Show the A-Frame scene
  const scene = document.getElementById('scene');
  scene.setAttribute('visible', true);

  // Show additional item (e.g., kitchenrightwall)
  const whisk = document.getElementById('kitchenrightwall');
  if (kitchenrightwall) {
    kitchenrightwall.setAttribute('visible', true);
    console.log("kitchenrightwall is now visible!");
  } else {
    console.warn("kitchenrightwall entity not found!");
  }

  // Play background music
  const music = document.querySelector('#mainmusic');
  if (music && music.components && music.components.sound) {
    music.components.sound.playSound();
    console.log("Background music started!");
  } else {
    console.warn("Music sound component not ready yet.");
  }

  console.log("Game started!");
}
