import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[TuiSvgModule]
})
export class DotsComponent {
  @Output() openPopup = new EventEmitter();
  onDotsClick(){
    this.openPopup.emit(true)
  }
}
