import { Planet } from './planet';
import { Vehicle } from './vehicle';
export interface Destination {
    id: number,
    planets: Array<Planet>,
    vehicles: Array<Vehicle>
}
