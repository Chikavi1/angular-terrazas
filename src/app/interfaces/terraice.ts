interface terraiceInterface {
    id: string;  
    title: string;  
    photos: string[];  
    description: string; 
    capacity: number; 
    pricePerHour: number;  
    location: {
        address: string;  
        city: string;  
        country: string; 
        latitude: number; 
        longitude: number;  
    };
    amenities: string[]; // Lista de comodidades (ej: wifi, parrilla, etc.)
    isAvailable: boolean;  
    rating?: number;  
    reviews?:  object[];
    pricing: object[ ];
}