import { PubSub } from "../util/pubsub.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "start_load",
        listener: renderPersonForm
    });

    PubSub.subscribe({
        event: "add_person",
        listener: add_person
    })

})()

function renderPersonForm () {

    let form = document.createElement("form");
    form.setAttribute("action", "../db/create.php");
    form.setAttribute("method", "POST");

    let div = document.createElement("div");

    let input = document.createElement("input");
    input.setAttribute("placeholder", "Enter name:");
    input.setAttribute("name", "name");

    let label = document.createElement("label");
    label.textContent = "Name"
    label.setAttribute("for", "name");

    let btn = document.createElement("button");
    btn.innerHTML = "<span> Add </span>";

    document.querySelector("section").append(form);
    div.append(input, label);
    form.append(div, btn);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        PubSub.publish({
            event: "add_person",
            detail: { 
                person: input.value,
                terror: 0
            }
        });
    });
    
}

async function add_person ( {person, terror}  ) { 

    let req = new Request("../db/database.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: person,
            terror: terror
        })
    });
    
    try {
        let response = await fetch(req);
        
        let recourse = await response.json();
        
        if (recourse.error) {
            document.querySelector("input").classList.add("error");
        } else {
            document.querySelector("input").classList.add("added");
        }

        PubSub.publish({
            event: "person_added",
            detail: { person: recourse }
        })

        setTimeout(() => {
            if (document.querySelector("input").classList.contains("error")) {
                document.querySelector("input").classList.remove("error");
            } else {
                document.querySelector("input").classList.remove("added");
            }
            document.querySelector("form").reset();
        }, 1000)

    } catch (error) {
        console.log("error", error)
    }
}
