import { eventHandler } from "vinxi/http";

export default eventHandler((event) => {
  console.log("event", event);
  return event;
});
