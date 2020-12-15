var database;
var food;
var foodStock;
var buttonAddFood, buttonFeedFood;
var foodObj;
var feedTime, lastFed;

var dog, dogImage, dogHappyImage;
function preload()
{
  dogImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200,800);

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", function (data){
    food = data.val();})

  dog = createSprite(1000,400);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  //buttons
  buttonAddFood = createButton("ADD FOOD");
  buttonAddFood.position(800,250);
  buttonAddFood.mousePressed(()=>{addFood();});


  buttonFeedFood = createButton("FEED FOOD");
  buttonFeedFood.position(900,250);
  buttonFeedFood.mousePressed(()=>{feedDog();});
  
  

}

function draw() {  
  background("#2D8956");

  //reading feeding time
  feedTime = database.ref("feedTime");
  feedTime.on("value", function (data){
    lastFed=data.val()
  })
 
  foodStockText();
  lastFeed();
  header();
  
  foodObj.display();
  drawSprites();
}

function addFood(){
  food++;
    database.ref('/').update({
      food: food
  });
}

function feedDog(){
  foodObj.deductFoodStock();
  foodObj.updateFoodStock(food);
  database.ref('/').update({
    feedTime:hour()
  })
  dog.addImage(dogHappyImage);
}

function foodStockText(){
  textSize(28);
  fill("red");
  stroke("white")
  strokeWeight(3);
  text("Food Stock : "+food,700,150);
}

function lastFeed(){
  textSize(28);
  fill("red");
  stroke("white")
  strokeWeight(3);
  if (lastFed>=12){
    text("Last Feed Time: "+ lastFed%12 + " PM",350,150);
  }else if(lastFed==0){
    text("Last Feed Time: 12 AM",350,150);
  }else{
    text("Last Feed Time: "+ lastFed + " AM",350,150);
  }
  
}

function header(){
  textSize(30)
  fill("White");
  stroke("black")
  strokeWeight(8);
  text("Virtual Pet-2",500,50);
}


