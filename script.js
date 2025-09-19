<!DOCTYPE html>
<html>
  <head>
    <title>Bake your cake</title>
    <meta name="description" content="Bake your cake">
    <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>

    <style>
  .start-ui {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    text-align: center;
  }

  .start-ui button {
    margin: 10px;
    padding: 15px 30px;
    font-size: 18px;
    cursor: pointer;
  }

  /* Cake choice tabs */
  #cakeChoices {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    gap: 20px;
    z-index: 10;
  }

  #cakeChoices div {
    padding: 20px;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
    width: 180px;
  }

  #chocolateTab { background-color: #8B4513; } /* Light brown */
  #blueberryTab { background-color: #1E90FF; } /* Blue */
  #cherryTab { background-color: #FF69B4; }    /* Pink */
</style>


    <script>
  let selectedCake = null;
  const recipes = {
    blueberry: ["flour", "sugar", "butter", "milk", "vanilla", "blueberries", "spatula"],
    chocolate: ["flour", "sugar", "butter", "milk", "vanilla", "chocolate", "strawberries", "spatula"],
    cherry: ["flour", "sugar", "butter", "milk", "vanilla", "cherries", "spatula"]
  };

  function showCakeChoices() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('cakeChoices').style.display = 'flex';
  }

  function selectCake(cakeType) {
    selectedCake = cakeType;

    // Hide cake choices
    document.getElementById('cakeChoices').style.display = 'none';

    // Show kitchen scene
    const scene = document.getElementById('scene');
    scene.setAttribute('visible', true);

    // Make all kitchen objects visible
    const entityIds = [
      'kitchenrightwall','blueberries','plate','strawberry','recipeTab','timerBar',
      'blackcabinet','blackplate','bluebottle','bowl','clock','coffee','coffeemaker',
      'counterfloorright','cuttingboard','exhaustfan','faucet','floor','kitchenopenwall',
      'kitchenroofslide','kitchenrooftop','kitchenwallback','kniveholder','ladlesandspoonswall',
      'light','mugs','pandeep','plant','plantwindow','salt1','salt2','salt3','shelves',
      'sink','slicefruitcake','soap','soap2','spatula','stool','stove','stovecabinets',
      'sugarbag','vanilla','wallclock','wallcountertop','wallstove','whitebottle','windowbottom'
    ];
    entityIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('visible', true);
    });

    // Restart background music
    const music = document.querySelector('#mainmusic');
    if (music && music.components && music.components.sound) {
      music.components.sound.stopSound();
      music.components.sound.playSound();
    }

    // Show recipe tab on left side with ingredients
    const recipeTab = document.getElementById('recipeTab');
    const ingredients = recipes[cakeType];
    recipeTab.setAttribute('visible', true);
    recipeTab.setAttribute('position', '-2 2 -2'); // Left side of screen
    recipeTab.setAttribute('text', {
      value: `${cakeType.charAt(0).toUpperCase() + cakeType.slice(1)} Cake:\n- ${ingredients.join("\n- ")}`,
      align: 'left',
      color: 'black',
      width: 4
    });

    // Add clickable behavior for ingredients
    document.querySelectorAll('.ingredient').forEach(el => {
      el.addEventListener('click', () => collectIngredient(el.id));
    });
  }

  function collectIngredient(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('visible', false);

    // Update recipe tab text (mark ingredient as collected ✅)
    const recipeTab = document.getElementById('recipeTab');
    let currentText = recipeTab.getAttribute('text').value;
    const regex = new RegExp(`- ${id}`, "i");
    recipeTab.setAttribute('text', 'value', currentText.replace(regex, `- ✅ ${id}`));
  }
</script>

  </head>

  <body>
    <!-- Start Screen -->
    <div class="start-ui" id="startScreen">
      <h1>Bake your cake</h1>
      <button onclick="startGame()">Start</button>
      <button onclick="window.close()">Quit</button>
    </div>

    <!-- Cake choice tabs -->
    <div id="cakeChoices">
      <div class="cake-tab chocolate" onclick="chooseCake('chocolate')">Chocolate Cake</div>
      <div class="cake-tab blueberry" onclick="chooseCake('blueberry')">Blueberry Cake</div>
      <div class="cake-tab cherry" onclick="chooseCake('cherry')">Cherry Cake</div>
    </div>

    <!-- Recipe panel (appears after cake chosen) -->
    <div id="recipePanel"></div>

    <!-- A-Frame Scene -->
    <a-scene id="scene" vr-mode-ui="enabled: false">
      <!-- Camera in middle of kitchen, human height -->
      <a-entity id="cameraRig" position="0 0 0">
        <a-camera position="0 1.6 0">
          <a-cursor rayOrigin="mouse" material="color: black; shader: flat"></a-cursor>
        </a-camera>
      </a-entity>

      <!-- Lights -->
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-entity light="type: directional; intensity: 0.8" position="0 2 1"></a-entity>

      <!-- Example entities (all hidden initially) -->
      <a-entity id="kitchenrightwall" gltf-model="kitchenrightwall.glb" visible="false"></a-entity>
      <a-entity id="blueberries" gltf-model="blueberries.glb" visible="false"></a-entity>
      <a-entity id="plate" gltf-model="plate.glb" visible="false"></a-entity>
      <a-entity id="strawberry" gltf-model="strawberry.glb" visible="false"></a-entity>
      <!-- (rest of kitchen entities go here) -->

      <!-- Sounds -->
      <a-sound id="mainmusic" src="baking cooking jazz.mp3" autoplay="false" loop="true"></a-sound>
    </a-scene>
  </body>
</html>
