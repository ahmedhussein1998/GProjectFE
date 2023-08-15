import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output,} from '@angular/core';
import {PlusComponent} from '../plus/plus.component';
import {TuiButtonModule, TuiErrorModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlusComponent, TuiButtonModule, TuiErrorModule, CommonModule],
})
export class ButtonComponent {
  @Input() btnName: string;
  @Input() type: string;
  @Input() appearence: string;
  @Input() addIcon!: boolean;
  @Input() disabledBtn: boolean = false;
  @Output() eventHandler = new EventEmitter();
  handleEvent() {
    this.eventHandler.emit();
  }
}
