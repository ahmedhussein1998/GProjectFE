import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {tableRoleHeaderDto} from '../../models/interfaces';
import {ToggleComponent} from '../toggle/toggle.component';
import {CommonModule} from '@angular/common';
import {DotsComponent} from '../dots/dots.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[ToggleComponent , CommonModule , DotsComponent]
})
export class TableComponent {
  @Input() header:tableRoleHeaderDto ;
  @Input() dataValues = [];
  @Input() isActiveExist!:boolean // to check if the table has toggle action or not
  @Input() environments!:boolean; // to check if the table has environments or not
  @Input() noDescription!:boolean; // to check if the table has Description or not
  @Input() email!:boolean; // to check if the table has email or not
  @Input() roles!:boolean; // to check if the table has environment assigned or not
  @Input() approve!:boolean; // to check if the table has environment approve or not
  @Output() show = new EventEmitter();
  handleToggle(event , elementId){
    console.log(event , elementId);
  }
  editValue(id){
    this.show.emit(id);
  }
}
