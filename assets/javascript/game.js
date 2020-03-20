var fighterSelected = false;
var enemySelected = false;
var baseAtk = 0;
var playerDied = false;
var playerWin = false;
var baseFighterHP = 0;
var baseEnemyHP = 0;
var fighterDmg, enemyDmg = 0;

var currentFighter, currentEnemy;
var enemiesLeft = 3;

var richter = {
    id: "#richter",
    path: "assets/images/richter.gif",
    name: "Richter",
    attackName: ["vampire killer", "hydro storm", "blade dash"],
    attackPower: 20,
    counterAttackPower: 30,
    hp: 210
};

var alucard = {
    id: "#alucard",
    path: "assets/images/alucard.png",
    name: "Alucard",
    attackName: ["alucard sword", "soul steal", "bat form"],
    attackPower: 25,
    counterAttackPower: 25,
    hp: 220
};

var death = {
    id: "#death",
    path: "assets/images/death.jpg",
    name: "Death",
    attackName: ["scythe", "flaming skull", "dark energy beam"],
    attackPower: 25,
    counterAttackPower: 15,
    hp: 245
};

var dracula = {
    id: "#dracula",
    path: "assets/images/dracula.gif",
    name: "Dracula",
    attackName: ["bat form", "fireball", "dragon form"],
    attackPower: 35,
    counterAttackPower: 35,
    hp: 180
};

$("hr").hide();



/* main game code *******************************************/

$(".game-hud").on("click", "#atk-btn", function () {

    if (playerDied || playerWin) {
        location.reload();
        return;
    }

    if (!enemySelected) {
        return;
    }

    var fighterAtk = rand(0, 2);
    var enemyAtk = rand(0, 2);

    enemyDmg = currentEnemy.counterAttackPower;
    fighterDmg = currentFighter.attackPower;

    var fighterStr = currentFighter.name + " hits " + currentEnemy.name + " with " + currentFighter.attackName[fighterAtk] + " for " + fighterDmg + " damage.";
    var enemyStr = currentEnemy.name + " counter-attacks with " + currentEnemy.attackName[enemyAtk] + " for " + enemyDmg + " damage.";

    currentFighter.hp -= enemyDmg;
    currentEnemy.hp -= fighterDmg;

    updateCharacterBars();




    if (currentFighter.hp <= 0) {
        $("#fight-result").text(currentFighter.name + " has died. Game over.");
        $("#fighter").animate({opacity: '0.0'});
        $(this).text("New Game");
        fighterSelected = false;
        updateHP();
        playerDied = true;
        return;
    }

    if (currentEnemy.hp <= 0) {
        currentEnemy.hp = 0;
        $("#fight-result").text(currentEnemy.name + " has been defeated");
        enemySelected = false;
        enemiesLeft--;
        if (enemiesLeft === 0) {
            playerWin = true;
            $(this).text("New Game");
            setHeaderText();
        }
        $("#enemy").animate({ opacity: '0.0' });
        //setEnemyPic("", "");
        updateHP();
        return;
    }

    currentFighter.attackPower += baseAtk;
    updateHP();

    $("#fighter-text").text(fighterStr);
    $("#enemy-text").text(enemyStr);
    $("hr").show();
});

/***********************************************************/

$("#richter").on("click", function () {
    if (playerDied || playerWin) {
        return;
    }
    if (!fighterSelected) {
        currentFighter = setFighter(richter);
        return;
    }

    if (fighterSelected && !enemySelected) {
        currentEnemy = setEnemy(richter);
        return;
    }
});

$("#alucard").on("click", function () {
    if (playerDied || playerWin) {
        return;
    }
    if (!fighterSelected) {
        currentFighter = setFighter(alucard);
        return;
    }

    if (fighterSelected && !enemySelected) {
        currentEnemy = setEnemy(alucard);
        return;
    }
});

$("#death").on("click", function () {
    if (playerDied || playerWin) {
        return;
    }
    if (!fighterSelected) {
        currentFighter = setFighter(death);
        return;
    }

    if (fighterSelected && !enemySelected) {
        currentEnemy = setEnemy(death);
        return;
    }
});

$("#dracula").on("click", function () {
    if (playerDied || playerWin) {
        return;
    }
    if (!fighterSelected) {
        currentFighter = setFighter(dracula);
        return;
    }

    if (fighterSelected && !enemySelected) {
        currentEnemy = setEnemy(dracula);
        return;
    }
});

function setFighterPic(id, path) {

    $("#fighter").attr("src", path);
    $(id).attr("src", " ");
}

function setEnemyPic(id, path) {
    $("#enemy").animate({ opacity: '1.0' });
    $("#enemy").attr("src", path);
    $(id).attr("src", " ");
}

function setHeaderText() {
    if (fighterSelected && !enemySelected) {
        $(".header").text("Choose Your Opponent");
    }

    if (fighterSelected && enemySelected) {
        $(".header").text("Destroy Your Enemies!");
    }

    if (playerWin) {
        $(".header").text("All Enemies Vanquished!");
    }

}

function setFighter(fighter) {
    baseFighterHP = fighter.hp;
    baseAtk = fighter.attackPower;
    setFighterPic(fighter.id, fighter.path);
    fighterSelected = true;
    setHeaderText();
    $("#fighter-name").text(fighter.name);
    $("#hp-fighter-text").text("HP: " + fighter.hp);
    $(".hp-fighter-progress").attr("aria-valuemax", fighter.hp);
    return fighter;
}

function setEnemy(enemy) {
    baseEnemyHP = enemy.hp;
    setEnemyPic(enemy.id, enemy.path);
    enemySelected = true;
    setHeaderText();
    $("#enemy-name").text(enemy.name);
    $("#hp-enemy-text").text("HP: " + enemy.hp);
    if (enemiesLeft === 3) {
        $("#fighter-hud").append('<button id="atk-btn">Attack!</button>');
    }
    $("#fight-result").text("");
    $(".hp-enemy-progress").attr('style', 'width: 100%');
    return enemy;
}

function updateHP() {
    if (currentFighter.hp <= 0) {
        currentFighter.hp = 0;
        $(".hp-fighter-progress").attr('style', 'width: 0%');
    }
    if (currentEnemy.hp <= 0){
        currentEnemy.hp = 0;
        $(".hp-enemy-progress").attr('style', 'width: 0%');
    }
    $("#hp-fighter-text").text("HP: " + currentFighter.hp);
    $("#hp-enemy-text").text("HP: " + currentEnemy.hp);
}

function updateCharacterBars() {

    var pDmg = Math.ceil((enemyDmg * 100) / baseFighterHP);
    var eDmg = Math.ceil((fighterDmg * 100) / baseEnemyHP);
    var fProgVal = $(".hp-fighter-progress").attr('style');
    var eProgVal = $(".hp-enemy-progress").attr('style');

    var newStr = fProgVal.replace("width: ", "");

    newStr = newStr.replace("%", "");
    newStr = parseInt(newStr);
    newStr = "width: " + (newStr - pDmg) + "%";
    $(".hp-fighter-progress").attr('style', newStr);

    newStr = eProgVal.replace("width: ", "");

    newStr = newStr.replace("%", "");
    newStr = parseInt(newStr);
    newStr = "width: " + (newStr - eDmg) + "%";
    $(".hp-enemy-progress").attr('style', newStr);


}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}