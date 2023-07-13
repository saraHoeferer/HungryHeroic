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
  // current User
  currentUser: any;
  // test variablen to save data from query
  test: any;
  test2: any;
  // all shown recipes
  recipes: Recipe[] = []
  // all saved recipes
  fixedRecipes: Recipe[] = []
  // all saved searched for recipes
  searchedRecipes: Recipe[] = []
  // the users inventory
  userInventory?: InventoryList[]
  // input given from the user to search for
  searchInput: string = ""
  // check if search is active or not
  searched = false
  // check if recipes have been found or not
  found = false
  // check if recipes have been filtered or not
  filtered = false

  // constructor
  constructor(private http: HttpClient,
    private InventoryListService: InventoryListService,
    private itemService: ItemsService,
    private storageService: StorageService,
    private appComponent: AppComponent
  ) { }

  // on intialisation
  ngOnInit(): void {
    // get current User from storage
    this.currentUser = this.storageService.getUser();
    if (this.currentUser != null) {
      // if a user ist logged in get User Inventory and according recipes
      this.getUserInventory()
    }
  }

  async getUserInventory() {
    let cnt = 0
    // collected items form inventory
    let items: Item[] = []
    // collected ingredients
    let ingredients: string[] = []
    // get user invnetory
    this.userInventory = await this.InventoryListService.getUserInventory(this.appComponent.userId)
    let item: Item
    // get all items from user inventory
    for (let inventories of this.userInventory!) {
      item = await this.itemService.get(inventories.item_id)
      inventories.item_name = item.item_name
    }
    // sort retrieved inventory by exipration date asc
    this.userInventory!.sort((a, b) => a.expiration_date!.toString()!.localeCompare(b.expiration_date!.toString()))
    // get the 4 items of list which are about to exipire
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
    // save them in ingredients if found
    for (let i = 0; i < 4; i++) {
      if (items[i] == undefined) {
        ingredients[i] = ""
      } else {
        ingredients[i] = items[i].item_name!
      }
    }
    // get recipes
    this.getResponse(ingredients[0], ingredients[1], ingredients[2], ingredients[3])
  }

  async getResponse(ingredient1: string, ingredient2: string, ingredient3: string, ingredient4: string) {
    console.log(ingredient1, ingredient2, ingredient3, ingredient4)
    // set found true for right display of message
    this.found = true
    // if user has no ingredients
    if (ingredient1 == "" && ingredient2 == "" && ingredient3 == "" && ingredient4 == "") {
      // gert random ingredients
      await this.getRandomRecipes()
      // set fixedRecipes
      this.fixedRecipes = this.test
      // set displayRecipes
      this.recipes = this.fixedRecipes
    } else {
      // if user has ingredients search by ingredients
      await this.getRecipesByIngredients(ingredient1 + "," + ingredient2 + "," + ingredient3 + "," + ingredient4)
      // if no recipes where found search for random
      if (this.test.length == 0) {
        await this.getRandomRecipes()
        // set fixed Recipes
        this.fixedRecipes = this.test
      } else {
      // for each recipe found get more detailed recipe
        for (let recipes of this.test) {
          // get recipe by Id
          await this.getRecipesById(recipes.id)
          // push into fixedRecipes
          this.fixedRecipes.push(this.test2)
        }
      }
      // set recipes
      this.recipes = this.fixedRecipes
    }
  }

  async getSearchedRecipes() {
    // if input of user is not empty
    if (this.searchInput != "") {
      // set found
      this.found = true
      // set searched
      this.searched = true
      // clear lists
      this.recipes = []
      this.searchedRecipes = []
      // get recipes by ingredient
      await this.getRecipesByIngredients(this.searchInput)
      // for each recipe get more detailed recipe
      for (let recipes of this.test) {
        await this.getRecipesById(recipes.id)
        this.searchedRecipes.push(this.test2)
      }
      // check if recipes where really found or not
      if (this.searchedRecipes.length != 0) {
        this.found = true
      } else {
        this.found = false
      }
      // set recipes
      this.recipes = this.searchedRecipes
    } else {
      // else set it back to default recipes
      this.recipes = this.fixedRecipes
      this.searched = false
    }
  }

  // api call to get recipes by ingredients
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

  // api call to get recipes by id
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

  // api call to get random recipes
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

  // filter only recipes with tag vegan
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

  // filter only recipes with tag vegetarian
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

  // filter only recipes with tag glutenfree
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

  // filter only recipes with tag dairy free
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

  // filter only recipes with tag sustainable
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

  // reset Search
  resetSearch() {
    this.searched = false
    this.recipes = this.fixedRecipes
    this.found = false
    this.filtered = false
  }

  // reset filter
  resetFilter() {
    if (this.searched) {
      this.recipes = this.searchedRecipes
    } else {
      this.recipes = this.fixedRecipes
    }
    this.found = false
    this.filtered = false
  }

}
 //TODO: Why is there a recipes folder inside the recipes folder?
 //TODO: Code cleaning unused imports !
