import { PubSub } from "./util/pubsub.js";

PubSub.publish({
    event: "start_load",
});

localStorage.removeItem("student");

