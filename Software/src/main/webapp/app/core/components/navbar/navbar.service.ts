import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private projectChangedSubject = new Subject<void>();

  // Observable para que el navbar se suscriba
  projectChanged$ = this.projectChangedSubject.asObservable();

  // Método para emitir el evento de cambio de proyecto
  notifyProjectChanged() {
    this.projectChangedSubject.next();
  }
}
