import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {tuiLoaderOptionsProvider} from '@taiga-ui/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiLoaderOptionsProvider({
        size: 'xxl',
        inheritColor: true,
        overlay: true,
    }),
],
})
export class LoaderComponent {
@Input() loader!:boolean
}
