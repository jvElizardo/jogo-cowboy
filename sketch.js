var cowboy,edges,indio,bandido;
var cowboyImg,indioImg,bandidoImg;
var botao,botaoinimigo;
var codigo=[];
var sequencia;
var fundoIMG;
var nuvem,imgceu;
var contador=0
var entrada_cowboy;
var entrada_inimigo;
var arma;
var armaImg;
var bala;
var balaImg;
var codigoCowboy=[];
var codigoInimigo=[];
var icowboy=0;
var iinimigo=0;
var armaInimigo;
var armaInimigoImg;
var balaInimigo;
var balaInimigoImg;
var database;
var game, form, player, playerCount, gameState;

// carrega as animaçoes 
function preload()
{
  fundoIMG=loadImage("th.jpg");
  cowboyImg=loadImage("teste.png");
  indioImg=loadImage("teste3.png");
  bandidoImg=loadImage("teste2.png");
  armaImg=loadImage("arma.png");
  balaImg=loadImage("bala3.png");
  armaInimigoImg=loadImage("arma2.png");
  balaInimigoImg=loadImage("bala32.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  //database = firebase.database();
  //console.log(database);

  game = new Game();
  game.getState();
  game.start();

}

function draw(){
  //definir a cor do plano de fundo 
  background(fundoIMG); 

  if(playerCount ===2){
    game.update(1);
  }

  if(gameState === 1){
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



