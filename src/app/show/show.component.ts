import { CommonModule } from '@angular/common';
 import * as L from 'leaflet';  // Importa Leaflet
 import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, model, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MetatagsService } from '../services/metatags.service';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: true,
  providers: [provideNativeDateAdapter(),ApiService,
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  imports: [CommonModule, MatCardModule, MatDatepickerModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
  
  
export class ShowComponent implements AfterViewInit {
  map: L.Map | undefined;
  selected = model<Date | null>(null);

  @ViewChild('originalButton') originalButton!: ElementRef;
  isButtonVisible: boolean = true;
  blockedDates: string[] = ['2025-02-10', '2025-02-15', '2025-02-20'];

  terraceId: number = 1;
  currentIndex = 0;


  filtrarFechas = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    const dateString = date.toISOString().split('T')[0];
    return !this.blockedDates.includes(dateString);
  };

  terrace: any = {} 
  slides = []
  id!: string;

  constructor(
    private metaService: MetatagsService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
      
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id)
      
    this.api.get('terraices/' + this.id).subscribe((res: any) => {
      console.log('resp: ', res)
      this.terrace = res
            
      this.slides = this.terrace.images.map((img: string) =>
        this.sanitizer.bypassSecurityTrustUrl(img.replace(/["\n]/g, ''))
      );
    
    
    })
    
  }
  
  ngOnInit(): void {

    this.route.params.subscribe(params => {
    this.id = params['id'];
    console.log('ID actualizado:', this.id);
  });
  
    this.initMap();





    // this.terrace = {
    //   id: "12345",
    //   name: "Terraza con vista al mar",
    //   photos: [
    //     "https://images.unsplash.com/photo-1600210492090-a159ffa3aeaf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     "https://images.unsplash.com/photo-1613685302957-3a6fc45346ef?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     "https://images.unsplash.com/photo-1580469322701-45b34d5e6e9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //   ],
    //   description: "Hermosa terraza con vista al mar, ideal para eventos privados.",
    //   capacity: 50,
    //   hours: 12,
    //   location: {
    //     address: "Calle Principal 123",
    //     city: "Barcelona",
    //     country: "España",
    //     latitude: 40.4167,
    //     longitude: -3.7033
    //   },
    //   amenities: ["wifi", "parrilla", "bar"],
    //   isAvailable: true,
    //   rating: 4.5,
    //   reviews: [
    //     { rating: 4, comment: 'Comentario 1' },
    //     { rating: 5, comment: 'Comentario 2' }
    //   ],
    //   pricing: [
    //     {
    //       weekdays: 1700,
    //       weekends: 2000,
    //     }
    //   ]
    // };    
    
    this.addMetaTags();
  }
 
    ngAfterViewInit() {
    const observer = new IntersectionObserver(([entry]) => {
      this.isButtonVisible = entry.isIntersecting; 
      this.cdr.detectChanges(); // 🔥 Forzamos la actualización de la vista
    });

    observer.observe(this.originalButton.nativeElement);
    }
  
  shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
  }
  
  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
  }

  shareLink() {
    if (navigator.share) {
      navigator.share({
        title: 'Título del enlace',
        text: 'Descripción breve',
        url: window.location.href
      })
      .then(() => console.log('Enlace compartido con éxito'))
      .catch((error) => console.log('Error al compartir:', error));
    } else {
      console.log('Web Share API no es compatible en este navegador');
    }
  }

   initMap(): void {
    this.map = L.map('map', {
      center: [
        20.66669199358015,
        -103.37385364882438],  
      zoom: 15
    });

    L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=es&x={x}&y={y}&z={z}&s=Ga', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
   }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
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
            content: 'Renta de terrazas, terrazas para eventos, espacios al aire libre, fiestas en terraza, renta de espacios, terrazas exclusivas, eventos especiales' 
          },
          { 
            property: 'og:title', 
            content:  '  | Encuentra el Espacio Perfecto para tu Evento' 
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
