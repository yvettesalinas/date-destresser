function loadPostDates() {
    console.log(localStorage.listdata);
    // stored as a string with 2 values so split by comma to separate movie and cocktail id
    const saveDateData = localStorage.getItem("listdata").split(',');
    console.log(saveDateData);

    // assign movie and cocktail id to reference in fetch request
    let savedMovieId = saveDateData[0];
    let savedCocktailId = saveDateData[1];
    console.log(savedMovieId);

    function savedMovieApi() {
    
        const options1 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'fe7bdd69f0msh9594c83e6b599c0p1521a2jsn075065d4fdd0',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
        
        // inserts movie id into fetch url
        let savedMovieUrl = `https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${savedMovieId}&output_language=en`;
        
        fetch(savedMovieUrl, options1)
            .then(function (response) {
                return response.json();
            })
            
            .then(function (data) {
                console.log(data);
                function showSavedMovie(data) {
                    // creating elements for cocktail card
                    let savedMovieNameEl = document.createElement('h3');
                    let savedMovieImgEl = document.createElement('img');
                    let savedMovieDescContainer = document.createElement('div');
                    let savedMovieDescTitle = document.createElement('h3');
                    let savedMovieDescEl = document.createElement('p');
                    let savedMovieCastContainer = document.createElement('div');
                    let savedMovieCastTitle = document.createElement('h3');
                    let savedMovieCastMemebers = document.createElement('ul');
                    const savedMovieCard = $('#saved-movie-container');
    
                    
                
                    // // setting text for cocktail elements
                    savedMovieNameEl.textContent = data.title;
                    savedMovieImgEl.src = data.posterURLs['original'];
                    savedMovieDescEl.textContent = data.overview;
                    savedMovieDescTitle.textContent = 'Description:'
                    savedMovieCastTitle.textContent = 'Cast Members:'
                    

                    // setting class for movie elements
                    savedMovieNameEl.className = 'card-header-title is-centered';
                    savedMovieImgEl.className = 'card-image';
                    savedMovieDescContainer.className = 'card-content';
                    savedMovieDescTitle.className = 'card-header';
                    savedMovieDescEl.className = 'card-content';
                    savedMovieCastContainer.className = 'card-footer';
                    savedMovieCastTitle.className = 'card-content';
                    savedMovieCastMemebers.className = 'content';
                    

                    // appending elements to html container
                    savedMovieCard.append(savedMovieNameEl);
                    savedMovieCard.append(savedMovieImgEl);
                    savedMovieCard.append(savedMovieDescContainer);
                    savedMovieCard.append(savedMovieCastContainer);
                    savedMovieDescContainer.append(savedMovieDescTitle);
                    savedMovieCastContainer.append(savedMovieCastTitle);
                    savedMovieDescContainer.append(savedMovieDescEl);
                    savedMovieCastContainer.append(savedMovieCastMemebers);
                    
                    for (let i = 0; i < data.cast.length; i++) {
                        let savedMovieCast = document.createElement('li');
                        savedMovieCast.textContent = data.cast[i];
                        savedMovieCastMemebers.append(savedMovieCast);
                    }
                    
                };
                showSavedMovie(data);
            });       
    
    };
    savedMovieApi();
    
    function savedCocktailApi() {
        // inserts cocktail id value into fetch request url
        let savedCocktailUrl = `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${savedCocktailId}`
    
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a8e483976dmshec4d2742c1d95c9p1e2f36jsn301a53d09a19',
                'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
            }
        };
        
        fetch(savedCocktailUrl , options2)
            .then(function (response) {
                return response.json();
            })
            
            .then(function (data) {
                console.log(data);
                function showSavedDrink(data) {
                    // creating elements for cocktail card
                    let savedDrinkNameEl = document.createElement('h3');
                    let savedDrinkImgEl = document.createElement('img')
                    let savedDrinkIngredientsEl = document.createElement('ul');
                    let savedDrinkInstructionEl = document.createElement('p');
                    let savedDrinkIngredientsTitle = document.createElement('h3');
                    let savedDrinkInstructionsTitle = document.createElement('h3');
                    let savedDrinkCard = $('#saved-cocktail-container');
                    
                
                    // // setting text for cocktail elements
                    savedDrinkNameEl.textContent = data.drinks[0].strDrink;
                    savedDrinkImgEl.src = data.drinks[0].strDrinkThumb;
                    savedDrinkInstructionEl.textContent = data.drinks[0].strInstructions;
                    drinkId = data.drinks[0].idDrink;
                    savedDrinkIngredientsTitle = 'Ingredients:'
                    savedDrinkInstructionsTitle = 'Instructions:'
                    
    
                    // setting class for cocktail elements
                    savedDrinkNameEl.className = 'card-header-title is-centered';
                    savedDrinkImgEl.className = 'card-image';
                    savedDrinkInstructionEl.className = 'card-content';
                    savedDrinkIngredientsEl.className = 'card-footer';
                    savedDrinkInstructionsTitle = 'card-header';
                    savedDrinkIngredientsTitle.className = 'card-header';
                    
    
                    // appending elements to html saved cocktail container
                    savedDrinkCard.append(savedDrinkNameEl);
                    savedDrinkCard.append(savedDrinkImgEl);
                    savedDrinkCard.append(savedDrinkIngredientsTitle);
                    savedDrinkCard.append(savedDrinkIngredientsEl);
                    savedDrinkCard.append(savedDrinkInstructionsTitle);
                    savedDrinkCard.append(savedDrinkInstructionEl);
    
                    // for loop to list out ingredients and measurements
                    for(let i = 1; i < 16; i++) {
                        // if an ingredient at i has a value the function will create a li element and append the ingredients
                        if(data.drinks[0][`strIngredient${i}`]) {
                            let savedIngredientsEl = document.createElement('li');
                                
                            savedIngredientsEl.innerHTML = data.drinks[0][`strIngredient${i}`] + ' : ' + data.drinks[0][`strMeasure${i}`];
                            savedIngredientsEl.className = 'card-content'
    
                            
                            savedDrinkIngredientsEl.append(savedIngredientsEl)
                        };
                        
                    };
                };
                showSavedDrink(data);
            })
        
             
    };
    savedCocktailApi();
    
    
};

//mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#navbarExampleTransparentExample');

burgerIcon.addEventListener('click',() => {
    navbarMenu.classList.toggle('is-active');
});

loadPostDates();
