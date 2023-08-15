import {ChangeDetectionStrategy, Component, EventEmitter, Output,} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dicard-changes',
  templateUrl: './dicard-changes.component.html',
  styleUrls: ['./dicard-changes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[ButtonComponent , CommonModule]
})
export class DicardChangesComponent {
  @Output() discardConfirmed = new EventEmitter<void>();
  @Output() discardCanceled = new EventEmitter<void>();
  primary:string = 'primary'
  button:string = 'button'
  btnName:string = 'Yes, Discard';
  secBtnName:string = 'No, Keep'
  confirmDiscard(): void {
    this.discardConfirmed.emit();
  }
  cancelDiscard():void{
    this.discardCanceled.emit();
  }
}
