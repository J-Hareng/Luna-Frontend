import { Component } from "@angular/core";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../custom-components/luna-chips/luna-chips.component";
import { LunaInputComponent } from "../../../custom-components/luna-input/luna-input.component";
import { LunaTextareaComponent } from "../../../custom-components/luna-textarea/luna-textarea.component";
import { FormControl, FormsModule } from "@angular/forms";
import { LunaSlideToggleComponent } from "../../../custom-components/luna-slide-toggle/luna-slide-toggle.component";
import { LunaFileUploadAndLocationSelectorComponent } from "../../../custom-components/luna-file-upload-and-location-selector/luna-file-upload-and-location-selector.component";
import {
  LunaChipsObjectGetSelectedChipList,
  LunaFromChipsComponent,
} from "../../../custom-components/luna-from-chips/luna-from-chips.component";
@Component({
  selector: "app-test-luna-utils",
  standalone: true,
  imports: [
    LunaChipsComponent,
    LunaInputComponent,
    LunaTextareaComponent,
    LunaSlideToggleComponent,
    LunaFileUploadAndLocationSelectorComponent,
    LunaFromChipsComponent,
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
  LunaChipsTestListPreselect: LunaChipsObject[] =
    LunaChipsObjectGetSelectedChipList(this.LunaChipsTestList, [
      "banana",
      "orange",
      "pear",
      "grape",
    ]);

  lunaChipFromTest = new FormControl(this.LunaChipsTestListPreselect || []);
  constructor() {
    this.lunaChipFromTest.valueChanges.subscribe((value) => console.log(value));
  }

  textareaForm = new FormControl("");
  lunaSliderForm = new FormControl("");
  lunachipevent(event: any) {
    console.log(event);
  }

  onInputChange(event: string) {
    console.log(event);
  }
}
