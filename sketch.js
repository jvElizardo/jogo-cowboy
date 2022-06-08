var cowboy,edges,indio,bandido;
var cowboyImg,indioImg,bandidoImg;
var botao,botaoinimigo;
var codigo=[];
var sequencia;
var soloinvisivel;
var fundoIMG;
var nuvem,imgceu;
var solo ;
var randomn;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var pontos=0;
var obstaculogroup
var nuvemgroup
var inicio = 1 
var fim = 0 
var estado_de_jogo=inicio
var contador=0
var entrada_cowboy;
var entrada_inimigo;
var arma;
var armaImg;
var bala;
var balaImg;
var codigoCowboy=[];
var codigoInimigo=[];
var icowboy;
var iinimigo;

// carrega as animaçoes 
function preload()
{

 fundoIMG=loadImage("th.jpg");
cowboyImg=loadImage("teste.png");
indioImg=loadImage("teste3.png");
bandidoImg=loadImage("teste2.png");
armaImg=loadImage("arma.png");
balaImg=loadImage("bala3.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
 /* trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  solo=createSprite(300,180,60,20);
  solo.addAnimation("terra",groundImage);
  edges = createEdgeSprites();
  soloinvisivel=createSprite(40,200,300,20);
  soloinvisivel.visible=false;
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50;
  console.log("qwfcxvcg"+7);
  obstaculogroup=new Group ();
  nuvemgroup= new Group ();
  */
  cowboy = createSprite(width/4,height-80,10,30);
  cowboy.addImage(cowboyImg);
  indio = createSprite(width/2,height-150,10,10);
  indio.addImage(indioImg);
  edges=createEdgeSprites();
  bandido=createSprite(width-100,height-60,10,20);
  bandido.addImage(bandidoImg);
  botao=createImg("botao.png");
  botao.position(width/3,height-150);
  botao.size(60,60);
  botao.mouseClicked(numeraçao);
  botaoinimigo=createImg("botao.png");
  botaoinimigo.position(width-250,height-150);
  botaoinimigo.size(60,60);
  botaoinimigo.mouseClicked(numeraçaoInimigo);
  entrada_cowboy=createInput("")
  entrada_cowboy.position(width/3,height-90);
  entrada_cowboy.size(60,60);
  entrada_inimigo=createInput("");
  entrada_inimigo.position(width-250,height-90);
  entrada_inimigo.size(60,60);
  arma=createSprite(width/4+45,height-80,10,30);
  arma.addImage(armaImg);
  bala=createSprite(width/4+43,height-80,10,30);
  bala.addImage(balaImg);
  bala.scale=0.01;
  bala.visible=false;
}
function numeros(){
    if (frameCount%100===0&&contador<3){
    sequencia=Math.round(random(1,90));
    codigo[contador]=sequencia;
    noLoop();
    textSize(60);
    fill("black")
  text(sequencia,width/2,height/2)
  contador+=1;
  console.log(sequencia);
    setTimeout(()=>{
     loop();
    },1000);
  
}

}

function draw(){
  //definir a cor do plano de fundo 
  background(fundoIMG); 
  numeros();
  confere();
 /* text("pontos"+pontos,50,20);
  
  if (estado_de_jogo===inicio)
  { 
    solo.velocityX=-6;
    pontos=pontos+Math.round(frameCount/60);
    if (solo.x<0){
      solo.x=solo.width/2;
    }
    if(keyDown("space")&& trex.y>=150 )
  {
    trex.velocityY = -10; 
  }
  trex.velocityY = trex.velocityY + 0.5;
  ceu();
  obstaculogroup();
  if (trex.isTouching(obstaculogroup)){
    estado_de_jogo=fim;
  }
}

  else if (estado_de_jogo===fim){
    solo.velocityX=0;
   obstaculogroup.setVelocityXEach(0)
   nuvemgroup.setVelocityXEach(0)
  }
  
  //registrando a posição y do trex
  //console.log(trex.y);
  
  //pular quando tecla de espaço for pressionada
  
  
//console.log(frameCount);
 
  
 //impedir que o trex caia
  trex.collide(soloinvisivel);
 */
 // if(keyDown("d")){
  //  cowboy.x+=10;
 // }
 // if(keyDown("a")){
  //  cowboy.x-=10;
 // }
  drawSprites(); 
  
}
function numeraçao(){
  console.log("aa")
  codigoCowboy[icowboy]=Number(entrada_cowboy.value())
  entrada_cowboy.value("");
  icowboy+=1;
  console.log("ffff");
}
function numeraçaoInimigo(){
  codigoInimigo[iinimigo]=Number(entrada_inimigo.value());
  entrada_inimigo.value("");
  iinimigo+=1;

}

function confere(){
  if(codigoCowboy.length===3&&codigo.length===3)
 {if(JSON.stringify(codigo)===JSON.stringify(codigoCowboy))
  { bala.visible=true;
    bala.velocityX=18;
    console.log("qq");
  }
}
  
}



