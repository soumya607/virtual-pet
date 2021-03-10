//Create variables here
var dogIMG,happyDogIMG;
var foodS,foodstock,database;

function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happydogIMG=loadImage("images/dogImg1.png")
  
}

function setup() {
	createCanvas(500, 500);
  rectMode(CENTER);
  database = firebase.database();

  dog = createSprite(width/2, 270, 10,10);
	dog.addImage(dogIMG)
  dog.scale=0.2
  
  foodstock = database.ref('food');
  foodstock.on("value",readStock);

}


function draw() {  
  background(46,139,87)
  text("hello", 270,10)

  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
    dog.addImage(happydogIMG);
    dog.scale = 0.2

   

  }
  drawSprites();
  
  //add styles here
  textSize(15);
  fill("black");
  stroke("black")
  text("note: Press UP_ARROW key to Feed dog Milk!!", 90 ,50)
  
}

function readStock(data){
  foodS = data.val();
}

//function to write values in DB
function writeStock(x){
   if(x <= 0){
     x=0;
   }else{
     x=x-1;
   }
  database.ref('/').update({
    food:x
  })
}