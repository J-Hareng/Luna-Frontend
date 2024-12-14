import { Component } from "@angular/core";
import { Input, Output } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { NgClass, CommonModule } from "@angular/common";
@Component({
  selector: "app-luna-textarea",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./luna-textarea.component.html",
  styleUrl: "./luna-textarea.component.scss",
})
export class LunaTextareaComponent {
  @Input() Preselected: string = "";
  @Input() surfaceLayer: string = "a0";
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() FormControl: FormControl = new FormControl("");

  // @Output() selectedInputEmitter = new EventEmitter<string>();
  getSurfaceLayerClass(): string {
    return this.surfaceLayer;
  }
}
