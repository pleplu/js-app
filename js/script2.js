
let pokemonRepository = (function () {
        
    let pokemonArray = [];
    
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    let modalContainer = document.querySelector("#modal-container");

    
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
          showModal(pokemon.name, "Height: " + pokemon.height + "dm", pokemon.imageUrl);
        });
      }


      // Displays a modal 

      function showModal(title, text, image) {

        modalContainer.innerHTML = "";
    
        let modal = document.createElement("div");
        modal.classList.add("modal");
    
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "X";
        closeButtonElement.addEventListener("click", hideModal);
    
        let titleElement = document.createElement("h1");
        titleElement.innerText = title;

        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        let imageElement = document.createElement("img");
        imageElement.src = image
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add("is-visible");
      }


      // Hides the modal

      function hideModal() {
        modalContainer.classList.remove("is-visible");
      }

      
      // Closes the modal if the escape key is pressed
      
      window.addEventListener("keydown", (e) => {
        let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
          hideModal();
        }
      });

      
      // Closes the modal if the user clicks anywhere outside the modal
      
      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });

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