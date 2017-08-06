export interface BeaconForm {
    // all inputs are required
    host: {
        firstName: string;
        lastName: string;
    }    
    school:string;
    courseCode:string;
    startTime:number;
    endTime:number;
    lat:number;
    lng:number;
    hasWifi: boolean;
	hasComputers: boolean;
	hasOutlets: boolean;
	hasWhiteboard: boolean;
	hasProjector: boolean;
}