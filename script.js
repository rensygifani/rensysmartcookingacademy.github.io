document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes");
    const searchInput = document.getElementById("search");
    const sortCaloriesSelect = document.getElementById("sort-calories");
    const detailResep = document.getElementById("detailResep");
    const kontenDetailResep = document.getElementById("kontenDetailResep");
    const tutupDetailResep = document.querySelector(".tutupDetailResep");

    const apiUrl = 'https://dummyjson.com/recipes'; // API endpoint for recipe data

    let recipes = []; // Array to hold fetched recipes

    // Fetch recipes from API
    async function fetchRecipes() {
        try {
            const response = await axios.get(apiUrl);
            recipes = Array.isArray(response.data.recipes) ? response.data.recipes : [];
            displayRecipes(recipes);
        } catch (error) {
            console.error("Error:", error);
            recipesContainer.innerHTML = `<p>Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.</p>`;
        }
    }

    // Display recipes on the page
    function displayRecipes(recipesToDisplay) {
        recipesContainer.innerHTML = ''; // Clear existing recipes
        recipesToDisplay.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image || 'https://via.placeholder.com/300x200'}" alt="${recipe.name}">
            `;
            recipeElement.addEventListener("click", () => bukaDetailResep(recipe)); // Open details on click
            recipesContainer.appendChild(recipeElement);
        });
    }

    // Show recipe details in modal
    function bukaDetailResep(recipe) {
        kontenDetailResep.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image || 'https://via.placeholder.com/300x200'}" alt="${recipe.name}" style="width: 100%; height: auto; border-radius: 8px;">
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Cooking time:</strong> ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</p>
            <p><strong>Instructions:</strong> ${recipe.instructions.join(' ')}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Calories per serving:</strong> ${recipe.caloriesPerServing} kcal</p>
            <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
            <p><strong>Rating:</strong> ${recipe.rating} stars (${recipe.reviewCount} reviews)</p>
        `;
        detailResep.style.display = 'flex'; // Show modal
    }

    // Close the recipe details modal
    tutupDetailResep.addEventListener('click', () => {
        detailResep.style.display = 'none'; // Hide modal
    });

    // Filter recipes by search term
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
        displayRecipes(filteredRecipes);
    });

    // Sort recipes by calories
    sortCaloriesSelect.addEventListener("change", () => {
        const sortOrder = sortCaloriesSelect.value;
        const sortedRecipes = [...recipes];
        sortedRecipes.sort((a, b) => sortOrder === "asc" ? a.caloriesPerServing - b.caloriesPerServing : b.caloriesPerServing - a.caloriesPerServing);
        displayRecipes(sortedRecipes);
    });

    fetchRecipes(); // Initial recipe fetch
});
