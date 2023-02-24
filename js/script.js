exoticWeapons = [
    {name: "Sunshot", weaponType: "Hand Cannon", energy: "Solar", ammoType: "Kinetic"},
    {name: "Riskrunner", weaponType: "SMG", energy: "Arc", ammoType: "Kinetic"},
    {name: "Fighting Lion", weaponType: "Grenade Launcher", energy: "Void", ammoType: "Special"}
];
// An array of different exotic weapons

for (let i = 0; i < exoticWeapons.length; i++) {
    document.write(exoticWeapons[i].name + " (Energy: " + exoticWeapons[i].energy + ")");
    if (exoticWeapons[i].energy === "Solar"){
        document.write(" - this is a solar weapon. " + "<br>");
    }else if (exoticWeapons[i].energy === "Arc"){
        document.write(" - this is an arc weapon. " + "<br>");
    }else {
        document.write(" - this is a void weapon. " + "<br>");
    }
  }
// Lists objects names and energy types from the array 


