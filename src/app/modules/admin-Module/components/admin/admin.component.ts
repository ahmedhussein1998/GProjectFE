import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/modules/shared-module/Services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  showLoader!:boolean;
  loadApp!:boolean;
  constructor(public auth:AuthService) {
  }

  ngOnInit(){
    this.loadApp = true;
    this.auth.showLoader(true)
    this.auth.showLoaderSubject$.subscribe(data=>{
      this.showLoader = data
    })

    setTimeout(() => {
      this.loadApp = true
      this.auth.showLoader(false); // Hide the loader after content is loaded
    }, 3000);
  }
}
