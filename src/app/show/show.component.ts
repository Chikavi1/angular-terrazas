import { CommonModule } from '@angular/common';
 import * as L from 'leaflet';  // Importa Leaflet
 import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, model, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-show',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide:  MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  imports: [CommonModule,MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements AfterViewInit{
  map: L.Map | undefined;
  selected = model<Date | null>(null);

    @ViewChild('originalButton') originalButton!: ElementRef;
    isButtonVisible: boolean = true;  
    blockedDates: string[] = ['2025-02-10', '2025-02-15', '2025-02-20'];

  filtrarFechas = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);  
    if (date < today) return false;
     const dateString = date.toISOString().split('T')[0];  
    return !this.blockedDates.includes(dateString);
  };

  
  constructor(private cdr: ChangeDetectorRef) {}
  
   ngOnInit(): void {
    this.initMap();
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
  
  terraceId: number = 1;

  slides = [
    { image: 'https://images.unsplash.com/photo-1600210492090-a159ffa3aeaf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { image: 'https://images.unsplash.com/photo-1613685302957-3a6fc45346ef?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { image: 'https://images.unsplash.com/photo-1580469322701-45b34d5e6e9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];
  
  currentIndex = 0;

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
  }
 
  terrace = {
    id: 1,
    name: 'Terraza 1',
    description: 'Descripción de la terraza 1',
    image: 'https://images.unsplash.com/photo-1600210492090-a159ffa3aeaf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 100,
    location: 'Ubicación de la terraza 1',
    capacity: 10,
    available: true,
    amenities: [
      {
        icon: 'fa-wifi',
        name: 'Internet',
      },
      {
        icon: 'fa-music',
        name: 'Bocina',
      },
      {
        icon: 'fa-utensils',
        name: 'Cocina',
      }
    ],
    reviews: [
      { rating: 4, comment: 'Comentario 1' },
      { rating: 5, comment: 'Comentario 2' }
    ],

  }

}
