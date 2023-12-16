import { Component } from "@angular/core";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
          .online {
            color: white;
          }
    ` ]
})
export class ServerComponent {
    serverId: number = 423;
    status: string = 'offline';


    constructor(){
        this.status = Math.random() > 0.5 ? 'online' : 'offline';
    }


    getServerStatus() {
        return this.status;

    }
    getColor(){
        return this.status === 'online' ? 'green' : 'red';
    }
}