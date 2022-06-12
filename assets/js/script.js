// Fetches movie API, dont have as many daily fetches for this one so we won't call it until we need to
function movieApi() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe7bdd69f0msh9594c83e6b599c0p1521a2jsn075065d4fdd0',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    // adds preferred streaming service to 
    let service = $('#service-select').val();
    let movieUrl = `https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=movie&genre=18&page=1&output_language=en&language=en`;
    
    fetch(movieUrl, options)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
            function showMovie(data) {
                // creating elements for cocktail card
                let movieNameEl = document.createElement('h3');
                let movieImgEl = document.createElement('img');
                let movieDescContainer = document.createElement('div');
                let movieDescTitle = document.createElement('h3');
                let movieDescEl = document.createElement('p');
                let movieCastContainer = document.createElement('div');
                let movieCastTitle = document.createElement('h3');
                let movieCastMembers = document.createElement('ul');
                let movieCard = $('#movie-container');

                for (let i = 0; i < 1; i++) {
                    const arrayMovie = Math.floor(Math.random() * data.results.length);
                    
                    console.log(arrayMovie);
                
            
                    // // setting text for cocktail elements
                    movieNameEl.textContent = data.results[arrayMovie].title;
                    movieImgEl.src = data.results[arrayMovie].posterURLs['original'];
                    movieDescEl.textContent = data.results[arrayMovie].overview;
                    movieDescTitle.textContent = 'Description:'
                    movieCastTitle.textContent = 'Cast Members:'
                    

                    // setting class for movie elements
                    // movieNameEl.classList.add('');
                    // movieImgEl.classList.add('');
                    // movieDescContainer.classList.add('');
                    // movieDescTitle.classList.add('');
                    // movieDescEl.classList.add('');
                    // movieCastContainer.classList.add('');
                    // movieCastTitle.classList.add('');
                    // movieCastMembers.classList.add('');
                    

                    // appending elements to html container
                    movieCard.append(movieNameEl);
                    movieCard.append(movieImgEl);
                    movieCard.append(movieDescContainer);
                    movieCard.append(movieCastContainer);
                    movieDescContainer.append(movieDescTitle);
                    movieCastContainer.append(movieCastTitle);
                    movieDescContainer.append(movieDescEl);
                    movieCastContainer.append(movieCastMembers);

                    for (let i = 0; i < data.results[arrayMovie].cast.length; i++) {
                        let movieCast = document.createElement('li');
                        movieCast.textContent = data.results[arrayMovie].cast[i];
                        movieCastMembers.append(movieCast);
                    }
                }
            };
            showMovie(data);
        });       

        

};

// Fetches cocktail api
function cocktailApi() {
    const optionsB = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a8e483976dmshec4d2742c1d95c9p1e2f36jsn301a53d09a19',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };
    
    fetch('https://the-cocktail-db.p.rapidapi.com/random.php', optionsB)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
            function showDrink(data) {
                // creating elements for cocktail card
                let drinkNameEl = document.createElement('h3');
                let drinkImgEl = document.createElement('img')
                let drinkIngredientsEl = document.createElement('ul');
                let drinkInstructionEl = document.createElement('p');
                let drinkCard = $('#cocktail-container');
            
                // // setting text for cocktail elements
                drinkNameEl.textContent = data.drinks[0].strDrink;
                drinkImgEl.src = data.drinks[0].strDrinkThumb;
                drinkInstructionEl.textContent = data.drinks[0].strInstructions;

                // setting class for cocktail elements
                // drinkNameEl.classList.add('');
                // drinkImgEl.classList.add('');
                // drinkInstructionEl.classList.add('');
                // ingredientEl.classList.add('');
                // drinkCard.classList.a

                // appending elements to html container
                drinkCard.append(drinkNameEl);
                drinkCard.append(drinkImgEl);
                drinkCard.append(drinkIngredientsEl);
                drinkCard.append(drinkInstructionEl);

                // for loop to list out ingredients and measurements
                for(let i = 1; i < 16; i++) {
                    
                    if(data.drinks[0][`strIngredient${i}`]) {
                        let ingredientEl = document.createElement('li');
                            
                        ingredientEl.innerHTML = data.drinks[0][`strIngredient${i}`] + ' : ' + data.drinks[0][`strMeasure${i}`];

                        
                        drinkIngredientsEl.append(ingredientEl)
                    };
                    
                };
            };
            showDrink(data);
        })
    
         
};



//mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click',() => {
    navbarMenu.classList.toggle('is-active');
});

$('#getDate').click(function() {
    movieApi();
    cocktailApi();
});

