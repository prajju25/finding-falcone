import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Destination } from 'src/app/interface/destination';
import { Vehicle } from 'src/app/interface/vehicle';
import { Planet } from 'src/app/interface/planet';

@Component({
  selector: 'app-falcone-box',
  templateUrl: './falcone-box.component.html',
  styleUrls: ['./falcone-box.component.scss']
})
export class FalconeBoxComponent implements OnInit {

  @Input('destination') destination:Destination;
  @Output('selectedEmit') selectedEmit = new EventEmitter();
  isDestSelected: boolean = false;
  selectedPlanet:Planet;
  prevPlanet:Planet;
  selectedVehicle:Vehicle;
  prevVehicle:Vehicle;
  constructor() { }

  ngOnInit(): void {
  }

  selectPlanet(event){
    this.isDestSelected = true;
    this.prevPlanet = this.selectedPlanet;
    this.destination.planets.forEach((res)=>{
      if(res.name == event.value){
        this.selectedPlanet = JSON.parse(JSON.stringify(res));
      }
    });
    this.emitDestination();
  }

  private emitDestination() {
    if (this.selectedPlanet != null && this.selectedVehicle) {
      let itemSelected = {};
      itemSelected['index'] = this.destination['id'];
      itemSelected['status'] = "success";
      itemSelected['planet'] = this.selectedPlanet;
      itemSelected['prevPlanet'] = this.prevPlanet;
      itemSelected['vehicle'] = this.selectedVehicle;
      itemSelected['prevVehicle'] = this.prevVehicle;
      this.selectedEmit.emit(itemSelected);
    }
  }

  selectVehicle(vehicle: Vehicle){
    this.prevVehicle = this.selectedVehicle;
    this.selectedVehicle = vehicle;
    this.emitDestination();
  }

  isDisabledVehicle(vehicle: Vehicle){
    if (this.selectedPlanet.distance > vehicle.max_distance){
      return true;
    }
    if(this.isAvailableVehicle(vehicle) == 0){
      return true;
    }
    return false;
  }

  isAvailableVehicle(vehicle: Vehicle){
    if(vehicle && vehicle.used != null){
      return vehicle.total_no - vehicle.used;
    }
    return vehicle.total_no;
  }

}
