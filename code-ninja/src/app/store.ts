// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private downloadEventSource = new Subject<void>();
  private shareEventSource = new Subject<void>();

  downloadEvent$ = this.downloadEventSource.asObservable();
  shareEvent$ = this.shareEventSource.asObservable();

  emitDownloadEvent() {
    this.downloadEventSource.next();
  }

  emitShareEvent() {
    this.shareEventSource.next();
  }
}
