import { NgFor, NgIf } from "@angular/common";
import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from "@angular/core";
import { NgClass } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { compilePipeFromMetadata } from "@angular/compiler";
import { retry } from "rxjs";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: "app-luna-chips",
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: "./luna-chips.component.html",
  styleUrl: "./luna-chips.component.scss",
})
export class LunaChipsComponent implements AfterViewInit {
  @Input() fromControl: FormControl<LunaChipsObject[]> = new FormControl();

  @Input() chips: LunaChipsObject[] = [];
  @Input() cssInjectorClass: string = "";
  @Input() preeselectedChips: LunaChipsObject[] = [];

  @Input() UtilsButtons: boolean = false;
  @Input() UtilsSearch: boolean = false;
  @Input() AllaciveOnStart: boolean = false;

  selectedChips: LunaChipsObject[] = [];

  filter: string = "";

  @Output() selectedChipsEmitter = new EventEmitter<LunaChipsObject[]>();

  SearchFrom = new FormControl("");
  @ViewChild("tagSelection") tagSelection!: ElementRef;

  ngAfterViewInit() {
    if (this.preeselectedChips.length > 0) {
      this.selectedChips = this.preeselectedChips;
    }
    this.checkOverflow();
    if (this.AllaciveOnStart) {
      this.selectedChips = this.chips;
      this.selectedChipsEmitter.emit(this.selectedChips);
    }

    this.tagSelection.nativeElement.addEventListener("scroll", () =>
      this.checkOverflow()
    );
  }

  checkOverflow() {
    const element = this.tagSelection.nativeElement;
    const isOverflowing = element.scrollHeight > element.clientHeight;
    const isScrolledToTop = element.scrollTop === 0;
    const isScrolledToBottom =
      Math.round(element.scrollHeight - element.scrollTop) ==
      element.clientHeight;

    if (isOverflowing) {
      element.classList.add("shadow-top", "shadow-bottom");
      if (isScrolledToTop) {
        element.classList.remove("shadow-top");
      }
      if (isScrolledToBottom) {
        element.classList.remove("shadow-bottom");
      }
    } else {
      element.classList.remove("shadow-top", "shadow-bottom");
    }
  }
  constructor(private cdr: ChangeDetectorRef) {
    this.SearchFrom.valueChanges.subscribe((value) => {
      this.filter = value || "";
    });
  }

  isItemSelected(chip: LunaChipsObject): boolean {
    return ContainsChip(chip, this.selectedChips);
  }

  getCssClasses(): string {
    return "LunaChipWrapper " + this.cssInjectorClass;
  }

  chipIsKlicked(chip: LunaChipsObject) {
    if (ContainsChip(chip, this.selectedChips)) {
      this.selectedChips = this.selectedChips.filter(
        (element) => !isSameChip(element, chip)
      );
    } else {
      this.selectedChips.push(chip);
    }

    this.selectedChipsEmitter.emit(this.selectedChips);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  containsFilter(chip: LunaChipsObject): boolean {
    if (this.filter === "") {
      return true;
    }
    const f = this.filter.toLowerCase().split("");
    const n = chip.name.toLowerCase().split("");
    const i = 0;

    for (let c of f) {
      if (!n.includes(c)) {
        return false;
      }
      const index = n.indexOf(c);
      if (index === -1) {
        return false;
      } else {
        n.splice(index, 1);
      }
    }

    return true;
  }

  SetToAll() {
    this.selectedChips = this.chips;
    this.selectedChipsEmitter.emit(this.selectedChips);
  }

  SetToNone() {
    this.selectedChips = [];
    this.selectedChipsEmitter.emit(this.selectedChips);
  }
}

export interface LunaChipsObject {
  index: number;
  name: string;
}
export function LunaChipsObjectCreator(chipList: string[]): LunaChipsObject[] {
  return chipList.map((element, index) => {
    return { index: index, name: element };
  });
}

function ContainsChip(
  chip: LunaChipsObject,
  selectedChips: LunaChipsObject[]
): boolean {
  return selectedChips.some(
    (element) => element.name === chip.name && element.index === chip.index
  );
}
function isSameChip(chip1: LunaChipsObject, chip2: LunaChipsObject): boolean {
  return chip1.index === chip2.index && chip1.name === chip2.name;
}
