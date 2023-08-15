import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PopupComponent {
@Input() popupContent
@Input() popupHeader

}
