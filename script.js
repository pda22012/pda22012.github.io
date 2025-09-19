<script>
  function startGame() {
    // Hide the start screen
    document.getElementById('startScreen').style.display = 'none';

    // Show cake choice tabs
    document.getElementById('cakeChoices').style.display = 'flex';

    // Restart background music from the beginning
    const music = document.querySelector('#mainmusic');
    if (music && music.components && music.components.sound) {
      music.components.sound.stopSound();
      music.components.sound.playSound();
      console.log("Background music restarted!");
    } else {
      console.warn("Music sound component not ready yet.");
    }

    console.log("Game started — choose your cake!");
  }

  function chooseCake(cakeName) {
    // Hide cake choice tabs
    document.getElementById('cakeChoices').style.display = 'none';

    console.log(`You chose: ${cakeName} cake!`);

    // Reveal the kitchen now
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

    entityIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute('visible', true);
      }
    });
  }
</script>
