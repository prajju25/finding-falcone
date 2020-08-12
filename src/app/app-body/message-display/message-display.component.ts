import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss']
})
export class MessageDisplayComponent implements OnInit {
  timeTaken: string;
  planetFound: string;
  isError: boolean;
  errormsg: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isError = false;
    let message = null;
    try{
      message = JSON.parse(this.route.snapshot.paramMap.get('message'));
        
      if(message != null && message['status'] == 'success'){
        this.planetFound = message['planet_name'];
      } else {
        this.isError = true;
        if (message['error']){
          this.errormsg = message['error'];
        }
      }
      this.timeTaken = this.route.snapshot.paramMap.get('time');
    } catch(err){
      console.log(err)
    }
  }

  restart(){
    this.router.navigate(['game']);
  }

}
