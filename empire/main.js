import "./reset.css";
import "./style.css";
import * as ui from "./ui.js";
import list from "./list.json";

const words = {};

document.getElementById("reset-button").addEventListener("click", e => {

});

document.getElementById("shuffle-button").addEventListener("click", e => {
    document.querySelector("h1").addEventListener("click", e => {
        console.log("clicked");
    });
});

document.getElementById("add-button").addEventListener("click", e => {
    const modal = ui.modal({
        title: "Add word",
        body: `<label>
    Word:
    <input type="text" id="word-input">
</label>
<button id="random-button">Random</button>
<label>
    Player: (leave blank for fake word)
    <input type="text" id="player-input">
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
                        add(word, player);
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
    if (player) {
        console.log("added real word", word, player);
    }
    else {
        console.log("added fake word", word);
    }
}