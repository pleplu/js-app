
let pokemonRepository = (function () {
        
    let pokemonArray = [];
    
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    
    // Lets users add pokemon to the array as long as they meet the specified parameters 
    
    function add(pokemon) {
        if (
            typeof pokemon === "object" && "name" in pokemon
        ) {
            pokemonArray.push(pokemon);
        } else {
            console.log("Pokemon is not correct");
        }
    }
    
    function getAll() {
        return pokemonArray;
    }
    
        
    // Creates a list of buttons of the pokemons' names and includes an event listener when users click said buttons that logs pokemons' details in the console
        
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerHTML = pokemon.name;
        button.classList.add("pokemon");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener("click", function () {
            showDetails(pokemon)
        });
    }
    

    // Fetches details from the API and displays a list of the contents when performed and catches any errors

    function loadList() {
        return fetch(apiUrl).then(function (response)   {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
              add(pokemon);
          });
        }).catch(function (e) {
              console.error(e);
        })
      }

      
      // Specifies specific details about the pokemon pulled from the API and catches any errors
      
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
    
      
      // A funtion thats logs pokemons' details in the console when performed
      
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
        };
    })();

// ------------------------------------------------------------------------------------------------------------------------------------------

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});