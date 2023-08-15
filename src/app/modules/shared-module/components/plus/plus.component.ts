import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[TuiSvgModule]
})
export class PlusComponent {

}
