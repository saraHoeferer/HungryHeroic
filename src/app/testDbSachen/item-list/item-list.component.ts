import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/itemModel/item.model';
import { ItemsService } from 'src/app//services/itemService/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{
  items?: Item[];
  currentItem: Item = {};
  currentIndex = -1;
  title = '';

  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.itemService.getAll()
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentItem = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(item: Item, index: number): void {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.itemService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentItem = {};
    this.currentIndex = -1;

    this.itemService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
