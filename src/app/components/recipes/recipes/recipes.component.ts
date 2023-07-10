import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/models/recipe/recipe.model';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';
import { InventoryListService } from 'src/app/services/inventoryListService/inventory-list.service';
import { ItemsService } from 'src/app/services/itemService/items.service';
import { Item } from 'src/app/models/itemModel/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipes: Recipe[] = []
  userInventory?: InventoryList[]
  headers = new HttpHeaders({
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f'
  })

  constructor(private http: HttpClient, private InventoryListService: InventoryListService, private itemService: ItemsService){}

  ngOnInit(): void {
    //this.getUserInventory()
  }

  async getUserInventory(){
    let cnt = 0
    let items: Item[] = []
    this.userInventory = await this.InventoryListService.getUserInventory(1)
    let item: Item
    for (let inventories of this.userInventory!) {
      item = await this.itemService.get(inventories.item_id)
      inventories.item_name = item.item_name
    }
    this.userInventory!.sort((a, b) => a.expiration_date!.toString()!.localeCompare(b.expiration_date!.toString()))
    for (let inventories of this.userInventory!){
      if (cnt != 4){
        if (new Date().getTime() < new Date(inventories.expiration_date?.toString()!).getTime()){
          items.push(inventories)
          cnt++
        }
      } else {
        break
      }
    }
    if (items.length == 4){
      this.getResponse(items![0].item_name!, items![1].item_name!, items![2].item_name!, items![3].item_name! )
    }
  }

  getResponse(ingredient1: string="Tomate", ingredient2: string = "", ingredient3: string = "", ingredient4: string=""){
    console.log(ingredient1, ingredient2, ingredient3, ingredient4)
      this.http.get<any>("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients="+ingredient1+","+ingredient2+","+ingredient3+","+ingredient4+"&ignorePantry=true&ranking=1", {
        headers: this.headers
      })
      .subscribe(data => {
        this.recipes = data
        console.log(data)
        console.log(this.recipes)
      })
  }
}
