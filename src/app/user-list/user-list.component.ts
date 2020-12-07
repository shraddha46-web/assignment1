import {
  Component, OnInit,
  ViewChild, OnChanges
} from '@angular/core';
import { NgbModal, ModalDismissReasons }
  from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  closeResult = '';
  public user = {};
  allUsers;
  femaleUsers = 0;
  maleUsers = 0;
  progressBar = 0;
  constructor(private modalService: NgbModal) {

  }

  language = ['English', 'Spanish', 'Duch', 'French'];
  ngOnInit(): void {
    if(localStorage.getItem('userList'))
    this.allUsers = JSON.parse(localStorage.getItem('userList'));
    if(this.user){
      this.user['gender'] = 'Male';
      this.user['lang'] = 'English';
    }
    this.updateProgressBar();
  }

  testForm: any;

  updateProgressBar() {
    var femaleUsers = 0;
    var maleUsers = 0;
    if (this.allUsers) {
      this.allUsers.every(function (element, index, arr) {
        if (element.gender == "Female") {
          femaleUsers++;
        } else {
          maleUsers++;
        }
        return true;
      })
    }
    this.femaleUsers = femaleUsers;
    this.maleUsers = maleUsers;
    if (this.allUsers && this.allUsers.length > 0)
      this.progressBar = (this.allUsers).length * 10;
    else
      this.progressBar = 0;
  }
  onSubmit() {

    if (!this.allUsers)
      this.allUsers = [];
    if (this.user && this.user['fullName']) {
      var date = this.user['dob'].day + '-' + this.user['dob'].month + '-' + this.user['dob'].year;
      this.user['dob'] = new Date(date);
      this.allUsers.push(this.user);
      this.user = [];
      this.updateProgressBar();
      localStorage.setItem('userList', JSON.stringify(this.allUsers));
    }
  }
  open(content) {
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isDisabled(date) {

    // var currentYear = (new Date).getFullYear();
    // var currentMonth = (new Date).getMonth();
    // var currentDay = (new Date).getDate();
    
    const d = new Date(date.year, date.month - 1, date.day);
    return date.day==13 || d.getDay() === 0 || d.getDay() === 6;
  }
}
