import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { authenticateGuard } from '../shared-module/Guards/authenticate.guard';
import { ChatComponent } from './components/chat/chat.component';
import { PrivateChatComponent } from './Components/private-chat/private-chat.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { ChatInputComponent } from './Components/chat-input/chat-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Components/home/home.component';
import { GroupListComponent } from './Components/group-list/group-list.component';


const routes: Routes = [
  { path: 'Home',  component: HomeComponent },
  { path: 'Home',  component: HomeComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  declarations: [
    ChatComponent,
    PrivateChatComponent,
    MessagesComponent,
    ChatInputComponent,
    HomeComponent,
    GroupListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModuleModule { }
