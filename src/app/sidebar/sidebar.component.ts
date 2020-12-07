import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  
  @Input('childValue') childValue:string;
  @Input('maleValue') maleValue:string;
  @Input('femaleValue') femaleValue:string;
  
  ngOnInit(): void {
    
    }

}
