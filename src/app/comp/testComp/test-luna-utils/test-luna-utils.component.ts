import { Component } from "@angular/core";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../custom-components/luna-chips/luna-chips.component";
import { LunaInputComponent } from "../../../custom-components/luna-input/luna-input.component";
import { LunaTextareaComponent } from "../../../custom-components/luna-textarea/luna-textarea.component";
import { FormControl } from "@angular/forms";
import { LunaSlideToggleComponent } from "../../../custom-components/luna-slide-toggle/luna-slide-toggle.component";
@Component({
  selector: "app-test-luna-utils",
  standalone: true,
  imports: [
    LunaChipsComponent,
    LunaInputComponent,
    LunaTextareaComponent,
    LunaSlideToggleComponent,
  ],
  templateUrl: "./test-luna-utils.component.html",
  styleUrl: "./test-luna-utils.component.scss",
})
export class TestLunaUtilsComponent {
  LunaChipsTestList: LunaChipsObject[] = LunaChipsObjectCreator([
    "banana",
    "apple",
    "orange",
    "kiwi",
    "pear",
    "grape",
    "cock",
  ]);
  textareaForm = new FormControl("");
  lunaSliderForm = new FormControl("");
  lunachipevent(event: any) {
    console.log(event);
  }

  onInputChange(event: string) {
    console.log(event);
  }
}
