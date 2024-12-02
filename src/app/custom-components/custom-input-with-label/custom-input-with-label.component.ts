import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
@Component({
  selector: "app-custom-input-with-label",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: "./custom-input-with-label.component.html",
  styleUrl: "./custom-input-with-label.component.scss",
})
export class CustomInputWithLabelComponent {
  @Input() Preselected: string = "";
  @Input() surfaceLayer: string = "a0";
  @Input() label: string = "";

  @Output() selectedInputEmitter = new EventEmitter<string>();

  InputFrom: FormControl = new FormControl("");
  constructor() {
    this.InputFrom.registerOnChange(() => {
      console.log(this.InputFrom.value);
    });
  }
  getSurfaceLayerClass(): string {
    return this.surfaceLayer;
  }
}
