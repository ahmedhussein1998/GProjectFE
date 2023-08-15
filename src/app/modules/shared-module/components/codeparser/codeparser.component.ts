import {Component, ViewChild} from '@angular/core';
import * as parser from 'node-sql-parser';
import {AceeditorComponent} from '../aceeditor/aceeditor.component';

@Component({
  selector: 'app-codeparser',
  templateUrl: './codeparser.component.html',
  styleUrls: ['./codeparser.component.scss'],
})
export class CodeparserComponent {
  @ViewChild(AceeditorComponent)
  private editorComponent!: AceeditorComponent;
  text:string = "";
  parsedQuery: any;
  error: any;
  disableEditor: boolean = true;
  databaseType: string = "";
  clearData: boolean = true;
  ngOnInit():void{
   this.disableEditor = true;
  }
  getQuery(event:any):void{
   let query = event;
   this.analyzeQuery(query, this.databaseType);
  }

  analyzeQuery(query:string , database:string){
    const options = {
      database: database
    }
    try{
      let parsing = new parser.Parser();
      this.parsedQuery = parsing.parse(query , options)
      this.error = null;
    } catch(err){
      this.error = err;
      this.parsedQuery = null;
    }
  }
  updateSyntax(event:any){
    this.databaseType = event.target?.value;
    if(this.databaseType == null || this.databaseType == undefined || this.databaseType == ""){
      this.disableEditor = true;
    }
    else{
      this.disableEditor = false;
      this.clearData = true;
      this.clearSqlEditor();
    }
  }
  clearSqlEditor(){
    this.editorComponent.clear();
  }
}
