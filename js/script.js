// An array of different exotic weapons wrapped inside of an IIFE :

let exoticWeaponsRepository = (function () {
    let exoticWeapons = [
        {name: "Sunshot", weaponType: "Hand Cannon", energy: "Solar", ammoType: "Primary"},
        {name: "Riskrunner", weaponType: "SMG", energy: "Arc", ammoType: "Primary"},
        {name: "Fighting Lion", weaponType: "Grenade Launcher", energy: "Void", ammoType: "Special"}
    ];

    function add(weapon) {
        exoticWeapons.push(weapon);
    }

    function getAll() {
        return exoticWeapons;
    }

    function addListItem(exoticWeapons) {
        let exoticWeaponsList = document.querySelector(".exotic-weapons-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerHTML = exoticWeapons.name;
        button.classList.add("exotic-weapon");
        listItem.appendChild(button);
        exoticWeaponsList.appendChild(listItem);
        button.addEventListener("click", function () {
            console.log(showDetails(exoticWeapons))
        });
    }

    function showDetails(exoticWeapons) {
        console.log(exoticWeapons.name);
        console.log(exoticWeapons.weaponType)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

// ==========================================================================================================

// Adds a list of buttons

exoticWeaponsRepository.getAll().forEach(function(exoticWeapons) {
    exoticWeaponsRepository.addListItem(exoticWeapons);
});

// ==========================================================================================================

// List object's names and characteristics using a "forEach" loop and a function both inside and otuside said loop as well as an arrow function:

// exoticWeaponsRepository.getAll().forEach(function(exoticWeapons) {
//     document.write("<p>" + exoticWeapons.name + " : " + exoticWeapons.weaponType);
//     if (exoticWeapons.energy === "Solar"){
//         document.write(" - this is a solar weapon. " + "</p>");
//     }else if (exoticWeapons.energy === "Arc"){
//         document.write(" - this is an arc weapon. " + "</p>");
//     }else if (exoticWeapons.energy === "Void"){
//         document.write(" - this is a void weapon. " + "</p>");
//     }else{
//         document.write(" - this weapon alternates between all three energy types. " + "</p>");
//     }
// });

// exoticWeaponsRepository.getAll().forEach( exoticWeapons => document.write("<p>" + exoticWeapons.name + "</p>"));

// function listNames(exoticWeapons) {
//     document.write("<p>" + exoticWeapons.name + "</p>");
// }
 
// exoticWeaponsRepository.getAll().forEach(listNames);

// ==========================================================================================================

// Lists object's names and characteristics from the array using a "for" loop:

// for (let i = 0; i < exoticWeaponsRepository.getAll().length; i++) {
//     document.write("<p>" + exoticWeaponsRepository.getAll()[i].name + " : " + exoticWeaponsRepository.getAll()[i].weaponType);
//     if (exoticWeaponsRepository.getAll()[i].energy === "Solar"){
//         document.write(" - this is a solar weapon. " + "</p>");
//     }else if (exoticWeaponsRepository.getAll()[i].energy === "Arc"){
//         document.write(" - this is an arc weapon. " + "</p>");
//     }else if (exoticWeaponsRepository.getAll()[i].energy === "Void"){
//         document.write(" - this is a void weapon. " + "</p>");
//     }else{
//         document.write(" - this weapon alternates between all three energy types. " + "</p>");
//     }
//   }

// ==========================================================================================================

// Lists object names from array using a function and a "for" loop:

// function printArrayDetails(list){
//     for (let i = 0; i < list.length; i++){
//         document.write("<p>" + list[i].name + "</p>")
//     }
// }

// printArrayDetails(exoticWeaponsRepository.getAll());

// ==========================================================================================================