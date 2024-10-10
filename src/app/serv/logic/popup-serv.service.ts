import { Injectable } from '@angular/core';
import { AreYouSureConfig } from '../mod/Types';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PopupServService {


  constructor() {}
  AddTeamBool: boolean = false;
  AddTaskBool: boolean = false;
  AddFileBool: boolean = false;
  AddCollBool: boolean = false;
  AddTagsBool: boolean = false;
  ComTaskBool: boolean = false;
  ArUSureBool: boolean = false;
  AUserToBool: boolean = false;

  // Editing Popups
  EdtTeamBool: boolean = false;
  EdtTaskBool: boolean = false;
  AdvancedCollView: boolean = false;

  ArYSureConf!: AreYouSureConfig;

  AreYouSureStatus = new BehaviorSubject<number>(0);

  enambleAreYouSure(
    titel: string,
    text: string,
    subtext: string,
    sub: Subscription
  ) {
    this.ArYSureConf = {
      title: titel,
      text: text,
      submitText: subtext,
      sub: sub,
    };
    this.ArUSureBool = true;
  }

}
