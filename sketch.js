var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,availableFood;
var lastFed;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  
  feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}                                                                                     
function draw() {
  background(46,139,87);
  foodObj.display();
  dog.addImage(sadDog);
  

  database.ref("Food").on("value",function(data){
    availableFood=data.val()
  })

  fill(255,255,254);
  //textsize(15);
  text("Available Food: "+availableFood,400,30)

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
 
 database.ref("/").update({
   Food: foodObj.deductFood()

 })


}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


