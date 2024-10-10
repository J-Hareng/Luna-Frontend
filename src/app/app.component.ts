import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialTestComponent } from './comp/testComp/material-test/material-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LunaProdV1Client';
}
