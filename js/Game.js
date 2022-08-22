class Game {
    constructor() {
      //variáveis da classe
      this.entrada_cowboy = createInput("");
      this.entrada_inimigo = createInput("");
      this.botao_cowboy = createButton("");
      this.botao_inimigo = createButton("");
      this.reset = createButton("Reset");
      this.sequencia = createElement("h2");
      this.mensagemFinal = createElement("h2");
      this.vencedor = 0;
    }
  
    //início (primeiro estado do jogo)
    start() {
      //novo player e atualização da contagem no BD
      player = new Player();
      playerCount = player.getCount();
  
      //criação de novo form e exibição
      form = new Form();
      form.display();

      //sprites das bordas
      edges=createEdgeSprites();

      //sprites dos personagens
      indio = createSprite(width/2,height-150,10,10);
      indio.addImage("indio", indioImg);

      bala=createSprite(width/4,height-65,10,30);
      bala.addImage("bala", balaImg);
      bala.scale=0.01;
      bala.addImage("tiro", tiroImg);

      cowboy = createSprite(width/4,height-90,10,30);
      cowboy.addImage(cowboyImg);
      cowboy.setCollider("rectangle",0,0,50,100);
      cowboy.debug = false;

      balaInimigo=createSprite(width-300,height-55,10,30);
      balaInimigo.addImage("balaInimigo",balaInimigoImg);
      balaInimigo.scale=0.01;
      balaInimigo.addImage("tiro", tiroImg);

      bandido=createSprite(width-300,height-80,10,20);
      bandido.addImage(bandidoImg);
      bandido.scale = 1.3;
      bandido.setCollider("rectangle",0,0,30,80);
      bandido.debug = false;

      arma=createSprite(width/4+50,height-65,10,30);
      arma.addImage(armaImg);

      armaInimigo=createSprite(width-330,height-55,10,30);
      armaInimigo.addImage(armaInimigoImg);
      
      //matriz das balas
      jogadores = [bala,balaInimigo];
        
    }//start
  
    //configuração dos elementos da ela assim que o jogo começa
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

      this.sequencia.class("numbers");
      this.sequencia.position(width/2, height/2);
      
      this.mensagemFinal.class("greeting");
      this.mensagemFinal.position(width/2 - 300, height/2 - 100);

    }//elementosTela
  
    //jogando (segundo estado do jogo)
    play() 
    {
      //mudar a posição dos elementos da tela para jogar
      this.elementosTela();
      
      //resertar o banco de dados
      this.resetButton();
  
      //pegar informação dos players
      Player.getPlayersInfo();

      //verificar a digitação do número e pressionamento do botão
      this.gameMousePressed();
      
      //verificar se os jogadores estão definidos para começar o jogo
      if (allPlayers !== undefined) 
      {
        //verificação dos players definidos pelo console
        console.log("players definidos");

        //imagem de fundo do jogo
        image(fundoIMG, 0, 0, width, height);

         //índice dos jogadores
        var index = 0;
        //percorrer o objeto JS para verificar informações sobre os jogadores
        for (var plr in allPlayers) 
        {
          //adicione 1 ao índice para cada loop
          index = index + 1;

          //exibição dos personagens
          var x = allPlayers[plr].positionX;
          var y = allPlayers[plr].positionY;

          //verificação da morte e mudança do sprite caso verdadeiro
          var currentDeath = allPlayers[plr].death;
          if (currentDeath === true) {
            jogadores[index - 1].changeImage("tiro");
            jogadores[index - 1].scale = 0.2;
          }

          //passando a posição do Objeto JS allPlayers para a matriz jogadores
          jogadores[index-1].position.x = x;
          jogadores[index-1].position.y = y;

          //comandos que serão dados para um jogador individualmente usando a matriz de jogadores
          if (index === player.index) {
            //marcação do jogador na tela
            stroke(10);
            fill("red");
            //ellipse(x, y-100, 40, 40);
            triangle(x-25, y-125, x, y-100, x+25, y-125);

            //chamada da função da colisão do tiro
            this.collision(index);
          }
        }//for in

          //chamada da função de geração dos números
          this.numeros();
    
          //chamada da função de conferência
          if(player.death === false){
            this.confere();
          }

          //verificação do vencedor para movimentação da bala
          if(this.vencedor === 1){
            player.positionX += 10;
            player.update();
          }
          if(this.vencedor === 2){
            player.positionX -= 10;
            player.update();
          }

          //mensagem final indicando o vencedor
          

          //desenhar os sprites
          drawSprites();
      }//if allPlayers
    }//play

    //mostrar mensagem ao final
    
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
        if (frameCount%100===0 && contador<3){
          sequencia=Math.round(random(1,90));
          codigo[contador]=sequencia;
          noLoop();
          //textSize(60);
          //fill("black")
          //text(sequencia,width/2,height/2);
          this.sequencia.html(sequencia);
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
          this.vencedor = 1;
        }
      }

      if(codigoInimigo.length===3 && codigo.length===3)
      {
        if(JSON.stringify(codigo)===JSON.stringify(codigoInimigo))
        { 
          this.vencedor = 2;
        }
      } 
      }//confere

      //verifica o pressionamento do botão após a digitação de cada número
      gameMousePressed() {
        this.botao_cowboy.mousePressed(() => {
          this.numeraçao();
        });
        this.botao_inimigo.mousePressed(() => {
          this.numeraçaoInimigo();
        });
      }//gameMousePressed
    
      //pegar o estado do jogo do Banco de dados
      getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }//getState
      
      //atualizar o estado do jogo do Banco de dados
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }//update

      //colisão do tiro
      collision(index){
        //cowboy
        if(index === 1){
          //0 com 1
          if(jogadores[index-1].collide(bandido)){
            console.log("cowboy ganhou");
            player.positionX = width-200;
            player.death = true;
            player.update();
            //this.vencedor = 1;
            console.log(this.vencedor);
          }
        }
        //inimigo
        if(index === 2){
          // 1 com 0
          if(jogadores[index-1].collide(cowboy)){
            console.log("inimigo ganhou");
            player.positionX = width/4+100;
            player.death = true;
            player.update();
            //this.vencedor = 2;
            console.log(this.vencedor);
          }
        }
      }//collision

      //fim de jogo
      end()
      {
        swal
        (
          {
            title: 'Game Over',
            text: "Obrigada por Jogar!",
            imageUrl: "https://github.com/jvElizardo/jogo-cowboy/blob/main/assets/testeI.png",
            imageSize: "150x150",
            confirmButtonText: "Jogar Novamente"
          },
          function(isConfirm)
          {
            if(isConfirm)
            {
              database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {},
              });
              window.location.reload();
            }
          }
        )
      }
      
  }//class
  