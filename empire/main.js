import "./reset.css";
import "./style.css";
import * as ui from "./ui.js";
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

document.getElementById("shuffle-button").addEventListener("click", e => {
    const array = words.map(item => item.word);
    shuffleArray(array);
    populateWords(array);
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

    const element = new ui.Element("p", player ? `${player}: ${word}` : word).element;
    if (player) {
        element.addEventListener("click", e => {
            // Array with players that are not eliminated
            const empires = words.filter(item => item.eliminated == false && item.player?.trim());
            // Creates an html string using the array
            const options = (() => {
                let html = "";
                empires.forEach(item => [
                    html += `<option value="${item.player}">${item.player}: ${item.word}</option>`
                ]);
                return html;
            })();
            // Show modal
            const modal = ui.modal({
                title: element.textContent,
                body: `<label>
    Acquired by
    <select id="team-select">${options}</select>
</label>
<button id="apply-button">Apply</button>
<button id="remove-button">Remove Word</button>`,
                buttons: [
                    {
                        text: "Close",
                        close: true
                    },
                ],
            });
            modal.querySelector("h2").style.textTransform = "capitalize";
        });
    }
    else {
        // Show modal
        element.addEventListener("click", e => {
            const modal = ui.modal({
                title: element.textContent,
                body: `<button id="remove-button">Remove Word</button>`,
                buttons: [
                    {
                        text: "Close",
                        close: true
                    },
                ],
            });
            modal.querySelector("h2").style.textTransform = "capitalize";
            document.getElementById("remove-button").addEventListener("click", e => {

                element.remove();
                modal.close();
            });
        });
    }

    // Add word to word container
    document.getElementById("word-container").append(new ui.Element("p", word).element);
    // Add word to player container
    document.getElementById("player-container").append(element);
}

function populateWords(array) {
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