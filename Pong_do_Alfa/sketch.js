// variáveis da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadexbolinha = 5;
let velocidadeybolinha = 5;

// variáveis da raquete
let xraquete = 5;
let yraquete = 150;
let raquetecomprimento = 10;
let raquetealtura = 90;

//variáveis do oponente
let xraqueteoponente = 685;
let yraqueteoponente = 150;
let velocidadeyoponente;

let colidiu = false;

//placar do jogo
let meuspontos = 0;
let pontosdooponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  //audio1();
  audio2();
}

function setup() {
  createCanvas(700, 400);
  trilha.loop();
}

function draw() {
  background(21);
  mostrabolinha();
  movimentabolinha();
  verificacolisaoborda();
  mostraraquete(xraquete, yraquete);
  movimentaminharaquete();
  //verificacolisaoraquete();
  colisaominharaquetebiblioteca(xraquete, yraquete);
  mostraraquete(xraqueteoponente, yraqueteoponente);
  movimentaraqueteoponente();
  colisaominharaquetebiblioteca(xraqueteoponente, yraqueteoponente);
  //placar();
  placarcustom();
  marcaponto();
}

function mostrabolinha() {
  circle(xbolinha, ybolinha, diametro);
}

function movimentabolinha() {
  xbolinha += velocidadexbolinha;
  ybolinha += velocidadeybolinha;
}

function verificacolisaoborda() {
  if (xbolinha + raio > width || xbolinha - raio < 0) {
    velocidadexbolinha *= -1;
  }

  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeybolinha *= -1;
  }
}

function mostraraquete(x, y) {
  rect(x, y, raquetecomprimento, raquetealtura);
}

function movimentaminharaquete() {
  if (keyIsDown("87")) {
    yraquete -= 10;
  }

  if (keyIsDown("83")) {
    yraquete += 10;
  }
}

function verificacolisaoraquete() {
  if (
    (xbolinha - raio < xraquete + raquetecomprimento) &
    (ybolinha - raio < yraquete + raquetealtura) &
    (ybolinha + raio > yraquete)
  ) {
    velocidadexbolinha *= -1;
    raquetada.play();
  }
}

function colisaominharaquetebiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raquetecomprimento,
    raquetealtura,
    xbolinha,
    ybolinha,
    raio
  );
  if (colidiu) {
    velocidadexbolinha *= -1;
    raquetada.play();
  }
}

function movimentaraqueteoponente() {
  if (keyIsDown(UP_ARROW)) {
    yraqueteoponente -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yraqueteoponente += 10;
  }
}

function placar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meuspontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosdooponente, 470, 26);
}

function placarcustom() {
  stroke(255, 215, 0);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 0, 0));
  rect(150, 10, 40, 20);
  fill(0);
  text(meuspontos, 170, 26);
  fill(color(255, 0, 0));
  rect(450, 10, 40, 20);
  fill(0);
  text(pontosdooponente, 470, 26);
}

function marcaponto() {
  if (xbolinha > 690) {
    meuspontos += 1;
    ponto.play();
  }
  if (xbolinha < 10) {
    pontosdooponente += 1;
    ponto.play();
  }
}

function audio1() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function audio2() {
  trilha = loadSound("Blue Bird.mp3");
  ponto = loadSound("oni-chan.mp3");
  raquetada = loadSound("raquetada.mp3");
}
