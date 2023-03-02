import { PubSub } from "../util/pubsub.js";

export default {}

let jsonArray = [];

;(() => {

    PubSub.subscribe({
        event: "randomName",
        listener: (  { params }  ) => {
            render ( params )
        }
    });

    PubSub.subscribe({
        event: "updateRisk",
        listener: ( { params } ) => {
            terroIsOver(params)
        }
    })


})();

function render ( params ) {

    let { person, students } = params;

    document.querySelector("#container").innerHTML = "";
    let box = document.createElement("div");
    box.classList.add("box");
    document.querySelector("#container").append(box);

    box.innerHTML = `<p>${person[0].toUpperCase()}${person.slice(1)}</p>`;
    
    PubSub.publish({
        event: "updateRisk",
        detail: { params: {
            randomName: person,
            otherStudents: students
        }}
    })

}

async function terroIsOver ( recourse ) {

    let { randomName, otherStudents } = recourse;

        otherStudents.forEach(async student => {
            
            if (student.name != randomName) {
                let req = new Request("../db/database.php", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: student.id,
                        terror: student.terror + 1
                    })
                });
                
                try {
                    
                    let response = await fetch(req);
                    
                    let recourse = await response.json();
                    
                } catch (error) {
                    
                }
            } else {
                localStorage.setItem("student", JSON.stringify(student.name));
            }
            
        });
        

}