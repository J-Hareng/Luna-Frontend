import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
@Component({
  selector: 'app-luna-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './luna-input.component.html',
  styleUrl: './luna-input.component.scss',
})
export class LunaInputComponent {
  @Input() Preselected: string = "";
  @Input() surfaceLayer: string = "a0";
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() FormControl: FormControl = new FormControl("");

  @Output() selectedInputEmitter = new EventEmitter<string>();

  constructor() {
    this.FormControl.valueChanges.subscribe((value) => {
      this.selectedInputEmitter.emit(value);
    });
  }
  getSurfaceLayerClass(): string {
    return this.surfaceLayer;
  }
}
