import "./reset.css";
import "./style.css";
import * as ui from "./ui.js";
import rules from "./rules.html?raw";
import list from "./list.json";

let words = [];

document.getElementById("reset-button").addEventListener("click", e => {
    ui.prompt("Reset game?", "This will remove all words and players", [
        {
            text: "Cancel",
            close: true
        },
        {
            text: "Reset",
            close: true,
            onclick: () => {
                words = [];
                document.getElementById("word-container").innerHTML = "";
                document.getElementById("player-container").innerHTML = "";
            },
        },
    ]);
});

document.getElementById("rules-button").addEventListener("click", e => {
    const modal = ui.modal({
        title: "Rules",
        body: rules,
        buttons: [
            {
                text: "Close",
                close: true
            },
        ],
    });
});

document.getElementById("shuffle-button").addEventListener("click", e => {
    const array = words.map(item => item.word);
    shuffleArray(array);
    populateWordContainer(array);
});

document.getElementById("add-button").addEventListener("click", e => {
    const modal = ui.modal({
        title: "Add word",
        body: `<label>
    Word:
    <input type="text" id="word-input" autocomplete="off">
</label>
<button id="random-button">Random</button>
<label>
    Player: (leave blank to add fake word)
    <input type="text" id="player-input" autocomplete="off">
</label>`,
        buttons: [
            {
                text: "Cancel",
                close: true
            },
            {
                text: "Add",
                close: false,
                onclick: () => {
                    const word = document.getElementById("word-input").value;
                    const player = document.getElementById("player-input").value;
                    if (word) {
                        addWord(word, player);
                        modal.close();
                    }
                },
            },
        ],
    });

    document.getElementById("random-button").addEventListener("click", e => {
        const word = document.getElementById("word-input");
        // Get random word from list
        word.value = list[Math.floor(Math.random() * list.length)];
    });
});

function addWord(word, player) {
    word = word.toLowerCase();
    player = player.toLowerCase();
    words.push({
        word,
        player,
        eliminated: false,
    });

    const content = player ? `${player}: ${word}` : word;
    const element = new ui.Element("p", content).element;
    element.addEventListener("click", e => {
        const modal = ui.modal({
            title: content,
            body: player ? `<button id="eliminate-button">Eliminate</button>
<button id="remove-button">Remove</button>` : `<button id="remove-button">Remove</button>`,
            buttons: [
                {
                    text: "Close",
                    close: true
                },
            ],
        });
        modal.querySelector("h2").style.textTransform = "capitalize";
        document.getElementById("eliminate-button")?.addEventListener("click", e => {
            const item = words.find(item => item.word == word);
            if (!item.eliminated) {
                item.eliminated = true;
                element.classList.add("eliminated");
                checkForWinner();
            }
            else {
                item.eliminated = false;
                element.classList.remove("eliminated");
            }
            modal.close();
        });
        document.getElementById("remove-button").addEventListener("click", e => {
            ui.prompt("Remove word?", `Are you sure you want to remove ${content}?`, [
                {
                    text: "Cancel",
                    close: true
                },
                {
                    text: "Remove",
                    close: true,
                    onclick: () => {
                        words = words.filter(item => item.word != word);
                        const array = words.map(item => item.word);
                        populateWordContainer(array);
                        element.remove();
                        modal.close();
                    },
                },
            ]);
        });
    });

    // Append to word container
    document.getElementById("word-container").append(new ui.Element("p", word).element);
    // Append to player container
    document.getElementById("player-container").append(element);
}

function populateWordContainer(array) {
    const container = document.getElementById("word-container");
    container.innerHTML = "";
    array.forEach(word => {
        container.append(new ui.Element("p", word).element);
    });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function checkForWinner() {
    const empires = words.filter(item => item.eliminated == false && item.player?.trim());
    if (empires.length == 1) {
        const winner = empires[0];
        ui.alert("Winner!", `${winner.player} won with the word ${winner.word}`);
    }
}