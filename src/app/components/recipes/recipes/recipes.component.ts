import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { Item } from 'src/app/models/itemModel/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { AppComponent } from 'src/app/app.component';
import { response } from 'express';
import { TmplAstBoundAttribute } from '@angular/compiler';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  currentUser: any;
  test: any;
  test2: any;
  recipes: Recipe[] = []
  userInventory?: InventoryList[]
  headers = new HttpHeaders({
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f',
    'access-control-allow-credentials': 'false'
  })

  constructor(private http: HttpClient, private InventoryListService: InventoryListService, private itemService: ItemsService, private storageService: StorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getUserInventory()
    this.currentUser = this.storageService.getUser();
  }

  async getUserInventory() {
    let cnt = 0
    let items: Item[] = []
    let ingredients: string[] = []
    this.userInventory = await this.InventoryListService.getUserInventory(this.appComponent.userId)
    let item: Item
    for (let inventories of this.userInventory!) {
      console.log(inventories)
      item = await this.itemService.get(inventories.item_id)
      inventories.item_name = item.item_name
    }
    this.userInventory!.sort((a, b) => a.expiration_date!.toString()!.localeCompare(b.expiration_date!.toString()))
    for (let inventories of this.userInventory!) {
      if (cnt != 4) {
        if (new Date().getTime() < new Date(inventories.expiration_date?.toString()!).getTime()) {
          items.push(inventories)
          cnt++
        }
      } else {
        break
      }
    }
    for (let i = 0; i < 4; i++) {
      if (items[i] == undefined) {
        ingredients[i] = ""
      } else {
        ingredients[i] = items[i].item_name!
      }
    }
    this.getResponse(ingredients[0], ingredients[1], ingredients[2], ingredients[3])
  }

  async getResponse(ingredient1: string, ingredient2: string, ingredient3: string, ingredient4: string) {
    console.log(ingredient1, ingredient2, ingredient3, ingredient4)
    if (ingredient1 == "" && ingredient2 == "" && ingredient3 == "" && ingredient4 == "") {
      await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2", {
        headers: {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f',
        },
        credentials: "omit",
      }).then((response) =>
        (response.json())
      ).then((data2) =>
        this.test = data2["recipes"]
      );
      this.recipes = this.test
      console.log(this.recipes)
    } else {
      await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredient1 + "," + ingredient2 + "," + ingredient3 + "," + ingredient4 + "&number=2&ignorePantry=true&ranking=1", {
        headers: {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f',
        },
        credentials: "omit"
      }).then((response) =>
        response.json()
      ).then((data) =>
        (this.test = data)
      );
      for (let recipes of this.test) {
        await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipes.id + "/information", {
          headers: {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f',
          },
          credentials: "omit"
        }).then((response) =>
          response.json()
        ).then((data) =>
          this.test2 = data
        );
        this.recipes.push(this.test2)
      }
      console.log(this.recipes)
    }
  }
}
