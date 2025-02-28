import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import {MatDialog} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchInputComponent } from '../search-input/search-input.component';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { MetatagsService } from '../services/metatags.service';
import { ApiService } from '../services/api.service';
import {  HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-index',
  imports: [CommonModule, FormsModule, SearchInputComponent, HttpClientModule],
  providers: [ ApiService ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  readonly dialog = inject(MatDialog);

  type = "terraice";
  capacity = 0;
  date: string = '';
  city = 'gdl';
  terraices: any[] = [];

  ngOnInit() {
    
    this.api.get('terraices').subscribe((res: any) => {
       this.terraices = res
    
        this.terraices = res.map((terraice: any) => ({
        ...terraice,
        images: terraice.images.map((img: string) =>
          this.sanitizer.bypassSecurityTrustResourceUrl(img.replace(/["\n]/g, ''))
        ),
        }));
      
      })

    this.addMetaTags();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.date = tomorrow.toISOString().split('T')[0];  
   }
  
  constructor(
    private metaService: MetatagsService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router) {
    
    // this.terraices = [
    //   {
    //     id: '1',
    //     name: 'Terraza Lupita',
    //     price: 2000,
    //     image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    //     capacity: 50,
    //     duration: 12,
    //   },
    //   {
    //     id: '2',
    //     name: 'Terraza Miguel',
    //     price: 2300,
    //     image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    //     capacity: 50,
    //     duration: 10,
    //   },
    //   {
    //     id: '3',
    //     name: 'Terraza Maria',
    //     price: 2500,
    //     image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    //     capacity: 20,
    //     duration: 10,
    //   },
    //   {
    //     id: '4',
    //     name: 'Terraza Poop',
    //     price: 2500,
    //     image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    //     capacity: 53,
    //     duration: 10,
    //   }
    // ]
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

  
  
  addMetaTags() {
    this.metaService.clearMetaTags();
     this.metaService.addMetaTags([
          { 
            name: 'description', 
            content: 'Descubre y renta las mejores terrazas para tus eventos. Encuentra espacios únicos al aire libre para fiestas, reuniones o celebraciones especiales. ¡Reserva ahora!' 
          },
          { 
            name: 'keywords', 
            content: 'renta de terrazas, terrazas para eventos, espacios al aire libre, fiestas en terraza, renta de espacios, terrazas exclusivas, eventos especiales' 
          },
          { 
            property: 'og:title', 
            content: 'Renta de Terrazas | Encuentra el Espacio Perfecto para tu Evento' 
          },
          { 
            property: 'og:description', 
            content: 'Explora nuestra plataforma y renta las terrazas más exclusivas para tus eventos. Ideal para fiestas, reuniones y celebraciones al aire libre. ¡Reserva hoy mismo!' 
          },
          { 
            property: 'og:image', 
            content: 'https://example.com/images/renta-terrazas-social.jpg' 
          },
          { 
            property: 'og:url', 
            content: 'https://www.tuplataforma.com' 
          },
          { 
            property: 'og:type', 
            content: 'website' 
          },
          { 
            name: 'twitter:card', 
            content: 'summary_large_image' 
          },
          { 
            name: 'twitter:title', 
            content: 'Renta de Terrazas | Encuentra el Espacio Perfecto para tu Evento' 
          },
          { 
            name: 'twitter:description', 
            content: 'Descubre y renta las mejores terrazas para tus eventos. Espacios únicos al aire libre para fiestas, reuniones o celebraciones especiales. ¡Reserva ahora!' 
          },
          { 
            name: 'twitter:image', 
            content: 'https://example.com/images/renta-terrazas-social.jpg' 
          }
      ]);
  }
  
}
