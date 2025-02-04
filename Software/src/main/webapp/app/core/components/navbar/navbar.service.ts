import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private projectChangedSubject = new Subject<void>();

  private typeChangedSubject = new Subject<void>();

  private userChangedSubject = new Subject<void>();

  private roleChangedSubject = new Subject<void>();

  private iterationChangedSubject = new Subject<void>();

  // Observable para que el navbar se suscriba
  projectChanged$ = this.projectChangedSubject.asObservable();

  typeChanged$ = this.typeChangedSubject.asObservable();

  userChanged$ = this.userChangedSubject.asObservable();

  roleChanged$ = this.roleChangedSubject.asObservable();

  iterationChanged$ = this.iterationChangedSubject.asObservable();

  // Método para emitir el evento de cambio de proyecto
  notifyProjectChanged() {
    this.projectChangedSubject.next();
  }

  notifyTypeChanged() {
   this.typeChangedSubject.next();
  }

  notifyUserChanged() {
   this.userChangedSubject.next();
  }

  notifyRoleChanged() {
   this.roleChangedSubject.next();
  }

  notifyIterationChanged() {
    this.iterationChangedSubject.next();
  }
}
