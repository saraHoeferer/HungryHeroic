import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { ItemsService } from 'src/app/services/itemService/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

 item: Item = {
  item_id: 0,
  item_name: "",
 }

 submitted = false;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      name: this.item.item_name,
      id: this.item.item_id
    };

    this.itemsService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.item = {
      item_id: 0,
      item_name: "",
    };
  }

}
