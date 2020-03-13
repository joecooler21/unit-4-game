var fighterSelected = false;
var enemySelected = false;

var currentFighter, currentEnemy;

var richter = {
    id: "#richter",
    path: "assets/images/richter.jpg",
    name: "Richter",
    attackName: ["vampire killer", "hydro storm", "blade dash"],
    hp: 100
};

var alucard = {
    id: "#alucard",
    path: "assets/images/alucard.jpg",
    name: "Alucard",
    attackName: ["alucard sword", "soul steal", "bat form"],
    hp: 100
};

var death = {
    id: "#death",
    path: "assets/images/death.jpg",
    name: "Death",
    attackName: ["scythe", "flaming skull", "dark energy beam"],
    hp: 100
};

var dracula = {
    id: "#dracula",
    path: "assets/images/dracula.jpg",
    name: "Dracula",
    attackName: ["fireball", "bat form", "dragon form"],
    hp: 100
};

/* main game code *******************************************/

$(".game-hud").on("click", "#atk-btn", function () {
    alert ("attack: " + currentFighter.attackName[rand(0, 2)] + " counterattack: " + currentEnemy.attackName[rand(0, 2)]);
});

/***********************************************************/

$("#richter").on("click", function () {
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
    $("#enemy").attr("src", path);
    $(id).attr("src", " ");
}

function setHeaderText() {
    if (fighterSelected && !enemySelected) {
        $(".header").text("Choose Your Opponent");
    }

    if (fighterSelected && enemySelected) {
        $(".header").text("Destroy Your Enemy!");
    }

}

function setFighter(fighter) {
    setFighterPic(fighter.id, fighter.path);
    fighterSelected = true;
    setHeaderText();
    return fighter;
}

function setEnemy(enemy) {
    setEnemyPic(enemy.id, enemy.path);
    enemySelected = true;
    setHeaderText();
    $(".game-hud").append('<button id="atk-btn">Attack!</button>');
    return enemy;
}

function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}