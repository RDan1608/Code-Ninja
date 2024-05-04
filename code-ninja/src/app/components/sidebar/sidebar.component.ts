import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/store';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  loginOptions = false;
  codeOptions = false;
  profileOptions = false;
  @Output() downloadEvent = new EventEmitter<boolean>();
  userId: string = '';

  constructor(private route: Router, private watchRoute: ActivatedRoute, private communicationService: CommunicationService ) {

    this.route.events.subscribe( event => {
    
    if(event instanceof NavigationEnd){
      console.log(event.url)
      this.validateRoute( event.url)
      
      } 
    }
       
      );
  } 

  ngOnInit() {
    this.watchRoute.params.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId);
      });
  }

  validateRoute (currentPath : string){
    this.loginOptions=false;
    this.codeOptions=false;
    this.profileOptions = false;

    if (
      currentPath === '/' ||
      currentPath ==='/login' ||
      currentPath ==='/signup'
    ) {
      this.loginOptions = true;
    }

    if (currentPath.includes('code') ) {
      this.codeOptions = true;
    }

    if (
      currentPath.includes('profile') ||
      currentPath.includes('folders') ||
      currentPath.includes('color')  ||
      currentPath.includes('plans')  ||
      currentPath.includes('files') 
    ) {
      this.profileOptions = true;
    }


  }

  emitDownload() {
    this.communicationService.emitDownloadEvent();
    this.downloadEvent.emit(true);
  }

  emitShare() {
    this.communicationService.emitShareEvent();
  }

  navegarLandingpage() {
    this.route.navigate(['/']);
  }

  navegarFolder() {
    this.route.navigate(['folders', window.localStorage.getItem('userId')]);
  }

  navegarPlanes() {
    this.route.navigate(['plans', window.localStorage.getItem('userId')]);
  }
  navegarColor() {
    this.route.navigate(['color', window.localStorage.getItem('userId')]);
  }
  navegarPerfil() {
    this.route.navigate(['profile', window.localStorage.getItem('userId')]);
  }
}
