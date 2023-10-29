import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../../services/chat.service';
import { PrivateChatComponent } from '../private-chat/private-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService: ChatService, private modalSevice: NgbModal) { }
  ngOnDestroy(): void {
    this.chatService.stopChatConnection();
  }

  ngOnInit(): void {
    // this.chatService.createChatConnection();
  }

  backToHome() {
    
    console.log("🚀 ~ file: chat.component.ts:25 ~ ChatComponent ~ backToHome ~ debugger:")
    this.closeChatEmitter.emit();
  }
  
  sendMessage(content: string) {
    this.chatService.sendMessage(content);
  }

  openPrivateChat(toUser: string) {
    const modalRef =this.modalSevice.open(PrivateChatComponent);
    modalRef.componentInstance.toUser = toUser;
  }
}