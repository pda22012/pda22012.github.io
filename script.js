document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const quitBtn = document.getElementById('quit-btn');
    const startScreen = document.getElementById('start-screen');
    const cakeSelectionScreen = document.getElementById('cake-selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');

    const cakeTabs = document.querySelectorAll('.tab');
    const cakeTitle = document.getElementById('cake-title');
    const fruitIngredient = document.getElementById('fruit');

    const ingredients = ['flour', 'sugar', 'eggs', 'vanilla', 'butter', 'milk'];
    let currentCake = '';
    let collectedIngredients = [];

    // Start Button
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        cakeSelectionScreen.classList.add('active');
    });

    // Quit Button
    quitBtn.addEventListener('click', () => {
        // This will only work if the page is opened in a window that can be closed
        window.close();
    });

    // Cake Selection
    cakeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentCake = tab.dataset.cake;
            cakeSelectionScreen.classList.remove('active');
            gameScreen.classList.add('active');
            setupGame();
        });
    });

    function setupGame() {
        // Reset from previous game
        collectedIngredients = [];
        document.querySelectorAll('#ingredients-list li').forEach(li => li.classList.remove('collected'));
        document.querySelectorAll('.ingredient-object').forEach(obj => obj.classList.remove('collected'));

        // Set cake specific details
        if (currentCake === 'strawberry') {
            cakeTitle.textContent = 'Strawberry Cake';
            fruitIngredient.textContent = 'Strawberry';
            ingredients.push('strawberry');
            document.querySelector('.ingredient-object[data-ingredient="strawberry"]').style.display = 'block';
        } else if (currentCake === 'blueberry') {
            cakeTitle.textContent = 'Blueberry Cake';
            fruitIngredient.textContent = 'Blueberry';
            ingredients.push('blueberry');
            document.querySelector('.ingredient-object[data-ingredient="blueberry"]').style.display = 'block';
        } else if (currentCake === 'cherry') {
            cakeTitle.textContent = 'Cherry Cake';
            fruitIngredient.textContent = 'Cherries';
            ingredients.push('cherry');
             document.querySelector('.ingredient-object[data-ingredient="cherry"]').style.display = 'block';
        }
    }

    // Ingredient Collection
    // For a real game, you would check the player's position relative to the ingredient.
    // For this simple example, we will just listen for a click on the ingredient object.
    document.querySelectorAll('.ingredient-object').forEach(obj => {
        obj.addEventListener('click', () => {
            // In a real game, you'd check for 'e' key press here and player proximity.
            collectIngredient(obj.dataset.ingredient);
        });
    });

    function collectIngredient(ingredient) {
        if (!collectedIngredients.includes(ingredient)) {
            collectedIngredients.push(ingredient);

            // Fade out the ingredient object
            document.querySelector(`.ingredient-object[data-ingredient="${ingredient}"]`).classList.add('collected');

            // Add line-through to the ingredient list item
            document.getElementById(ingredient) ? document.getElementById(ingredient).classList.add('collected') : null;
            if(ingredient === 'strawberry' || ingredient === 'blueberry' || ingredient === 'cherry') {
                 document.getElementById('fruit').classList.add('collected');
            }


            // Check if all ingredients are collected
            if (collectedIngredients.length === ingredients.length) {
                finishGame();
            }
        }
    }

    function finishGame() {
        gameScreen.classList.remove('active');
        endScreen.classList.add('active');

        // After the loading bar (5 seconds)
        setTimeout(() => {
            document.getElementById('loading-bar-container').style.display = 'none';
            document.getElementById('final-cake').style.display = 'block';
            document.getElementById('end-message').textContent = 'have a piece';

            // Play sound effect
            // const winSound = new Audio('your-win-sound.mp3');
            // winSound.play();
        }, 5000);
    }
});
