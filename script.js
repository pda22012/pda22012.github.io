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

  document.getElementById('cakeChoices').style.display = 'none';
  document.getElementById('scene').style.display = 'block';

  const recipePanel = document.getElementById('recipePanel');
  recipePanel.style.display = 'block';

  if (cakeType === "blueberry") recipePanel.style.backgroundColor = "#1E90FF";
  if (cakeType === "chocolate") recipePanel.style.backgroundColor = "#8B4513";
  if (cakeType === "cherry") recipePanel.style.backgroundColor = "#FF69B4";

  recipePanel.innerHTML = `
    <h2>${cakeType.charAt(0).toUpperCase() + cakeType.slice(1)} Cake</h2>
    <ul>
      ${recipes[cakeType].map(item => `<li id="recipe-${item.toLowerCase()}">${item}</li>`).join('')}
    </ul>
  `;

  // Kitchen objects with positions & scales
  const kitchenObjects = [
    {id: 'kitchenrightwall', pos:'0 1.5 -5', scale:'1 1 1'},
    {id: 'blueberries', pos:'-0.5 1 -1', scale:'0.2 0.2 0.2'},
    {id: 'plate', pos:'0.5 1 -1', scale:'0.3 0.3 0.3'},
    {id: 'strawberry', pos:'1 1 -1', scale:'0.2 0.2 0.2'},
    {id: 'spatula', pos:'-1 1 -0.5', scale:'0.3 0.3 0.3'},
    {id: 'sugarbag', pos:'-1.2 1 -0.7', scale:'0.3 0.3 0.3'},
    {id: 'vanilla', pos:'-0.8 1 -0.7', scale:'0.2 0.2 0.2'},
    {id: 'chocolate', pos:'0 1 -0.7', scale:'0.3 0.3 0.3'},
    {id: 'milk', pos:'0.5 1 -0.7', scale:'0.3 0.3 0.3'}
  ];

  kitchenObjects.forEach(obj => {
    const el = document.getElementById(obj.id);
    if(el){
      el.setAttribute('visible', true);
      el.setAttribute('position', obj.pos);
      el.setAttribute('scale', obj.scale);
    }
  });

  // Background music
  const music = document.querySelector('#mainmusic');
  if (music && music.components && music.components.sound) {
    music.components.sound.stopSound();
    music.components.sound.playSound();
  }

  // Clickable ingredients
  document.querySelectorAll('.ingredient').forEach(el => {
    el.addEventListener('click', () => collectIngredient(el.id));
  });
}

function collectIngredient(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute('visible', false);

  const recipeItem = document.getElementById(`recipe-${id.toLowerCase()}`);
  if (recipeItem) {
    recipeItem.classList.add('collected');
    recipeItem.innerHTML = `✅ ${recipeItem.innerText}`;
  }
}
