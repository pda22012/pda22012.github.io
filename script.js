<script>
let chosenCake = null;
let requiredIngredients = [];
let collectedIngredients = [];

function startGame() {
  // Hide start screen
  document.getElementById('startScreen').style.display = 'none';

  // Show cake choice screen
  document.getElementById('choiceScreen').style.display = 'block';
}

function chooseCake(cake) {
  chosenCake = cake;
  const choiceScreen = document.getElementById('choiceScreen');
  const leftPanel = document.getElementById('leftPanel');

  // Hide the choice screen
  choiceScreen.style.display = 'none';

  // Move chosen cake to left panel and show ingredients
  leftPanel.style.display = 'block';
  leftPanel.innerHTML = `<h2>${cake === 'strawberry' ? 'Strawberry Cake' : 'Blueberry Cake'}</h2>
    <ul id="ingredientList"></ul>`;

  // Define required ingredients
  if (cake === 'strawberry') {
    requiredIngredients = ["flour", "strawberries", "vanilla", "sugar", "butter", "milk", "chocolate"];
  } else {
    requiredIngredients = ["flour", "blueberries", "vanilla", "sugar", "butter", "milk", "chocolate"];
  }

  // Build the ingredient checklist
  const list = document.getElementById('ingredientList');
  requiredIngredients.forEach(ing => {
    const li = document.createElement('li');
    li.id = `check-${ing}`;
    li.textContent = ing;
    list.appendChild(li);
  });

  // Show the kitchen + props
  const entityIds = [
    'kitchenrightwall', 'blackcabinet', 'blackplate', 'bluebottle', 'bowl', 'clock',
    'coffee', 'coffeemaker', 'counterfloorright', 'cuttingboard', 'exhaustfan',
    'faucet', 'floor', 'kitchenopenwall', 'kitchenroofslide', 'kitchenrooftop',
    'kitchenwallback', 'kniveholder', 'ladlesandspoonswall', 'light', 'mugs',
    'pandeep', 'plant', 'plantwindow', 'salt1', 'salt2', 'salt3', 'shelves',
    'sink', 'slicefruitcake', 'soap', 'soap2', 'spatula', 'stool', 'stove',
    'stovecabinets', 'wallclock', 'wallcountertop', 'wallstove', 'windowbottom'
  ];
  entityIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('visible', true);
  });

  // Show only required ingredients
  document.querySelectorAll('.ingredient').forEach(el => {
    if (requiredIngredients.includes(el.id)) {
      el.setAttribute('visible', true);
      el.addEventListener('click', () => collectIngredient(el.id));
    }
  });

  // Start background music
  const music = document.querySelector('#mainmusic');
  if (music && music.components.sound) {
    music.components.sound.playSound();
  }
}

function collectIngredient(id) {
  if (requiredIngredients.includes(id) && !collectedIngredients.includes(id)) {
    collectedIngredients.push(id);

    // Remove from scene
    const el = document.getElementById(id);
    el.setAttribute('visible', false);

    // Mark as collected in list
    const li = document.getElementById(`check-${id}`);
    if (li) {
      li.style.color = 'green';
      li.style.textDecoration = 'line-through';
    }

    // Play correct sound
    document.querySelector('#correctSound').components.sound.playSound();

  } else {
    // Wrong ingredient
    document.querySelector('#wrongSound').components.sound.playSound();
  }

  // Check if finished
  if (collectedIngredients.length === requiredIngredients.length) {
    document.getElementById('bakeScreen').style.display = 'block';
  }
}

function bakeCake() {
  document.getElementById('bakeScreen').style.display = 'none';
  const timer = document.getElementById('timerBar');
  timer.setAttribute('visible', true);

  let width = 0;
  const interval = setInterval(() => {
    width += 0.3;
    timer.setAttribute('width', width);
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    timer.setAttribute('visible', false);
    document.getElementById('finalCake').setAttribute('visible', true);
  }, 5000);
}
</script>
