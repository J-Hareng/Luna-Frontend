import { Component } from "@angular/core";
import {
  LunaChipsComponent,
  LunaChipsObject,
  LunaChipsObjectCreator,
} from "../../../custom-components/luna-chips/luna-chips.component";
import { CustomInputWithLabelComponent } from "../../../custom-components/custom-input-with-label/custom-input-with-label.component";
@Component({
  selector: "app-test-luna-utils",
  standalone: true,
  imports: [LunaChipsComponent, CustomInputWithLabelComponent],
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
  lunachipevent(event: any) {
    console.log(event);
  }

  onInputChange(event: string) {
    console.log(event);
  }
}
