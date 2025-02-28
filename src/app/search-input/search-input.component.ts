import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  imports: [ FormsModule ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
 capacity = 6;
  date: string = '';
  city = 'gdl';

  constructor(private router: Router) { }

   increment() {
    this.capacity++;
  }

  decrement() {
    if (this.capacity > 6) {
      this.capacity--;
    }
  }

  validateCapacity() {
    if (this.capacity < 1 || isNaN(this.capacity)) {
      this.capacity = 1;
    }
}


    search() {
      console.log(this.city)
      console.log(this.date);
      console.log(this.capacity);
  
      this.router.navigate(['/search'], { queryParams: { city: this.city, date: this.date, capacity: this.capacity } });
  
  
    }

}
