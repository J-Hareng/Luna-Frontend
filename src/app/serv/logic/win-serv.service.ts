import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface WindowSize {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class WinServService {
  size$: Observable<WindowSize>;

  constructor() {
    this.size$ = fromEvent(window, 'resize').pipe(
      startWith(this.getWindowSize()),
      map(() => this.getWindowSize())
    );
  }

  private getWindowSize(): WindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  public IsMobile(): boolean {
    return window.innerWidth < 800;
  }
}
