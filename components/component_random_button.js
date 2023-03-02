import { PubSub } from "../util/pubsub.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "start_load",
        listener: render
    });

    PubSub.subscribe({
        event: "get_terror",
        listener: terror
    });

    PubSub.subscribe({
        event: "terrorNames",
        listener: ( { recourse }  ) => {
            randomInTerror( recourse )
        }
    });

})()

function render () {
    let btn = document.createElement("button");
    btn.classList.add("terror")
    btn.innerHTML = "<span> Randomize Terror </span>";

    document.querySelector("main").append(btn);

    btn.addEventListener("click", () => {

        PubSub.publish({
            event: "get_terror",
        });

    });
    
}

async function terror () {

    let req = new Request("../db/database.php");
    
    try {

        let response = await fetch(req);

        let recourse = await response.json();

        PubSub.publish({
            event: "terrorNames",
            detail: { recourse }
        });

    } catch (error) {
        // console.log("error", error)
    }
}

function randomInTerror ( students ) {

    let array = [];

    let localStorageName = JSON.parse(localStorage.getItem("student"));

    if (localStorageName == null) {
        localStorageName = "";
    }

    console.log(localStorageName)
    students.forEach(person => {

        if (person.name != localStorageName) {
            for ( let i = 0; i <= person.terror; i++) {
                array.push(person.name);
            }
        }
    })

        
        shuffle();
        
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomName = array[randomIndex];
        
        PubSub.publish({
            event: "randomName",
            detail: { params: { 
                    person: randomName, 
                    students: students,
                }
            }
        });


    function shuffle () {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
