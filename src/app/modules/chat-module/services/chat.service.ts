import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../models/message';
import { UserDtoRequest } from '../models/user';
import { Observable } from 'rxjs';
import { GroupDDL } from './group-ddl.model';
import { UserConnection } from './UserConnection-ddl.model';
import { AuthService } from '../../shared-module/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = 'https://localhost:7264';

  myName: string = '';
  private chatConnection?: HubConnection;
  onlineUsers: UserConnection[] = [];
  AvailableGroups: GroupDDL[] = [];
  messages: Message[] = [];
  privateMessages: Message[] = [];
  privateMesageInitiated = false;

  constructor(private httpClient: HttpClient, private modalService: NgbModal,public userAuth : AuthService) { }

  registerUser(user: UserDtoRequest) {
    debugger
    return this.httpClient.post(`${this.baseUrl}/RegisterUser`, user, { responseType: 'text' });
  }

  createChatConnection() {
    this.chatConnection = new HubConnectionBuilder()
    .withUrl(`${this.baseUrl}/hubs/chat`).withAutomaticReconnect().build();
    
    this.chatConnection.start()
    .then(() => {
      console.log("SignalR connection has been established.");

      var token = this.userAuth.getToken();
      if (token) {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const decodedPayload = atob(tokenParts[1]);
          const parsedPayload = JSON.parse(decodedPayload);
          const userId = parsedPayload.sub; // 'sub' is the standard claim for user ID in JWT
    
          console.log('User ID: ', userId);


    this.getAvailableGroups(userId);
        }
      }
      // You can now send data or perform other actions.
    })
    .catch(error => {
      console.error("Error while starting SignalR connection:", error);
    });

   
  
     // newwwwwwww
    // receiving commands from chathub
    this.chatConnection.on('getAvailableGroupsResponse', (AvailableGroups) => {
      this.AvailableGroups = [...AvailableGroups];
    });
    
    
        this.chatConnection.on('OnlineUsers', (onlineUsers) => {
          this.onlineUsers = [...onlineUsers];
          
        });


  



  //   this.chatConnection.on('NewMessage', (newMessage: Message) => {
  //     this.messages = [...this.messages, newMessage];
  //   });

  //   this.chatConnection.on('OpenPrivateChat', (newMessage: Message) => {
  //     this.privateMessages = [...this.privateMessages, newMessage];
  //     this.privateMesageInitiated = true;
  //     const modalRef = this.modalService.open(PrivateChatComponent);
  //     modalRef.componentInstance.toUser = newMessage.from;
  //   });

  //   this.chatConnection.on('NewPrivateMessage', (newMessage: Message) => {
  //     this.privateMessages = [...this.privateMessages, newMessage];
  //   });

  //   this.chatConnection.on('CloseProivateChat', () => {
  //     this.privateMesageInitiated = false;
  //     this.privateMessages = [];
  //     this.modalService.dismissAll();
  //   });
 }


 async getAvailableGroups(userId: string) {
    this.chatConnection.invoke('getAvailableGroups', userId);
  }

  // async onAvailableGroupsUpdated(): Observable<any> {
  //   return new Observable((observer) => {
  //     this.chatConnection.on('getAvailableGroupsResponse', (updatedGroups) => {
  //       observer.next(updatedGroups);
  //     });
  //   });
  // }
 /// new //////////////////////////
 async joinChat(userId: string, user: string, selectedGroupId: any) {
    this.chatConnection.invoke('JoinChat', userId, user , selectedGroupId).catch((error) => {
      console.error(error);
    });
  }

  






  stopChatConnection() {
    this.chatConnection?.stop().catch(error => console.log(error));
  }

  // Chathub method triggers comes here
  async addUserConnectionId() {
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName)
      .catch(error => console.log(error));
  }

  async sendMessage(content: string) {
    const message: Message = {
      from: this.myName,
      content
    };

    return this.chatConnection?.invoke('ReceiveMessage', message)
      .catch(error => console.log(error));
  }

  async sendPrivateMessage(to: string, content: string) {
    const message: Message = {
      from: this.myName,
      to,
      content
    };

    if (!this.privateMesageInitiated) {
      this.privateMesageInitiated = true;
      return this.chatConnection?.invoke('CreatePrivateChat', message).then(() => {
        this.privateMessages = [...this.privateMessages, message];
      })
        .catch(error => console.log(error));
    } else {
      return this.chatConnection?.invoke('RecivePrivateMessage', message)
        .catch(error => console.log(error));
    }
  }

  async closePrivateChatMessage(otherUser: string) {
    return this.chatConnection?.invoke('RemovePrivateChat', this.myName, otherUser)
      .catch(error => console.log(error));
  }
}