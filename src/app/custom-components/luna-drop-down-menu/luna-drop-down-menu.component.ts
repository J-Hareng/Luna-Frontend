import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-luna-drop-down-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./luna-drop-down-menu.component.html",
  styleUrl: "./luna-drop-down-menu.component.scss",
})
export class LunaDropDownMenuComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() items: LunaDropDownObject[] = [];
  @Input() selecteditem: LunaDropDownObject = LunaDropDownObjectCreator(
    0,
    "Select Value"
  );
  @Output() selected = new EventEmitter<LunaDropDownObject>();

  SelectedBuffer!: number;

  @ViewChild("wrapperId") WrapperElement!: ElementRef;
  @ViewChild("contentId") ContentElement!: ElementRef;
  @ViewChild("entireWrapperId") AlwaysShownElement!: ElementRef;
  Open: boolean = false;
  Width: number = 0;
  ngAfterViewInit(): void {
    this.Width = this.getMinContentWidth(this.ContentElement);

    this.styleDropDown();
    this.SelectedBuffer = this.selecteditem.index;
  }

  styleDropDown() {
    if (this.WrapperElement && this.WrapperElement.nativeElement) {
      this.WrapperElement.nativeElement.style.width = this.Width + "px";
      const positionOfWrapper =
        this.WrapperElement.nativeElement.getBoundingClientRect();
      const DDwidth = positionOfWrapper.width;
      const DDLeft = positionOfWrapper.left;

      const computedStyle = window.getComputedStyle(
        this.AlwaysShownElement.nativeElement
      );
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const totalPadding = paddingLeft + paddingRight;
      console.log("totalPadding", totalPadding);

      if (this.ContentElement && this.ContentElement.nativeElement) {
        // this.ContentElement.nativeElement.style.width =
        //   DDwidth + totalPadding + "px";

        this.ContentElement.nativeElement.style.left =
          DDLeft - paddingLeft + "px";

        this.ContentElement.nativeElement.style.top =
          positionOfWrapper.bottom + "px";
      } else {
        console.error("ContentElement is not defined");
      }
    } else {
      console.error("WrapperElement is not defined");
    }
  }
  updateWidth() {
    this.Width = this.getMinContentWidth(this.ContentElement);
  }

  getMinContentWidth(element: ElementRef): number {
    // const originalWidth = element.nativeElement.style.width;
    element.nativeElement.style.whiteSpace = "nowrap";
    element.nativeElement.style.width = "min-content";
    const minContentWidth = element.nativeElement.getBoundingClientRect().width;
    // element.nativeElement.style.width = originalWidth;

    return minContentWidth;
  }

  clickedItem(item: LunaDropDownObject) {
    this.selecteditem = item;
    this.selected.emit(item);
    this.cdr.detectChanges(); // Ensure the DOM updates are applied
    this.styleDropDown();
    this.CloseDDL();
  }
  OpenDDL() {
    if (!this.Open) {
      this.Open = true;
    }
    this.styleDropDown();
  }
  CloseDDL() {
    if (this.Open) {
      this.Open = false;
    }
    // this.styleDropDown();
  }
}

export interface LunaDropDownObject {
  index: number;
  name: string;
}
export function LunaDropDownObjectCreator(
  index: number,
  name: string
): LunaDropDownObject {
  const lunaDropDownObject: LunaDropDownObject = {
    index: index,
    name: name,
  };
  return lunaDropDownObject;
}
