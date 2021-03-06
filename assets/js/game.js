//function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    // fight each enemyRobot by looping thgouh them and fighting one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // check player stats
        console.log(playerInfo);

        // if player is alive, keep on fighting
        if (playerInfo.health > 0) {

            //inform player what round they are in (arrays start with 0, so need to add 1)
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj);

            //use debugger to pause script from running and check what's going on at the moment in the code
            // debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value fo the enemy.name parameter
            fight(pickedEnemyObj);

            // if player still alive and thre are more enemy robots in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask player if they want to use the store before continuing to the enxt round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");

                //if player confirms, take the mto the store() funciton
                if (storeConfirm) {
                    shop();
                }
            }

        }
        // if player is not alive, break out the loop and let endGame function run
        else {
            break;
        }
    }
    // after loop ends, we are either out of playerHealth or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    // chedck localStorage for high scores, if not there use 0 
    var highScore = localStorage.getItem("highscore")
    if (highScore === null) {
        highScore = 0;
    }

    // if player has more money than high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// FIGHT FUNCTION
var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    // Change turn randomly 
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //repeat and execute as long as the enemy-robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {

            // ask player if they'd like to sight or skip using fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }

            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //remove enemy's health by subtracting the amount set in the playerAttack variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " +
                enemy.name + " . " +
                enemy.name + " now has " +
                enemy.health + " health remaining."
            );
            //check enemy's health 
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;

            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // player gets attacked first

        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // Subtract the value of `enemyAttack` from value of `playerHealth`and use that result to update the value in the `playerHealth` variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " +
                playerInfo.name + ". " + playerInfo.name +
                " now has " + playerInfo.health + " health remaining."
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave the game loop if player is dead
                break;

            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }

        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// SHOP features
var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

    // check if prompt answer was left blank, player hit cancel, or provided a number instead
    if (shopOptionPrompt === null || shopOptionPrompt === "" || isNaN(shopOptionPrompt)) {
        window.alert("You need to provide a valid answer! Please try again.");
        return shop();
    }
    //use switch to carry out action - convert answer from prompt to actual number
    shopOptionPrompt = parseInt(shopOptionPrompt); {
        switch (shopOptionPrompt) {
            case 1: // Refill Health
                playerInfo.refillHealth();
                break;
            case 2: // Upgrade Attack
                playerInfo.upgradeAttack();
                break;

            case 3: // Leave the store
                window.alert("leaving the store.");
                break;

            //do nothing, so function will end
            default:
                window.alert("You did not pick a valid option. Try again.");
                // call shop() again to force player to pick a valid option 
                shop();
                break;
        }

    }
};

// function to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;

};

// function to generate a random number 
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

// function to check whether player want sto skip or fight
var fightOrSkip = function () {
    // ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP battler? Enter 'FIGHT' or 'SKIP' to choose.");

    // validate prompt answer
    if (promptFight === "" || promptFight === null || !isNaN(promptFight)) {
        window.alert("You didn't ewnter a valid choice, try again!");
        // use return to call it again and stop the rest of this function feom running 
        return fightOrSkip();
    }

    // convert promptFight to all lowercase so we can check less options
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("are you sure you'd like to quit?");

        //If yes, leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // if no, continue
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // stop loop using break and enter next fight
            //return true if player want to leave
            return true;
        }
    }
    return false;
};



// assign variable to user's name
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;

    }, //comma!
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
}

// You can log multiple values at once like this console log(playerName, playerAttack, playerHealth);
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start first game when page loads
startGame();
