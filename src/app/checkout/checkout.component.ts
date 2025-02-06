import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ServicesComponent } from '../services/services.component';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  readonly dialog = inject(MatDialog);


  openDialog() {
    const dialogRef = this.dialog.open(ServicesComponent,{
      width: '90vw',});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
