import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  submitted = false;
  apiErrorMessages: string[] = [];
  selectedGroupId: any;
  openChat = false;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  ngOnInit(): void {
  
  }
  onGroupSelected(selectedGroupId: any) {
    // Handle group selection here
    this.openChat = true;
    selectedGroupId = selectedGroupId;
    // You can also perform any additional actions needed when a group is selected
  }


  closeChat() {
    
    this.openChat = false;
    console.log("🚀 ~ file: home.component.ts:54 ~ HomeComponent ~ closeChat ~ openChat:", this.openChat)
  }
}