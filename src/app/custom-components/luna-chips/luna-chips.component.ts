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
  @Input() chips: LunaChipsObject[] = [];
  @Input() cssInjectorClass: string = "";

  @Input() UtilsButtons: boolean = false;
  @Input() UtilsSearch: boolean = false;

  selectedChips: LunaChipsObject[] = [];

  filter: string = "";

  @Output() selectedChipsEmitter = new EventEmitter<LunaChipsObject[]>();

  SearchFrom = new FormControl("");
  @ViewChild("tagSelection") tagSelection!: ElementRef;

  ngAfterViewInit() {
    this.checkOverflow();
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
    console.log("chipIsKlicked");
    console.log(chip);
    console.log(this.selectedChips);
    console.log(this.selectedChips.includes(chip));

    if (ContainsChip(chip, this.selectedChips)) {
      console.log("chipContaint");
      this.selectedChips = this.selectedChips.filter(
        (element) => !isSameChip(element, chip)
      );
    } else {
      console.log("chipNotContaint");
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
