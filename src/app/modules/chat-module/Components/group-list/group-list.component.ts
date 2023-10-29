import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/modules/shared-module/Services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Output() groupSelected = new EventEmitter<any>();




  selectedGroupId: any;

  constructor(public signalRService: ChatService,public userAuth : AuthService) {}


  ngOnInit(): void {
    // Use the SignalR service to get available groups
    this.signalRService.createChatConnection();

    // this.signalRService.getAvailableGroups('37642e02-8ecc-4ce7-9f75-282ea48315f0');
  }


  joinChat() {
    
    var token = this.userAuth.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const decodedPayload = atob(tokenParts[1]);
        const parsedPayload = JSON.parse(decodedPayload);
        const userId = parsedPayload.sub; // 'sub' is the standard claim for user ID in JWT
        const firstName = parsedPayload.given_name; // Extract 'given_name' claim
        const lastName = parsedPayload.family_name; // Extract 'family_name' claim
  
        console.log('User ID: ', userId);
        console.log('First Name: ', firstName);
        console.log('Last Name: ', lastName);
  
        if (this.selectedGroupId) {
          // Pass 'firstName' and 'lastName' as user name
          this.signalRService.joinChat(userId, `${firstName} ${lastName}`, this.selectedGroupId);
          this.groupSelected.emit(this.selectedGroupId);
        }
      }
  }
  }
}