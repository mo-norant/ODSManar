
    export class Address {
        addressID: number;
        street: string;
        number: string;
        zipcode: string;
        city: string;
        country: string;
    }

    export class Company {
        companyID: number;
        companyName: string;
        createDate: Date;
        phone: string;
        address: Address;
    }

    export class Weight {
        weightID: number;
        weightX: number;
        metric: string;
    }

    export class LocationOogstKaartItem {
        locationID : number
        latitude : number
        longtitude	:number
        }

    export class OogstKaartItem {
        oogstkaartItemID: number;
        createDate: Date;
        omschrijving: string;
        afbeeldingURL: string;
        artikelnaam: string;
        jansenserie: string;
        coating: string;
        glassamenstelling: string;
        datumBeschikbaar: Date;
        company: Company;
        location: LocationOogstKaartItem;
        hoeveelheid: number;
        category: string
        afmetingen: string;
        weight: Weight;
        vraagPrijsPerEenheid: number;
        vraagPrijsTotaal: number;
        transportInbegrepen: boolean;
        status: string;
        onlineStatus: boolean;
        concept: string;    
        userID: string;  
        Views: number;
        avatar : Avatar;
        
    }

    export class Avatar {
        date : Date;
        imageID: number;
        name : string;
        uri: string;
    }

        
