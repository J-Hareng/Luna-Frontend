// filepath: /Users/hareng/Desktop/Luna-Frontend/src/app/serv/API/notifier-stream.service.ts
import { Injectable } from "@angular/core";
import { EventSourcePolyfill } from "event-source-polyfill";
import { AuthService } from "./auth.service";
import { API_BASE_URL } from "../../const";
import { MainCacheService } from "../logic/main-cache.service";
import {
  KeepAliveOperation,
  NotifierBody,
  TaskObject,
  UpdateOperation,
} from "./APImodels/Notifier-Models";

@Injectable({
  providedIn: "root",
})
export class NotifierStreamService {
  private eventSource!: EventSourcePolyfill;

  constructor(private apiAuth: AuthService, private mc: MainCacheService) {
    window.addEventListener("beforeunload", this.closeConnection.bind(this));
  }
  connectToStream() {
    const headers = {
      Authorization: this.apiAuth.getToken(),
      connection: "keep-alive",
      "Content-Type": "text/event-stream",
    };

    this.eventSource = new EventSourcePolyfill(
      API_BASE_URL + "/api/ConnectToSteam",
      {
        headers,
        heartbeatTimeout: 60000,
      }
    );

    this.eventSource.onopen = (event) => {
      console.log("Connected to the server");
    };

    this.eventSource.onmessage = (event) => {
      let JsonData: NotifierBody = JSON.parse(event.data);
      console.log("Message:", event.data);

      switch (JsonData.operation) {
        case KeepAliveOperation:
          break;

        case UpdateOperation:
          console.log("Update Operation");
          switch (JsonData.type) {
            case TaskObject:
              console.log("Task Object");
              console.log(JsonData.data);
              this.mc.UpdateTask(JsonData.data);
          }
          break;

        default:
          console.log(JsonData);
          break;
      }
    };

    this.eventSource.onerror = (event) => {
      if (this.eventSource.readyState === EventSourcePolyfill.CLOSED) {
        console.error("Connection was closed");
      } else {
        console.error("Error:", event);
      }
    };
  }

  closeConnection() {
    this.eventSource.close();
  }
}
