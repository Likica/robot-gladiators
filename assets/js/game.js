// assign variable to user's name
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can log multiple values at once like this console log(playerName, playerAttack, playerHealth);
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);


var fight = function (enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    while (playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;

                break;
            }
        }
        //remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        //check enemy's health 
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            // award player money for winning
            playerMoney = playerMoney + 20;
            //leave while() loop since enemy is dead
            break;

        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        // Subtract the value of `enemyAttack` from value of `playerHealth`and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// fight each robot-enemy by looping over them and fighting them one at a time
for (var i = 0; i < enemyNames.length; i++) {
    // if playes is alive, keep on fighting
    if (playerHealth > 0) {
        //inform player what round they are in (arrays start with 0, so need to add 1)
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        //pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];
        //reset enemyHealth before starting new fight
        enemyHealth = 50;
        //use debugger to pause script from running and check what's going on at the moment in the code
        debugger;
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value fo the enemyName parameter
        fight(pickedEnemyName);
    }

    // if player is dead, stop the game
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}