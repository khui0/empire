import "./reset.css";
import "./style.css";
import * as ui from "./ui.js";
import list from "./list.json";

const words = [];

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
                fakeWords = [];
            },
        },
    ]);
});

document.getElementById("shuffle-button").addEventListener("click", e => {
    const container = document.getElementById("word-container");
    const array = words.map(item => item.word);
    shuffleArray(array);
    container.innerHTML = "";
    array.forEach(word => {
        container.append(new ui.Element("p", word).element);
    });
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
    });

    const element = new ui.Element("p", player ? `${player}: ${word}` : word).element;
    // Add word to word container
    document.getElementById("word-container").append(new ui.Element("p", word).element);
    // Add word to player container
    document.getElementById("player-container").append(element);

    element.addEventListener("click", e => {
        ui.modal({
            title: "Options",
            body: ``,
            buttons: [
                {
                    text: "Cancel",
                    close: true
                },
            ],
        })
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