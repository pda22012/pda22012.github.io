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

      .cake-tab {
        padding: 20px;
        border-radius: 10px;
        color: white;
        font-size: 20px;
        cursor: pointer;
        text-align: center;
        width: 180px;
        font-weight: bold;
      }

      #chocolateTab { background-color: #8B4513; } /* Light brown */
      #blueberryTab { background-color: #1E90FF; } /* Blue */
      #cherryTab { background-color: #FF69B4; }    /* Pink */

      /* Recipe panel */
      #recipePanel {
        position: absolute;
        top: 20%;
        left: 5%;
        padding: 20px;
        border-radius: 12px;
        font-family: sans-serif;
        font-size: 18px;
        display: none;
        z-index: 10;
        min-width: 200px;
        color: white;
      }

      #recipePanel h2 {
        margin-top: 0;
        font-size: 22px;
        text-align: center;
      }

      #recipePanel ul {
        list-style: none;
        padding: 0;
      }

      #recipePanel li {
        margin: 5px 0;
        font-weight: bold;
      }

      #recipePanel li.collected {
        color: lightgreen;
      }
    </style>

    <script>
      let selectedCake = null;
      const recipes = {
        blueberry: ["Flour", "Sugar", "Butter", "Milk", "Vanilla", "Blueberries", "Spatula"],
        chocolate: ["Flour", "Sugar", "Butter", "Milk", "Vanilla", "Chocolate", "Strawberries", "Spatula"],
        cherry: ["Flour", "Sugar", "Butter", "Milk", "Vanilla", "Cherries", "Spatula"]
      };

      function startGame() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('cakeChoices').style.display = 'flex';
      }

      function selectCake(cakeType) {
        selectedCake = cakeType;

        // Hide cake choices
        document.getElementById('cakeChoices').style.display = 'none';

        // Show A-Frame scene
        document.getElementById('scene').style.display = 'block';

        // Make all kitchen objects visible
        const entityIds = [
          'kitchenrightwall','blueberries','plate','strawberry','blackcabinet','blackplate',
          'bluebottle','bowl','clock','coffee','coffeemaker','counterfloorright','cuttingboard',
          'exhaustfan','faucet','floor','kitchenopenwall','kitchenroofslide','kitchenrooftop',
          'kitchenwallback','kniveholder','ladlesandspoonswall','light','mugs','pandeep','plant',
          'plantwindow','salt1','salt2','salt3','shelves','sink','slicefruitcake','soap','soap2',
          'spatula','stool','stove','stovecabinets','sugarbag','vanilla','wallclock','wallcountertop',
          'wallstove','whitebottle','windowbottom','sugar','whisk','rollingpin','radio','platenice','milk',
          'fryingpan','chocostrawberrycake','flour','choco','cherries','butter','wall1','wall2','countertop'
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

        // Show recipe panel
        const recipePanel = document.getElementById('recipePanel');
        recipePanel.style.display = 'block';

        // Set panel background to cake color
        if (cakeType === "blueberry") recipePanel.style.backgroundColor = "#1E90FF";
        if (cakeType === "chocolate") recipePanel.style.backgroundColor = "#8B4513";
        if (cakeType === "cherry") recipePanel.style.backgroundColor = "#FF69B4";

        // Fill recipe panel
        const ingredients = recipes[cakeType];
        recipePanel.innerHTML = `
          <h2>${cakeType.charAt(0).toUpperCase() + cakeType.slice(1)} Cake</h2>
          <ul>
            ${ingredients.map(item => `<li id="recipe-${item.toLowerCase()}">${item}</li>`).join('')}
          </ul>
        `;

        // Add click-to-collect functionality
        document.querySelectorAll('.ingredient').forEach(el => {
          el.addEventListener('click', () => collectIngredient(el.id));
        });
      }

      function collectIngredient(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('visible', false);

        // Update recipe panel
        const recipeItem = document.getElementById(`recipe-${id.toLowerCase()}`);
        if (recipeItem && !recipeItem.classList.contains('collected')) {
          recipeItem.classList.add('collected');
          recipeItem.innerHTML = `✅ ${recipeItem.innerText}`;
        }
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
      <div id="chocolateTab" class="cake-tab" onclick="selectCake('chocolate')">Chocolate Cake</div>
      <div id="blueberryTab" class="cake-tab" onclick="selectCake('blueberry')">Blueberry Cake</div>
      <div id="cherryTab" class="cake-tab" onclick="selectCake('cherry')">Cherry Cake</div>
    </div>

    <!-- Recipe panel -->
    <div id="recipePanel"></div>

    <!-- A-Frame Scene -->
    <a-scene id="scene" vr-mode-ui="enabled: false" style="display:none;">
      <!-- Camera -->
      <a-entity id="cameraRig" position="0 0 0">
        <a-camera position="1 5.0 0">
          <a-cursor rayOrigin="mouse" material="color: black; shader: flat"></a-cursor>
        </a-camera>
      </a-entity>

      <!-- Lights -->
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-entity light="type: directional; intensity: 0.8" position="0 2 1"></a-entity>

      <!-- Kitchen objects and ingredients -->
      <a-entity id="kitchenrightwall" gltf-model="kitchenrightwall.glb"></a-entity>
      <a-entity id="blackcabinet" gltf-model="blackcabinet.glb"></a-entity>
      <a-entity id="blackplate" gltf-model="blackplate.glb"></a-entity>
      <a-entity id="bluebottle" gltf-model="bluebottle.glb"></a-entity>
      <a-entity id="bowl" gltf-model="bowl.glb"></a-entity>
      <a-entity id="clock" gltf-model="clock.glb"></a-entity>
      <a-entity id="coffee" gltf-model="coffee.glb"></a-entity>
      <a-entity id="coffeemaker" gltf-model="coffeemaker.glb"></a-entity>
      <a-entity id="counterfloorright" gltf-model="counterfloorright.glb"></a-entity>
      <a-entity id="exhaustfan" gltf-model="exhaustfan.glb"></a-entity>
      <a-entity id="faucet" gltf-model="faucet.glb"></a-entity>
      <a-entity id="floor" gltf-model="floor.glb"></a-entity>
      <a-entity id="kitchenopenwall" gltf-model="kitchenopenwall.glb"></a-entity>
      <a-entity id="kitchenroofslide" gltf-model="kitchenroofslide.glb"></a-entity>
      <a-entity id="kitchenrooftop" gltf-model="kitchenrooftop.glb"></a-entity>
      <a-entity id="kitchenwallback" gltf-model="kitchenwallback.glb"></a-entity>
      <a-entity id="kniveholder" gltf-model="kniveholder.glb"></a-entity>
      <a-entity id="ladlesandspoonswall" gltf-model="ladlesandspoonswall.glb"></a-entity>
      <a-entity id="light" gltf-model="light.glb"></a-entity>
      <a-entity id="mugs" gltf-model="mugs.glb"></a-entity>
      <a-entity id="pandeep" gltf-model="pandeep.glb"></a-entity>
      <a-entity id="plant" gltf-model="plant.glb"></a-entity>
      <a-entity id="plantwindow" gltf-model="plantwindow.glb"></a-entity>
      <a-entity id="salt1" gltf-model="salt1.glb"></a-entity>
      <a-entity id="salt2" gltf-model="salt2.glb"></a-entity>
      <a-entity id="salt3" gltf-model="salt3.glb"></a-entity>
      <a-entity id="shelves" gltf-model="shelves.glb"></a-entity>
      <a-entity id="sink" gltf-model="sink.glb"></a-entity>
      <a-entity id="soap" gltf-model="soap.glb"></a-entity>
      <a-entity id="soap2" gltf-model="soap2.glb"></a-entity>
      <a-entity id="spatula" class="ingredient" gltf-model="spatula.glb"></a-entity>
      <a-entity id="stool" gltf-model="stool.glb"></a-entity>
      <a-entity id="stove" gltf-model="stove.glb"></a-entity>
      <a-entity id="stovecabinets" gltf-model="stovecabinets.glb"></a-entity>
      <a-entity id="sugarbag" class="ingredient" gltf-model="sugarbag.glb"></a-entity>
      <a-entity id="vanilla" class="ingredient" gltf-model="vanilla.glb"></a-entity>
      <a-entity id="wallclock" gltf-model="wallclock.glb"></a-entity>
      <a-entity id="wallcountertop" gltf-model="wallcountertop.glb"></a-entity>
      <a-entity id="wallstove" gltf-model="wallstove.glb"></a-entity>
      <a-entity id="whitebottle" gltf-model="whitebottle.glb"></a-entity>
      <a-entity id="windowbottom" gltf-model="windowbottom.glb"></a-entity>
      <a-entity id="wall1" gltf-model="wall1.glb"></a-entity>
      <a-entity id="wall2" gltf-model="wall2.glb"></a-entity>
      <a-entity id="countertop" gltf-model="countertop.glb"></a-entity>

      <!-- Ingredients with click -->
      <a-entity id="blueberries" class="ingred
