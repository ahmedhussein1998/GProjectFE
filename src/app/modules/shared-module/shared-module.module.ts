import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {AceeditorComponent} from './components/aceeditor/aceeditor.component';
import {CodeparserComponent} from './components/codeparser/codeparser.component';
import {AceEditorModule} from 'ng12-ace-editor';
import {ProgressbarComponent} from './components/progressbar/progressbar.component';
import {TuiAppBarModule} from '@taiga-ui/addon-mobile';
import {TuiProgressModule} from '@taiga-ui/kit';
import {RouterModule} from '@angular/router';
import {TuiDialogModule, TuiLoaderModule, TuiRootModule, TuiSvgModule} from '@taiga-ui/core';
import {LoaderComponent} from './components/loader/loader.component';
import {PaginationComponent} from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    AceeditorComponent,
    CodeparserComponent,
    ProgressbarComponent,
    LoaderComponent,
    PaginationComponent,
  ],

  exports:[
    FooterComponent,
    ProgressbarComponent,
    SidebarComponent,
    LoaderComponent,

  ],
  imports: [
    AceEditorModule,
    TuiAppBarModule,
    TuiProgressModule,
    RouterModule,
    TuiSvgModule,
    TuiLoaderModule,
    CommonModule,
    TuiRootModule,
    TuiDialogModule
  ],
})
export class SharedModuleModule { }
