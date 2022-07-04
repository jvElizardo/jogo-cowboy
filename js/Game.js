class Game {
    constructor() {
      this.entrada_cowboy = createInput("");
      this.entrada_inimigo = createInput("");
      this.botao_cowboy = createButton("");
      this.botao_inimigo = createButton("");
    }
  
    gameMousePressed() {
      this.botao_cowboy.mousePressed(() => {
        this.numeraçao();
      });
      this.botao_inimigo.mousePressed(() => {
        this.numeraçaoInimigo();
      });
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }

    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();

        cowboy = createSprite(width/4,height-80,10,30);
        cowboy.addImage(cowboyImg);

        indio = createSprite(width/2,height-150,10,10);
        indio.addImage(indioImg);

        edges=createEdgeSprites();

        bandido=createSprite(width-100,height-60,10,20);
        bandido.addImage(bandidoImg);

        arma=createSprite(width/4+45,height-80,10,30);
        arma.addImage(armaImg);

        bala=createSprite(width/4+43,height-80,10,30);
        bala.addImage(balaImg);
        bala.scale=0.01;
        bala.visible=false;

        armaInimigo=createSprite(width-130,height-40,10,30);
        armaInimigo.addImage(armaInimigoImg);
        balaInimigo=createSprite(width-135,height-40,10,30);

        balaInimigo.addImage(balaInimigoImg);
        balaInimigo.scale=0.01;
        balaInimigo.visible=false;

        jogadores = [cowboy,bandido];
        
    }
  
    handleElements() {
      form.hide();
      form.title.position(40, 50);
      form.title.class("gameTitleAfterEffect");

      this.entrada_cowboy.position(width/3, height-90);
      this.entrada_inimigo.position(width-250, height-90);

      this.entrada_cowboy.class("numberInput");
      this.entrada_inimigo.class("numberInput");

      this.botao_cowboy.position(width/3, height-150);
      this.botao_inimigo.position(width-250, height-150);

      this.botao_cowboy.class("playButton");
      this.botao_inimigo.class("playButton");

    }
  
    play() {
      this.handleElements();
  
      //Player.getPlayersInfo();

      this.gameMousePressed();

      /*botao=createImg("assets/botao.png");
      botao.position(width/3,height-150);
      botao.size(60,60);
      botao.mouseClicked(this.numeraçao);

      botaoinimigo=createImg("assets/botao.png");
      botaoinimigo.position(width-250,height-150);
      botaoinimigo.size(60,60);
      botaoinimigo.mouseClicked(this.numeraçaoInimigo);

      entrada_cowboy=createInput("")
      entrada_cowboy.position(width/3,height-90);
      entrada_cowboy.size(60,60);

      entrada_inimigo=createInput("");
      entrada_inimigo.position(width-250,height-90);
      entrada_inimigo.size(60,60);*/

      this.numeros();

      this.confere(codigoCowboy,bala);

      this.confere(codigoInimigo,balaInimigo);
      
    /* if (allPlayers !== undefined) {
        //alterar a imagem
        console.log("players definidos");
        image(fundoIMG, 0, 0, width, height);
  
         //índice da matriz
        var index = 0;
        for (var plr in allPlayers) {
          //adicione 1 ao índice para cada loop
          index = index + 1;
  
          //alterar para os personagens
          var x = allPlayers[plr].positionX;
          var y = allPlayers[plr].positionY;
  
          jogadores[index - 1].position.x = x;
          jogadores[index - 1].position.y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 1000, 1000);
          }
        }*/
        drawSprites();
      //}
      
    }

    end() {
      console.log("Fim de Jogo");
    }

    numeros(){
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
      
    numeraçao(){
        console.log("aa");
        codigoCowboy[icowboy]=Number(this.entrada_cowboy.value());
        this.entrada_cowboy.value("");
        icowboy+=1;
        console.log("ffff");
      }

    numeraçaoInimigo(){
        codigoInimigo[iinimigo]=Number(this.entrada_inimigo.value());
        this.entrada_inimigo.value("");
        iinimigo+=1;
      
      }
      
    confere(personagem,tiro){
        
        if(personagem.length===3 && codigo.length===3)
        
       {
         if(JSON.stringify(codigo)===JSON.stringify(personagem))
      
        { 
          tiro.visible=true;
          if(tiro===balaInimigo){
            tiro.velocityX=-18;
          }
          else{
            tiro.velocityX=18;
          }
          console.log("qq");
        }
      } 
      }
      
      
  }
  