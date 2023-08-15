import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-sqlserver';

@Component({
  selector: 'app-aceeditor',
  templateUrl: './aceeditor.component.html',
  styleUrls: ['./aceeditor.component.scss']
})
export class AceeditorComponent {
  @ViewChild('editor') editor:any;
  @Output() textChange = new EventEmitter<string>();
  @Input() text:string = "";
  @Input() readonly:boolean = true;
  // @Input() clear:boolean;

  editorOptions = {
    fontSize: '20px',
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    wrap: true,
    behavioursEnabled: true,
    readOnly: false,
    theme: 'sqlserver',
    annotations: [
      {
        row: 1,
        column: 10,
        text: 'Syntax error: unexpected token',
        type: 'error'
      }
    ]
  };

  emitTextChange(event:any) {
    this.textChange.emit(event);
  }
  clear(){
    this.editor.getEditor().setValue('');
  }
}
