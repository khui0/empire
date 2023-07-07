import "./reset.css";
import "./style.css";
import * as ui from "./ui.js";

document.getElementById("shuffle-button").addEventListener("click", e => {

});

document.getElementById("add-button").addEventListener("click", e => {
    ui.modal({
        title: "Add word",
        body: `<label>
    Word:
    <input type="text">
</label>
<button>Random</button>
<label>
    Player: (leave blank for fake word)
    <input type="text">
</label>`,
        buttons: [
            {
                text: "Cancel",
                close: true
            },
            {
                text: "Add",
                close: true,
                onclick: () => {
                    console.log("a");
                },
            },
        ],
        blur: true,
    });
});

// ui.prompt("Remove player", "Are you sure you want to remove _?", [
//     {
//         text: "Cancel",
//         close: true,
//     },
//     {
//         text: "Remove",
//         close: true,
//         onclick: () => {
//             console.log("REMOVE");
//         },
//     },
// ]);