// filepath: /Users/hareng/Desktop/Luna-Frontend/src/app/serv/API/notifier-stream.service.ts
import { Injectable } from "@angular/core";
import { EventSourcePolyfill } from "event-source-polyfill";
import { AuthService } from "./auth.service";
import { API_BASE_URL } from "../../const";

@Injectable({
  providedIn: "root",
})
export class NotifierStreamService {
  private eventSource!: EventSourcePolyfill;

  constructor(private apiAuth: AuthService) {}

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
        heartbeatTimeout: 60000, // Increase the timeout to 60 seconds
      }
    );

    this.eventSource.onopen = (event) => {
      console.log("Connected to the server");
    };

    this.eventSource.onmessage = (event) => {
      let JsonData = JSON.parse(event.data);
      console.log("Message:", event.data);
      switch (JsonData.type) {
        case "KeepAlive":
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
