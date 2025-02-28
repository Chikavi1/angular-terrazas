import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetatagsService {
  constructor(private meta: Meta) {}

   addMetaTag(metaTag: MetaDefinition): void {
    this.meta.addTag(metaTag);
  }

   updateMetaTag(metaTag: MetaDefinition): void {
    this.meta.updateTag(metaTag);
  }

   removeMetaTag(selector: string): void {
    this.meta.removeTag(selector);
  }

   addMetaTags(metaTags: MetaDefinition[]): void {
    metaTags.forEach((tag) => this.meta.addTag(tag));
  }

   clearMetaTags(): void {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
  }
}