import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-luna-filter-selector",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./luna-filter-selector.component.html",
  styleUrl: "./luna-filter-selector.component.scss",
})
export class LunaFilterSelectorComponent {
  @Input() filterList: string[] = [];
  @Input() Identifier: string = "";
  currentFilter: string = "";

  @Output() sFilter = new EventEmitter<string>();

  Clicked(filter: string) {
    if (this.currentFilter === filter) {
      this.currentFilter = "";
    } else {
      this.currentFilter = filter;
    }

    this.sFilter.emit(this.currentFilter);
  }
  IsActive(filter: string) {
    return this.currentFilter === filter;
  }
}
