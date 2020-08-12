import { Component, OnInit } from '@angular/core';
import { FindFalconeService } from '../../services/find-falcone.service';
import { Destination } from '../../interface/destination';
import { Planet } from 'src/app/interface/planet';
import { Vehicle } from 'src/app/interface/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-falcone',
  templateUrl: './find-falcone.component.html',
  styleUrls: ['./find-falcone.component.scss']
})
export class FindFalconeComponent implements OnInit {

  foundPlanet: Map<number,Object>;
  destinations:Array<Destination>;
  time: number;

  constructor(private falconeService: FindFalconeService, private router: Router) {
    this.foundPlanet = new Map;
    this.destinations = [];
    this.time = 0;
  }

  ngOnInit(): void {
    let planetReq= this.falconeService.getPlanets();
    let vehicleReq= this.falconeService.getVehicles();
    Promise.all([planetReq,vehicleReq]).then((res: any[]) => {
      for(let i=1 ; i <= 4 ; i++){
        let planetRes: Array<Planet> = res[0];
        let vehicleRes: Array<Vehicle> = res[1];
        let obj = {
          id: i,
          planets: JSON.parse(JSON.stringify(planetRes)),
          vehicles: JSON.parse(JSON.stringify(vehicleRes))
        }
        this.destinations.push(obj);
      }
    });
  }
  async getToken(){
    let token = '';
    await this.falconeService.getToken().then(res => {
      token = res['token'];
    });
    return token;
  }

  async findFalcone(){
    let token = null;
    token = await this.getToken();
    let { request, response }: { request: Object; response: any; } = this.constructFalconeReq(token);

    this.falconeService.findFalcone(request).then((res) => {
      response = res;
      this.router.navigate(['message', { message: response, time: this.time }]);
    }, err => {
      console.log(err);
    });
    this.router.navigate(['message', { message: JSON.stringify(response), time: this.time }]);
  }

  private constructFalconeReq(token: string) {
    let selectedPlanets: Array<Object> = [];
    let selectedVehicles: Array<Object> = [];
    let request: Object = {};
    let response: any;

    this.foundPlanet.forEach((val, key) => {
      selectedPlanets.push(val["planet"].name);
      selectedVehicles.push(val["vehicle"].name);
    });

    request = {
      "token": token,
      "planet_names": selectedPlanets,
      "vehicle_names": selectedVehicles
    };
    return { request, response };
  }

  generateTime(){
    let time = 0;
    if(this.foundPlanet){
      this.foundPlanet.forEach((val,key) => {
        time = time + (val['planet'].distance / val['vehicle'].speed)
      });
    }
    return time;
  }

  checkDisabled(){
    if(this.foundPlanet && this.foundPlanet.size == this.destinations.length){
      return false;
    }
    return true;
  }

  catchSelected(event){    
    if(event != null && event.status == "success"){
      let planetName = event.planet;
      let vehicleName = event.vehicle;
      let prevPlanetName = event.prevPlanet;
      let prevVehicleName = event.prevVehicle;
      this.foundPlanet.set(event.index,{
        planet: planetName,
        vehicle: vehicleName
      });
      this.destinations.forEach((element,index) => {
        if(event.index != (index+1)){
          element['planets'].forEach((res)=>{
            if(res.name == planetName.name){
              res.disabled = true;
            }
          });
        } else {
          element['planets'].forEach((res)=>{
            if(prevPlanetName && res.name == prevPlanetName.name){
              res.disabled = false;
            }
          });
        }        
        element['vehicles'].forEach((res)=>{
          if(res.name == vehicleName.name){
            res.used = (res.used ? res.used : 0) + 1;
          }
          if(prevVehicleName && res.name == prevVehicleName.name){
            res.used = (res.used && res.used != 0 ? res.used : 1) - 1;
          }
        });
      });
    }
    this.time = this.generateTime();
  }

}
