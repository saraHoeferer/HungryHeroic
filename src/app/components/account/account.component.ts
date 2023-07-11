import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from "../../models/userModel/user.model";
import { UserService } from 'src/app/services/userService/user.service';
import { AppComponent } from "../../app.component";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges{
  currentUser: any;
  currentUser2: User = {
    user_id: this.appComponent.userId,
    user_name: '',
    user_mail: '',
    user_password: ''
  };
  lengthInventoryList = 0;
  lengthShoppingList = 0;
  closeResult = '';

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private modalService: NgbModal,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.getUser(this.appComponent.userId?.toString()!) //TODO: use ID of current User not static User 1
    this.appComponent.setIsHome(false)
    this.currentUser = this.storageService.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUser(this.appComponent.userId?.toString()!)
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser2 = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.userService.update(this.currentUser.user_id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log('This User was updated successfully!');
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  //TODO: Function to get number of Items in Inventory List
  //TODO: Function to get number of Items in Supply List

  //Open Pop-Up with Content Function
  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'popUp-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${AccountComponent.getDismissReason(reason)}`;
    });
  }

  //Get Dismiss Reason to close PopUp
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
