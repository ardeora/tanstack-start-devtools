import chokidar from "chokidar";
import fs from "fs";

type EventCallback = (data: string) => unknown;
class MessageBroker {
  private events: Record<string, EventCallback[]> = {};
  private store: Record<string, string[]> = {
    loaderData: ["yolo"],
  };

  // constructor() {
  //   chokidar.watch("./app/devtools/abcd.txt").on("change", (path) => {
  //     this.fileChanged();
  //   });
  // }

  // fileChanged() {
  //   // Read the lines from the file and store it in the store
  //   fs.readFile("./app/devtools/abcd.txt", "utf8", (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     const lines = data.split("\\n");
  //     lines.forEach((line) => {
  //       this.storeData("loaderData", line);
  //     });

  //     console.log(this.store["loaderData"]);
  //   });
  // }

  subscribe(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event: string, data: string) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((callback) => callback(data));
  }

  storeData(key: string, data: string) {
    if (!this.store[key]) {
      this.store[key] = [];
    }
    this.store[key].push(data);
  }

  retrieveData(key: string) {
    return this.store[key];
  }
}

const messageBroker = new MessageBroker();

export { messageBroker };
