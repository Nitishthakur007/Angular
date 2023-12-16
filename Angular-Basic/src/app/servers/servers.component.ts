import { Component } from '@angular/core';
@Component({
  selector: 'app-servers',
  //selector:'[app-servers]',
  //selector:'.app-servers',
 // template: `<app-server></app-server>
 // <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  allowNewServer = false;
  serverCreationStatus  = "No server was created";
  serverName = 'TestServer';
  serverName1 = "Test Server";
  serverCreated = false;
  //servers = ['TestServers', 'TestServer 2'];
  servers = ['TestServers'];
  constructor(){
    setTimeout(() => {
      this.allowNewServer =true;
    }, 2000)
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus="server was created! Name is " + this.serverName1;
  }

  onUpdateServerName(event:Event){
    this.serverName = (<HTMLInputElement>event.target).value;

  }
}
