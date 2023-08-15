import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressbarComponent{
@Input() value:number = 0;
@Output() valueChanged = new EventEmitter();
@Input() routeName:string ="";
primary = '#480A86'
onValueChanged(value:number){
  this.valueChanged.emit(value);
}
}
