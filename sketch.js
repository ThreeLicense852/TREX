
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var obstacle1;
var obstacle2;
var obstacle3;
var score;
var obstaclesgroup,cloudsgroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover;
var restart;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
cloud_red = loadImage("scape.jpg");
  groundImage = loadImage("ground2.png");
obstacle1 = loadImage("amogus.jpg");
obstacle2 = loadImage("boy.jpg");
obstacle3 = loadImage("me.jpg");
gameoverimg = loadImage("troll.gif");
restartimg = loadImage("restart.jpg");


}

function setup() {
createCanvas(600, 200);

score=0
  
//crea el sprite del Trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
trex.addAnimation("collided",trex_collided);
//crea el sprite del suelo
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
   invisibleGround = createSprite(200,190,600,10);
invisibleGround.visible = false

obstaclesgroup = new Group();
cloudsgroup = new Group();
gameover = createSprite(300,100);
gameover.addImage(gameoverimg);
restart=createSprite(300,140);
restart.addImage(restartimg);
}



function draw() {
background(220);
background.shapeColor = "Orange";
console.log(frameCount)

if(gamestate === PLAY){
ground.velocityX = -4;
spawnclouds()
spawnobstacles()




score=score+Math.round(frameCount/60)
if (keyDown("space")&&trex.y>100) {
  trex.velocityY = -10;
}
if (keyIsDown(LEFT_ARROW)&&trex.x>0) {
    trex.x =trex.x-5;
}

if (keyIsDown(RIGHT_ARROW)&&trex.x<400) {
trex.x =trex.x+5;
}
fill("green")
text.depth = 2
text("score: "+score,500,50);
if (ground.x < 0) {
  ground.x = ground.width / 2;
}

gameover.visible=false
restart.visible=false
if(obstaclesgroup.isTouching(trex)){
gamestate = END




}



}
else if (gamestate === END){
ground.velocityX = 0
obstaclesgroup.setVelocityXEach(0)
cloudsgroup.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided)
obstaclesgroup.setLifetimeEach(-1)
trex.velocityY=0
gameover.visible=true
restart.visible=true
 



}
  
  
//salta cuando se presiona la barra espaciadora





trex.velocityY = trex.velocityY + 0.8


trex.collide(invisibleGround);

trex.setCollider("circle",0,0,40)
trex.debug = true
console.log(gamestate)
 
drawSprites();  
 

  
  
  }
  
  
  


function spawnclouds(){
if(frameCount %100 === 0){
  

cloud=createSprite(800,90,40,10)  
cloud.velocityX = -3
cloud.addImage("cloud",cloud_red)
cloud.scale = 0.9
cloud.depth = -1

cloudsgroup.add(cloud);



}  
}
function spawnobstacles(){
if(frameCount %60 === 0){
var obstacle = createSprite(600,165,10,40)
obstacle.velocityX = -6
var rand = Math.round(random(1,3))
switch(rand){
case 1: obstacle.addImage(obstacle1);
break;
    


case 2: obstacle.addImage(obstacle2);
break;




case 3: obstacle.addImage(obstacle3);
break;
default: break;
}
obstacle.lifetime = 300
obstacle.depth = 2
obstacle.scale = 0.3
  
obstaclesgroup.add(obstacle)


}
  
  



}