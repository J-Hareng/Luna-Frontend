import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export const TOKENID = "TADJNFKEUNAEJASNDN"

@Injectable({
  providedIn: 'root'
})
export class LSServService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  private getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
  GetToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem(TOKENID)) || ""
    } 
    return ""
  }
  SetToken(t :string) {
    if (isPlatformBrowser(this.platformId)) {
      this.setItem(TOKENID, t )
    } 
    return
  }
  DelToken(){
    if (isPlatformBrowser(this.platformId)) {
      this.removeItem(TOKENID)
    } 
    return
  }
  
}