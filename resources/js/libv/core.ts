import CarParkService from '../services/CarParkService';



interface CarPark {

    operatorID?: string;
    carparkID?: string;
    CustomerID?: string;
    CompanyID?: string;
    licenseID?: string;
}



export class Core implements CarPark {
    operatorID: string;
    carparkID: string;

    constructor(public operator: string, public carpark: string) {
        this.operatorID = operator
        this.carparkID = carpark;
    }

    loadData(config: CarPark) {
        CarParkService.fetchAllData(`operator/${config.operatorID}/`);
    }

    
    
}

