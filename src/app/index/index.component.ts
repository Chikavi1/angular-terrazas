import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import {MatDialog} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-index',
  imports: [CommonModule, FormsModule ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  readonly dialog = inject(MatDialog);

  type = "terraice";
  capacity = 10;
  date: string = '';

  ngOnInit() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Asigna la fecha sin convertirla de nuevo a Date
  this.date = tomorrow.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
   
  setType(type: string) {
    this.type = type;
  }

  openDialog() {
      const dialogRef = this.dialog.open(ServicesComponent, {
        width: '90vw',});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

}
