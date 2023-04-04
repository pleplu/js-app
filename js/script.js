
let pokemonRepository = (function () {
        
    let pokemonArray = [];
    
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";


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
    
        
    // Creates a list of buttons of the pokemons' names and includes an event listener when users click said buttons that shows some of the pokemons' details
        
    function addListItem(pokemon) {
        
        let pokemonList = document.querySelector("#pokemon-list");
        pokemonList.classList.add("list-group");
       
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        let button = document.createElement("button");
        button.innerHTML = pokemon.name;
        button.classList.add("pokemon");
        button.classList.add("btn");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '.modal');
        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener("click", function () {
            showDetails(pokemon)
        });
    }
    

    // Fetches details from the API and and catches any errors

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
          item.id = details.id;
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
    
      
      // A funtion thats displays pokemons' details in a modal when performed
      
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }


      // Displays a modal 

      function showModal(item) {

        pokemonRepository.loadDetails(item).then(function () {

        let modalNumber = document.querySelector(".modal-number")
        modalNumber.innerHTML = "#" + item.id;
    
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = ". " + item.name;

        let pokemonHeight = document.querySelector(".pokemon-height");
        pokemonHeight.innerHTML = "Height: " + "<br>" + (item.height/10) + "m";

        let itemTypes = "";
        item.types.forEach(function(types) {
          itemTypes += [types.type.name + "<br>"];
        });

        let pokemonTypes = document.querySelector(".pokemon-types");
        pokemonTypes.innerHTML = "Types: " + "<br>" + itemTypes;

        let pokemonImg = document.querySelector(".pokemon-img");
        pokemonImg.src = item.imageUrl;
    
    });
  }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
        };

    })();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});