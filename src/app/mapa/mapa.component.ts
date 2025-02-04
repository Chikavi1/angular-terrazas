import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
 import * as L from 'leaflet';  

@Component({
  selector: 'app-mapa',
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {
  map: L.Map | undefined;
  

  ngOnInit(): void {
    this.initMap();
  }
  
  terrazas: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
  

}
