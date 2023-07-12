import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from "../../models/userModel/user.model";
import { UserService } from 'src/app/services/userService/user.service';
import { AppComponent } from "../../app.component";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from 'src/app/services/storageService/storage.service';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ShoppingListService } from "../../services/shoppingListService/shopping-list.service";
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges{
  currentUser: any;

  // Variable to save the input from the edit form
  currentUserInfo: User = {
    user_id: this.appComponent.userId,
    user_name: '',
    user_mail: '',
    user_password: ''
  };

  // Variables to show the length of the lists
  lengthInventoryList = 0;
  lengthShoppingList = 0;

  // Variable for the popUp Functions
  closeResult = '';

  // Variables for the Password edit form
  passwordChange = {
    old_password: "",
    new_password: ""
  }
  invalid = false
  changed = false
  errorMessage = ""

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private modalService: NgbModal,
    private storageService: StorageService,
    private inventoryService: InventoryListService,
    private shoppingService: ShoppingListService,
    private authService: AuthService
  ) {}

  // When component is loaded to initiate some Variables
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getUser(this.currentUser.user_id) //this.appComponent.userId?.toString()!
    this.appComponent.setIsHome(false)
    this.getCountInventory()
    this.getCountShopping()
  }

  // To reload the User if there was a change in the component
  ngOnChanges(changes: SimpleChanges): void {
    this.getUser(this.currentUser.user_id)
  }

  // Get all columns of the table user for the row with the user_id
  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUserInfo = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Update the User with a given user_id and new data to be saved
  updateUser(): void {
    this.userService.update(this.currentUser.user_id, this.currentUserInfo)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log('This User was updated successfully!');
        },
        error: (e) => console.error(e)
      });
  }

  // Delete the User with the user_id form the Database
  deleteUser(): void {
    this.userService.delete(this.currentUser.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.appComponent.logout()
        },
        error: (e) => console.error(e)
      });
  }

  // To change the password of the User with the given user_id
  changePassword(): void {
    this.authService.changePassword(this.currentUser.user_name, this.passwordChange.old_password, this.passwordChange.new_password)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.changed = true
        this.invalid = false
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.invalid = true;
      }
    });
  }

  // To reset the password edit form after the password was changed
  reset(){
    this.changed = false
    this.invalid = false
    this.passwordChange = {
      old_password: "",
      new_password: ""
    }
  }

  // Function to get number of Items in Inventory List
  getCountInventory(){
    this.inventoryService.getCount(this.currentUser.user_id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.lengthInventoryList = res
      },
      error: (e) => console.error(e)
    });
  }

  // Function to get number of Items in Shopping List
  getCountShopping(){
    this.shoppingService.getCount(this.currentUser.user_id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.lengthShoppingList = res
        },
        error: (e) => console.error(e)
      });
  }

  // Open Pop-Up with Content
  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'popUp-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult =
        `Dismissed ${AccountComponent.getDismissReason(reason)}`;
    });
  }

  // Get Dismiss Reason to close PopUp
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
