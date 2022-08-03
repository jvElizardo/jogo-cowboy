class Game {
    constructor() {
      this.entrada_cowboy = createInput("");
      this.entrada_inimigo = createInput("");
      this.botao_cowboy = createButton("");
      this.botao_inimigo = createButton("");
      this.reset = createButton("Reset");
      this.sequencia = createElement("h2");
      this.mensagemFinal = createElement("h2");
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();

      cowboy = createSprite(width/4,height-90,10,30);
      cowboy.addImage(cowboyImg);

      indio = createSprite(width/2,height-150,10,10);
      indio.addImage("indio", indioImg);
      indio.changeImage("indio");

      edges=createEdgeSprites();

      bandido=createSprite(width-300,height-80,10,20);
      bandido.addImage(bandidoImg);
      bandido.scale = 1.3;

      arma=createSprite(width/4+90,height-80,10,30);
      arma.addImage(armaImg);

      bala=createSprite(width/4+85,height-80,10,30);
      bala.addImage(balaImg);
      bala.scale=0.01;
      bala.visible=false;

      armaInimigo=createSprite(width-330,height-55,10,30);
      armaInimigo.addImage(armaInimigoImg);
      balaInimigo=createSprite(width-335,height-55,10,30);

      balaInimigo.addImage(balaInimigoImg);
      balaInimigo.scale=0.01;
      balaInimigo.visible=false;

      jogadores = [cowboy,bandido];
        
    }//start
  
    elementosTela() {
      form.hide();
      form.title.position(40, 50);
      form.title.class("gameTitleAfterEffect");

      this.entrada_cowboy.position(width/3-30, height-90);
      this.entrada_inimigo.position(width-450, height-90);

      this.entrada_cowboy.class("numberInput");
      this.entrada_inimigo.class("numberInput");

      this.botao_cowboy.position(width/3-30, height-150);
      this.botao_inimigo.position(width-450, height-150);

      this.botao_cowboy.class("playButton");
      this.botao_inimigo.class("playButton");

      this.reset.class("resetButton");
      this.reset.position(width-200, 50);

      this.sequencia.class("greeting");
      this.sequencia.position(width/2, height/2);
      
      this.mensagemFinal.class("greeting");
      this.mensagemFinal.position(width/2 - 300, height/2 - 100);

    }//elementosTela
  
    play() 
    {
      //mudar a posição dos elementos da tela para jogar
      this.elementosTela();
      
      //resertar o banco de dados
      this.resetButton();
  
      //pegar informação dos players
      Player.getPlayersInfo();

      //verificar o pressionamento do botão
      this.gameMousePressed();
      
      //verificar se os jogadores estão definidos para começar o jogo
      if (allPlayers !== undefined) 
    {
        //alterar a imagem
        console.log("players definidos");
        //imagem de fundo do jogo
        image(fundoIMG, 0, 0, width, height);
    
         //índice da matriz
        var index = 0;
        //percorrer o objeto JS para verificar informações sobre os jogadores
        for (var plr in allPlayers) {
          //adicione 1 ao índice para cada loop
          index = index + 1;

          //exibição dos personagens
          var x = allPlayers[plr].positionX;
          var y = allPlayers[plr].positionY;

          jogadores[index-1].position.x = x;
          jogadores[index-1].position.y = y;

          //comando que serão dados para um jogador individualmente usando a matriz de jogadores
          if (index === player.index) {
            //marcação do jogador na tela
            stroke(10);
            fill("red");
            ellipse(x, y, 100, 100);
          }
        }//for in

          //chamada da função de geração dos números
          this.numeros();
    
          //chamada da função de conferência
          this.confere();
    
        drawSprites();
      }//if allPlayers
    }//play

    //resetar o banco de dados
    resetButton() {
      this.reset.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {},
        });
        window.location.reload();
      });
    }//resetButton


    //geração da sequência de números
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
      }//numeros
      
    //verificação de digitação do cowboy
    numeraçao(){
        console.log("numeracao começa");
        codigoCowboy[icowboy]=Number(this.entrada_cowboy.value());
        this.entrada_cowboy.value("");
        icowboy+=1;
        console.log("numeracao termina");
      }//numeracao

    //verificação de digitação do inimigo
    numeraçaoInimigo(){
        codigoInimigo[iinimigo]=Number(this.entrada_inimigo.value());
        this.entrada_inimigo.value("");
        iinimigo+=1;
      }//numeracaoInimigo
      
    //função de conferência dos números
    confere(){
      if(codigoCowboy.length===3 && codigo.length===3)
       {
         if(JSON.stringify(codigo)===JSON.stringify(codigoCowboy))
        { 
          bala.visible=true;
          bala.velocityX = 10;
        }
      }

      if(codigoInimigo.length===3 && codigo.length===3)
      {
        if(JSON.stringify(codigo)===JSON.stringify(codigoInimigo))
        { 
          balaInimigo.visible=true;
          balaInimigo.velocityX = -10;
        }
      } 
      }//confere

      //verifica o pressionamento do botão
      gameMousePressed() {
        this.botao_cowboy.mousePressed(() => {
          this.numeraçao();
        });
        this.botao_inimigo.mousePressed(() => {
          this.numeraçaoInimigo();
        });
      }
    
      //pegar o estado do jogo do Banco de dados
      getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      
      //atualizar o estado do jogo do Banco de dados
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
      
  }//class
  