var listaCartas = [];
var cartasJogador = [];
var escolhaJogador = 0;
var cartasComputador = [];
var escolhaComputador = 0;
var scrt = 0;

function dividiCartas(){
  if(cartasJogador.length == 0 || cartasComputador.length == 0){
    var tam = listaCartas.length;
    var num = 0;
    cartasComputador = listaCartas.slice(); // copia as cartas para o computador
    var i = 0;
    var carta;
    while (cartasJogador.length < (tam/2)){
      num = parseInt(Math.random()*(tam-i));
      //splice retorna uma lista do objetos removidos por isso [0]
      cartasJogador.push(cartasComputador.splice(num,1)[0]); //remove de computador e insere em jogador
      i++;
    }
    //console.log("Computador: ",cartasComputador);
    //console.log("Jogador: ",cartasJogador);
  }
}

function sorteio(){
  var tamJogador = cartasJogador.length;
  var tamComputador = cartasComputador.length;
  var numsorteio = 0;
  
  do{
    numsorteio = parseInt(Math.random() * tamJogador);
    while(numsorteio == escolhaJogador){ //verifica se numero nao é o mesmo de uma rodada anterior
      numsorteio = parseInt(Math.random() * tamJogador);
    }
    escolhaJogador = numsorteio;
  
    numsorteio = parseInt(Math.random() * tamComputador);
    while(numsorteio == escolhaComputador){
      numsorteio = parseInt(Math.random() * tamJogador);
    }
    escolhaComputador = numsorteio;
  }while(escolhaJogador == escolhaComputador); //enquando forem sorteados numeros igual vai se repetir
}

function novaCarta(nome,url,prc,amt,ipt){
  var carta = {
    nome: nome,
    img: url,
    atributos: {
      PRECO: prc,
      AUMENTO: amt,
      IMPOSTO: ipt
    }
  };
  listaCartas.push(carta);
}

function sortearCarta(){
  dividiCartas();
  var divCarta = document.getElementById("divCartas");
  divCarta.innerHTML = "";
  sorteio();
  desenhaCarta(escolhaJogador, cartasJogador[escolhaJogador]);
  modificaBotoes();
  scrt = 1; // pode usar o segredo
}

function desenhaCarta(id,carta){
  var divCarta = document.getElementById("divCartas");
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">'; 
  var nome = `<p class="carta-subtitle">${carta.nome}</p>`;
  var divOpcoes = `<div id="opcoes" class="carta-status">`; 
  var opcoes = "";
  for(var atr in carta.atributos){
    opcoes +=
      `<input type="radio" name="atributo" 
      value=${atr}>`+atr+" "+carta.atributos[atr]+`<br>`;
  }
  divCarta.innerHTML += `<div id="carta${id}"><div  
  style = "width: 360px; 
  height: 500px;
  overflow: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  position: relative;
  background-size: 350px 300px;
  background-repeat: no-repeat;
  background-position-x: 5px;
  background-position-y: 10px;
  border-radius: 33px;
  background-image: url(${carta.img});"
  >`+ moldura + nome + divOpcoes + opcoes + `</div></div></div>`
}

function modificaBotoes(){
  var jogar = document.getElementById("btnJogar");
  var sortear = document.getElementById("btnSortear");
  if(jogar.disabled==true){
    jogar.disabled = false;
    sortear.disabled = true;
  }else{
    jogar.disabled = true;
    sortear.disabled = false;
  }
}

function escolha(){
  var escolha = document.getElementsByName("atributo");
  for(var i=0;i<escolha.length;i++){
    //console.log(escolha[i].value, escolha[i].checked);
      if(escolha[i].checked){
        return escolha[i].value;
      }
  }
  return "";
}

function jogar(){
  if(scrt == 2){
    document.getElementById("cartaSCRT").remove();  
  }
  scrt = 0;
  var resultado = document.getElementById("resultado");
  var op = escolha();
  console.log("escolha: ",op);
  if(op==""){
    alert("Escolha um Atributo!!!");
  }else{
    var valorJogador = cartasJogador[escolhaJogador].atributos[op];
    var valorComputador = cartasComputador[escolhaComputador].atributos[op];
    console.log("Valor Jogador: ",valorJogador," Valor Computador: ",valorComputador);
    desenhaCarta("pc", cartasComputador[escolhaComputador]);
    if(valorJogador > valorComputador){
      cartasJogador.push(cartasComputador.splice(escolhaComputador,1)[0]); //remove a carta do computador e passa ao jogador
      resultado.innerHTML = `<h1 class="page-title">Jogador Venceu a rodada, computador tem ${cartasComputador.length} cartas!!!</h1>`;   
    }else 
      if(valorJogador < valorComputador){
        cartasComputador.push(cartasJogador.splice(escolhaJogador,1)[0]);
        resultado.innerHTML = `<h1 class="page-title">Computador Venceu a rodada, jogador tem ${cartasJogador.length} cartas!!!</h1>`;
      }else
        resultado.innerHTML = `<h1 class="page-title">Empatou, Computador esta com ${cartasComputador.length} cartas 
        e jogador esta com ${cartasJogador.length} cartas !!!</h1>`;
    vitoria();
    modificaBotoes();
  }
}

function vitoria(){
  var resultado = document.getElementById("resultado");
  if(cartasComputador.length == 0){
    resultado.innerHTML += `<br><br><h1 class="page-title">VITÓRIA do Jogador</h1>`;
    cartasJogador.splice(0,cartasJogador.length); //remover todos os elementos
  }else
    if(cartasJogador.length == 0){
      resultado.innerHTML += `<br><br><h1 class="page-title">VITÓRIA do COMPUTADOR</h1>`;
      cartasComputador.splice(0,cartasComputador.length); //remover todos os elementos
    }
}

function iniciaJogo(){
  for(var i = 0;i<listaCartas.length;i++){
    desenhaCarta(i,listaCartas[i]);
  }
}

novaCarta("Picanha","https://espetinhodesucesso.com.br/wp-content/uploads/2017/09/espetinho-de-picanha-dicas-1200x709.jpg",8,7,5);

novaCarta("Gasolina","https://conteudo.imguol.com.br/c/parceiros/b0/2020/07/14/bomba-de-combustivel-com-gota-de-gasolina-na-ponta-do-bocal-1594724437646_v2_450x337.jpg",9,10,8);

novaCarta("Gas","https://apucarana.cidadecancao.com/media/catalog/product/cache/1/image/855x635/9df78eab33525d08d6e5fb8d27136e95/g/a/gas-cozinha-revenda-cartao-13kg-0000002156279.jpg",10,9,10);

novaCarta("Ovo","https://www.mundoboaforma.com.br/wp-content/uploads/2015/02/ovos-cortados.jpg",6,8,5);

novaCarta("CarroZero","https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2020/01/51.jpg",10,8,9);

novaCarta("Arroz","https://img.cybercook.com.br/receitas/404/arroz-branco-5.jpeg",7,8,5);

novaCarta("Conta de Agua","http://mixmanutencao.com.br/wp-content/uploads/2013/01/vazamento-torneira.jpg",6,7,5);

novaCarta("Conta de Energia","https://wattconsultoria.com.br/wp-content/uploads/2021/02/conta-de-luz-energia-eletrica-economia-calculadora-lampada-1513701106623_v2_1920x1080-1.jpg",9,10,5);


function secreto(){
    if(event.key == "T" && scrt == 1){
      desenhaCarta("SCRT", cartasComputador[escolhaComputador]);
      scrt = 2; // foi usado o segredo
    }
  }
  
  document.body.onkeypress = secreto;

iniciaJogo();

//dividiCartas();