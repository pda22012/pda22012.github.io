document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const startScreen = document.getElementById('start-screen');
    const cakeSelectionScreen = document.getElementById('cake-selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    
    // Buttons and UI
    const startBtn = document.getElementById('start-btn');
    const quitBtn = document.getElementById('quit-btn');
    const cakeTabs = document.querySelectorAll('.tab');
    const cakeTitle = document.getElementById('cake-title');
    const fruitIngredientListItem = document.getElementById('fruit');
    
    // Audio
    const backgroundMusic = document.getElementById('background-music');
    
    // Game state variables
    const baseIngredients = ['flour', 'sugar', 'egg', 'vanilla', 'butter', 'milk'];
    let allIngredientsForCake = [];
    let currentCake = '';
    let collectedIngredients = [];

    // --- Event Listeners ---

    // Start Button: Hide start screen, show cake selection, and play music
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        cakeSelectionScreen.classList.add('active');
        backgroundMusic.play().catch(e => console.log("Audio play failed. User interaction needed."));
    });

    // Quit Button
    quitBtn.addEventListener('click', () => {
        window.close();
    });

    // Cake Selection Tabs
    cakeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentCake = tab.dataset.cake;
            cakeSelectionScreen.classList.remove('active');
            gameScreen.classList.add('active');
            setupGame();
        });
    });

    // Ingredient Collection (using a single event listener on the kitchen area)
    document.getElementById('kitchen-area').addEventListener('click', (event) => {
        // Check if the clicked element is an ingredient object
        const clickedObject = event.target.closest('.ingredient-object');
        if (clickedObject && !clickedObject.classList.contains('collected')) {
            // In a real game, you would check for 'e' key press here and player proximity.
            collectIngredient(clickedObject.dataset.ingredient);
        }
    });

    // --- Game Functions ---

    function setupGame() {
        // Reset from any previous game
        collectedIngredients = [];
        document.querySelectorAll('#ingredients-list li').forEach(li => li.classList.remove('collected'));
        document.querySelectorAll('.ingredient-object').forEach(obj => {
            obj.classList.remove('collected');
            obj.style.display = 'block'; // Show all base ingredients
        });
        
        // Hide all fruit models initially
        document.querySelector('.ingredient-object[data-ingredient="strawberry"]').style.display = 'none';
        document.querySelector('.ingredient-object[data-ingredient="blueberry"]').style.display = 'none';
        document.querySelector('.ingredient-object[data-ingredient="cherries"]').style.display = 'none';

        // Set up the game based on the chosen cake
        if (currentCake === 'strawberry') {
            cakeTitle.textContent = 'Strawberry Cake';
            fruitIngredientListItem.textContent = 'Strawberry';
            allIngredientsForCake = [...baseIngredients, 'strawberry'];
            document.querySelector('.ingredient-object[data-ingredient="strawberry"]').style.display = 'block';
        } else if (currentCake === 'blueberry') {
            cakeTitle.textContent = 'Blueberry Cake';
            fruitIngredientListItem.textContent = 'Blueberry';
            allIngredientsForCake = [...baseIngredients, 'blueberry'];
            document.querySelector('.ingredient-object[data-ingredient="blueberry"]').style.display = 'block';
        } else if (currentCake === 'cherry') {
            cakeTitle.textContent = 'Cherry Cake';
            fruitIngredientListItem.textContent = 'Cherries';
            allIngredientsForCake = [...baseIngredients, 'cherries'];
            document.querySelector('.ingredient-object[data-ingredient="cherries"]').style.display = 'block';
        }
    }

    function collectIngredient(ingredientName) {
        if (!collectedIngredients.includes(ingredientName)) {
            collectedIngredients.push(ingredientName);

            // Fade out the 3D model
            document.querySelector(`.ingredient-object[data-ingredient="${ingredientName}"]`).classList.add('collected');

            // Cross off the item in the list
            let listItem;
            if (['strawberry', 'blueberry', 'cherries'].includes(ingredientName)) {
                listItem = fruitIngredientListItem;
            } else {
                listItem = document.getElementById(ingredientName);
            }
            if (listItem) {
                listItem.classList.add('collected');
            }

            // Check if all ingredients for the current recipe are collected
            if (collectedIngredients.length === allIngredientsForCake.length) {
                finishGame();
            }
        }
    }

    function finishGame() {
        setTimeout(() => {
            gameScreen.classList.remove('active');
            endScreen.classList.add('active');

            // After the loading bar animation (5 seconds)
            setTimeout(() => {
                document.getElementById('loading-bar-container').style.display = 'none';
                document.getElementById('final-cake').style.display = 'block';

                // Hide all final cake models first
                document.querySelectorAll('.final-cake-model').forEach(model => model.style.display = 'none');
                
                // Show the specific cake model that was chosen
                document.getElementById(`${currentCake}-cake-final`).style.display = 'block';

                document.getElementById('end-message').textContent = 'have a piece';

                // Optional: Play a "success" sound effect here
                // const winSound = new Audio('your-win-sound.mp3');
                // winSound.play();
            }, 5000);
        }, 500); // A small delay before switching to the end screen
    }
});
