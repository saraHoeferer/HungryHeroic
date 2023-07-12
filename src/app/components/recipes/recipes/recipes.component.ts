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
  fixedRecipes: Recipe[] = []
  searchedRecipes: Recipe[] = []
  userInventory?: InventoryList[]
  searchInput: string = ""
  searched = false
  found = false
  filtered = false
  constructor(private http: HttpClient, private InventoryListService: InventoryListService, private itemService: ItemsService, private storageService: StorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser != null) {
      this.getUserInventory()
    }
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
    this.found = true
    if (ingredient1 == "" && ingredient2 == "" && ingredient3 == "" && ingredient4 == "") {
      await this.getRandomRecipes()
      this.fixedRecipes = this.test
      this.recipes = this.fixedRecipes
      console.log(this.recipes)
    } else {
      await this.getRecipesByIngredients(ingredient1 + "," + ingredient2 + "," + ingredient3 + "," + ingredient4)
      if (this.test.length == 0) {
        await this.getRandomRecipes()
      }
      for (let recipes of this.test) {
        await this.getRecipesById(recipes.id)
        this.fixedRecipes.push(this.test2)
      }
      this.recipes = this.fixedRecipes
      console.log(this.recipes)
    }
  }

  async getSearchedRecipes() {
    if (this.searchInput != "") {
      this.found = true
      this.recipes = []
      this.searched = true
      this.searchedRecipes = []
      console.log(this.searchInput)
      await this.getRecipesByIngredients(this.searchInput)
      for (let recipes of this.test) {
        await this.getRecipesById(recipes.id)
        this.searchedRecipes.push(this.test2)
      }
      if (this.searchedRecipes.length != 0) {
        this.found = true
      } else {
        this.found = false
      }
      this.recipes = this.searchedRecipes
      console.log(this.recipes)
    } else {
      this.recipes = this.fixedRecipes
      this.searched = false
    }
  }

  async getRecipesByIngredients(ingredients: string) {
    await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=12&ignorePantry=true&ranking=1", {
      headers: {
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': '2ece313553mshb8a2595231f3b48p161a5djsnd0373108d32f',
      },
      credentials: "omit"
    }).then((response) =>
      response.json()
    ).then((data) =>
      this.test = data
    );
  }

  async getRecipesById(id: string) {
    await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information", {
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
  }

  async getRandomRecipes() {
    await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=12", {
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
  }

  filterListVegan() {
    this.filtered = true
    this.found = false
    let filterList: Recipe[] = []
    if (this.searched) {
      for (let recipe of this.searchedRecipes) {
        if (recipe.vegan) {
          filterList.push(recipe)
        }
      }
    } else {
      for (let recipe of this.fixedRecipes) {
        if (recipe.vegan) {
          filterList.push(recipe)
        }
      }
    }
    this.recipes = filterList
  }

  filterListVegetarian() {
    this.filtered = true
    this.found = false
    let filterList: Recipe[] = []
    if (this.searched) {
      for (let recipe of this.searchedRecipes) {
        if (recipe.vegetarian) {
          filterList.push(recipe)
        }
      }
    } else {
      for (let recipe of this.fixedRecipes) {
        if (recipe.vegetarian) {
          filterList.push(recipe)
        }
      }
    }
    this.recipes = filterList
  }

  filterListGluten() {
    this.filtered = true
    this.found = false
    let filterList: Recipe[] = []
    if (this.searched) {
      for (let recipe of this.searchedRecipes) {
        if (recipe.glutenFree) {
          filterList.push(recipe)
        }
      }
    } else {
      for (let recipe of this.fixedRecipes) {
        if (recipe.glutenFree) {
          filterList.push(recipe)
        }
      }
    }
    this.recipes = filterList
  }

  filterListDairy() {
    this.filtered = true
    this.found = false
    let filterList: Recipe[] = []
    if (this.searched) {
      for (let recipe of this.searchedRecipes) {
        if (recipe.dairyFree) {
          filterList.push(recipe)
        }
      }
    } else {
      for (let recipe of this.fixedRecipes) {
        if (recipe.dairyFree) {
          filterList.push(recipe)
        }
      }
    }
    this.recipes = filterList
  }

  filterListSustainable() {
    this.filtered = true
    this.found = false
    let filterList: Recipe[] = []
    if (this.searched) {
      for (let recipe of this.searchedRecipes) {
        if (recipe.sustainable) {
          filterList.push(recipe)
        }
      }
    } else {
      for (let recipe of this.fixedRecipes) {
        if (recipe.sustainable) {
          filterList.push(recipe)
        }
      }
    }
    this.recipes = filterList
  }

  resetSearch() {
    this.searched = false
    this.recipes = this.fixedRecipes
    this.found = false
    this.filtered = false
  }

  resetFilter(){
    if (this.searched){
      this.recipes = this.searchedRecipes
    } else {
      this.recipes = this.fixedRecipes
    }
    this.found = false
    this.filtered = false
  }

}
