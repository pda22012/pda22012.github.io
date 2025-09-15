<script>
  function startGame() {
    // Hide the start screen
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';

    // Show the A-Frame scene (no need to hide it anymore if already visible)
    const scene = document.getElementById('scene');
    scene.setAttribute('visible', true);

    // IDs of all entities to make visible
    const entityIds = [
      'kitchenrightwall',
      'blueberries',
      'plate',
      'strawberry',
      'recipeTab',
      'timerBar',
      'blackcabinet',
      'blackplate',
      'bluebottle',
      'bowl',
      'clock',
      'coffee',
      'coffeemaker',
      'counterfloorright',
      'cuttingboard',
      'exhaustfan',
      'faucet',
      'floor',
      'kitchenopenwall',
      'kitchenroofslide',
      'kitchenrooftop',
      'kitchenwallback',
      'kniveholder',
      'ladlesandspoonswall',
      'light',
      'mugs',
      'pandeep',
      'plant',
      'plantwindow',
      'salt1',
      'salt2',
      'salt3',
      'shelves',
      'sink',
      'slicefruitcake',
      'soap',
      'soap2',
      'spatula',
      'stool',
      'stove',
      'stovecabinets',
      'sugarbag',
      'vanilla',
      'wallclock',
      'wallcountertop',
      'wallstove',
      'whitebottle',
      'windowbottom'
    ];

    // Show each entity
    entityIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute('visible', true);
        console.log(`${id} is now visible!`);
      } else {
        console.warn(`${id} not found!`);
      }
    });

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
</script>
