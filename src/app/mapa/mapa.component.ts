import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
 import * as L from 'leaflet';  
import { SearchInputComponent } from '../search-input/search-input.component';
import { MetatagsService } from '../services/metatags.service';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-mapa',
  imports: [CommonModule, SearchInputComponent,HttpClientModule],
   providers: [ ApiService ],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {


  map: L.Map | undefined;
  terraices: any = [];

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private metaService: MetatagsService) { }

  ngOnInit(): void {
    this.initMap();
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
  }

 
  initMap(): void {
    this.map = L.map('map', {
      center: [20.66669199358015, -103.37385364882438],
      zoom: 15
    });

    L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=es&x={x}&y={y}&z={z}&s=Ga', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const locations = [
      { lat: 20.6667, lng: -103.3738, name: "Ubicación 1" },
      { lat: 20.6700, lng: -103.3700, name: "Ubicación 2" },
    ];

    if (this.map) {
      locations.forEach(loc => {

        const marker = L.marker([loc.lat, loc.lng]).addTo(this.map!)
         const popupContent = `
          <div style="
            max-width: 220px; 
            font-family: Arial, sans-serif;
          ">
            <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Imagen" 
              style="width: 100%; border-radius: 5px; margin: 10px 0;">

            <h3 style="margin: 0; font-size: 16px; color: #007bff;">${loc.name}</h3>
             <a  target="_blank" href="/terraza/1"
              style="
                padding: 8px 12px; 
                background: #28a745; 
                color: white; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer;
              ">
              Ver más
            </a>
          </div>
        `;

        marker.bindPopup(popupContent);  
 
        
      });
    }
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