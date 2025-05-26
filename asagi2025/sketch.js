let scal = 2;
let cwidth, cheight;
let icnnoise=1;
let count=0;


// drastic sin curve
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let psi = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


// butterfly location
let msXpx, msYpx;


function preload () {
  imgback = loadImage("back-wide.png");
  imgkid = loadImage("kid1.png");
  kid2 =  loadImage("kid2.png");
  kid1b = loadImage("kid1-brink.png");
  kid2b = loadImage("kid2-brink.png");
  imgicn = loadImage("asagi-icon.png");
  imgicnr = loadImage("asagi-icon-red.png");
  imgobj = loadImage("objects.png");
  leaves1 = loadImage("leaves1.png");
  leaves2 = loadImage("leaves2.png");
  dust1 = loadImage("dust1.png");
  dust2 = loadImage("dust2.png");
  dust3 = loadImage("dust3.png");
  dust4=  loadImage("dust4.png");
  dust5=  loadImage("dust5.png");
  dust6=  loadImage("dust6.png");
}

function setup() {
  //frameRate(24);
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  //createCanvas(cwidth, cheight);
  // for iframe on gallery 
  canvas = createCanvas(cwidth, cheight);
  canvas.style('width','100%');canvas.style('height','auto');
  background(255);
  

  // drastic sine curve
  dx = (TWO_PI / period) * xspacing;
  w =  cwidth + xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  sinHeight = cheight/5;
  amplitude = sinHeight;
  
  // for butterfly icon
  // アイコンの初期値を設定
  msXpx = int(mouseX/scal)*scal;
  msYpx = int(mouseY/scal)*scal;
}

function draw() {
  d = new Date();
  msec = d.getMilliseconds();
  sec = d.getSeconds();
  
  // for rhombus
  rhombusr = 24*scal;
  rhombusx = int(random(-rhombusr, cwidth)/scal)*scal;
  rhombusy = int(random(-rhombusr, cheight)/scal)*scal;
  rcolors = [255,255,255,100];
  
  image(imgback, 0,0, cwidth, cheight);  
  
  tint(255,100);
  beginLayer();
  background(255,255,255,0);
  // sin curve 
  noStroke();
  //colorDice = int(random(colors.length));
  fill(177,237,253,100);
  calcWave();
  psi += 0.01;
  let gamma = psi;
  for (let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin( gamma/TWO_PI ) * amplitude;
    gamma +=dx;
  }
  for (let x = 0; x < yvalues.length; x++) {
    drasticx = int(x*xspacing/scal)*scal;
    drasticy = int(yvalues[x]/scal)*scal;

    rect(drasticx, drasticy+cheight/2, scal, scal);
    rect(drasticx, drasticy+cheight*1/9, scal, scal);
    rect(drasticx, drasticy+cheight*8/9, scal, scal);
  }
  
  //if(count==6){
    erase();
    makeRhombus(rhombusx, rhombusy, rhombusr, rcolors);
    //count=0;
    noErase();
  //}
  
  endLayer();
  tint(255,255);
  
  if(count==6){
    makeRhombus(rhombusx, rhombusy, rhombusr, rcolors);
    count=0;
  }
  
  count+=1;
  
  if(msXpx>150*scal && msXpx<200*scal && msYpx>124*scal && msYpx<177*scal) {
    if(sec%2===0){
      image(kid1b, 0, 0, cwidth, cheight);
      image(leaves1,  0, 0, cwidth, cheight);
    } else {
      image(kid2b, 0, 0, cwidth, cheight);
      image(leaves2, 0, 0, cwidth, cheight);
    }
  } else {
    if(sec%2===0){
      image(imgkid, 0, 0, cwidth, cheight);
      image(leaves1,  0, 0, cwidth, cheight);
    } else {
      image(kid2, 0, 0, cwidth, cheight);
      image(leaves2,  0, 0, cwidth, cheight);
    }
  }
  image(imgobj, 0, 0, cwidth, cheight);
  
  if(sec%3===0){
    if(msec < 100) {
      image(dust1,  0, 0, cwidth, cheight);
    } else if (msec <200) {
      image(dust2,  0, 0, cwidth, cheight);
    } else if (msec <300) {
      image(dust3, 0, 0, cwidth, cheight)
    } else if (msec <400) {
      image(dust4, 0, 0, cwidth, cheight);
    } else if (msec <500) {
      image(dust5, 0, 0, cwidth, cheight);
    } else if (msec <600) {
      image(dust6, 0, 0, cwidth, cheight);
    }
  }

  
  // the butterfly icon
  rop = map(noise(icnnoise), 0,1,50,255);
  tint(255,rop);
  // マウスが動いたときにアイコンを追従させる機能はmouseMoved に
  
  // WASD
  // keyIsDown()関数を使って複数キーの同時押しに対応
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // 87はWのキーコード
    msYpx -= scal;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // 83はSのキーコード
    msYpx += scal;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // 68はDのキーコード
    msXpx += scal;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // 65はAのキーコード
    msXpx -= scal;
  }
  
  if(msYpx > 160*scal) {
    image(imgicnr, msXpx, msYpx, imgicnr.width/4*scal, imgicnr.height/4*scal);
  } else {
    image(imgicn, msXpx, msYpx, imgicn.width/4*scal, imgicn.height/4*scal);
  }

  tint(255,255);
  icnnoise+=0.01;

}


function mouseMoved() {
  msXpx = int(mouseX/scal)*scal;
  msYpx = int(mouseY/scal)*scal;
}


function calcWave() {
  psi += 0.01;// 波の速さはここ

  // For every x value, calculate a y value with sine function
  let x = psi;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}


function makeRhombus (x, y, r, color) {// xyは左上、rは大きさ、colorは透過色込み
  //rectr = int(random(2, 15))*2-1;// 奇数で出力
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}
