export class HousingLocation {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
    security: string;

    constructor(id: number, name: string, city: string, state: string, photo: string, availableUnits: number, wifi: boolean, laundry: boolean, security: string, ) {
     this.id = id;
     this.name = name;
     this.city = city;
     this.state = state;
     this.photo = photo;
     this.availableUnits = availableUnits;
     this.wifi = wifi;
     this.laundry = laundry;
     this.security = security;
    }
}