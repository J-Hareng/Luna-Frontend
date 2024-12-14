import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { EditCollectionComponent } from "../../comp/m-p-comp/popups/CollectionsFiles/edit-collection/edit-collection.component";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-luna-slide-toggle",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./luna-slide-toggle.component.html",
  styleUrl: "./luna-slide-toggle.component.scss",
})
export class LunaSlideToggleComponent {
  @Input() FromControl: FormControl = new FormControl(false);
  @Input() label: string = "";
}
