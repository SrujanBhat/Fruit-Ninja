var PLAY = 1;
var END = 0;
var gameState = 1;

var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage;
var fruit1, fruit1Image;
var fruit2, fruit2Image;
var fruit3, fruit3Image;
var fruit4, fruit4Image;
var alien, alienImage;
var gameover, gameoverImage;

var swordswooshSound;
var gameoverSound;

function preload(){

 swordImage = loadImage("sword.png");
 fruit1Image = loadImage("fruit1.png");
 fruit2Image = loadImage("fruit2.png");
 fruit3Image = loadImage("fruit3.png");
 fruit4Image = loadImage("fruit4.png");
 alienImage = loadImage("alien1.png");
 gameoverImage = loadImage("gameover.png");
  
  swordswooshSound=loadSound("swordswooshSound.mp3");
 gameoverSound=loadSound("gameoverSound.mp3");
 
  
}

function setup() {
  
 createCanvas(500, 500);
  
sword = createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale = 0.8;
  
fruitsGroup = new Group();
enemyGroup = new Group();
}

score = 0;


function draw(){
 
  background("lightblue"); 
  
  if(gameState === PLAY){
   
  fruits();
  enemy();
  
  textSize (15);
  fill ("black");
  text("SCORE: "+ score, 400,50);
   
    
  sword.y = World.mouseY;
  sword.x = World.mouseX;
   
   if(fruitsGroup.isTouching(sword)) {
   fruitsGroup.destroyEach();
   swordswooshSound.play();
   score = score+2;
 }
 
 
   if(enemyGroup.isTouching(sword)){
      gameState = END;
     gameoverSound.play();
 }
}  
  else if (gameState === END) {
   enemyGroup.destroyEach();
   enemyGroup.setLifetimeEach(-1);
   fruitsGroup.setLifetimeEach(-1);

   enemyGroup.setVelocityXEach(0);
   fruitsGroup.setVelocityXEach(0);
   sword.addImage(gameoverImage);
   
    
    sword.x = 250;
    sword.y = 250;
  }
     
  
drawSprites() ;
}


function fruits() {
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
  if(r == 1) {
    fruit.addImage(fruit1Image);
  } else if(r == 2) {
    fruit.addImage(fruit2Image);
  } else if(r == 3) {
    fruit.addImage(fruit3Image);
  } else {
    fruit.addImage(fruit4Image);
  }
   
    position = Math.round(random(1,2));
    
    
   if(position==1)
   {
     fruit.x=400;
     fruit.velocityX=-(10+(score/4));
   }
    else
    {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(10+(score/4));
      }
    }
    
  fruit.y = Math.round(random(50,340));
 
  fruit.setLifeTime=100;
    
  fruitsGroup.add(fruit);
  }
}
    
function enemy() {
  if(World.frameCount%200 === 0) {
    alien = createSprite(400,200,20,20)
    alien.addImage(alienImage);
    alien.y = Math.round(random(100,300));
    alien.velocityX = -(10+(score/10));
    alien.setLifetime = 1000;
    alien.scale = 1;
    
    
    enemyGroup.add(alien);
  }
}
 
  