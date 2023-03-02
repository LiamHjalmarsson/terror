import { PubSub } from "../util/pubsub.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "person_added",
        listener: ( { person } ) => {
            render(person)
        }
    });

})();

function render ( person ) {

    let h3 = document.createElement('h3')
    let container = document.querySelector("#response");
    container.append(h3);

    if (person.error) {
        h3.textContent = `${person.error} `;
        container.classList.add("error")
        container.style.opacity = 1;
    } else {
        h3.classList.add("transitonLoading");
        displayName(h3, person);
        container.style.opacity = 1;
        h3.classList.add("added")
    }
    
    setTimeout(() => {
        container.style.opacity = 0;
        setTimeout(() => {
            h3.remove();
        }, 300)
    }, 2000)
}

function displayName (h3, person) {
    for (let i = 0; i < person.name.length; i++) {
        let span = document.createElement("span");
        h3.append(span);
        span.classList.add(`let_${i + 1}`);
        span.textContent = person.name[i];
    }
}