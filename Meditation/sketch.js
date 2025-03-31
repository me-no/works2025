let scal = 2;
let cwidth;
let wid = 256, hei = 256;
let imwidth,imheight;
//let org_x = 5*scal,org_y = 7*scal;

let stvel=8;

let currentTime;

let noisex = 1, noisey = 2;
let nf_x = 0.5, nf_y = 1.5;

let drop_x,drop_y;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave

let count;
let dropAppear;

function preload () {
  main = loadImage("main.png");
  front=loadImage("front.png");
  leaf_l = loadImage("lear_l_w-1.png");
  leaf_r = loadImage("leaf_r_w.png");
  flower_l = loadImage("flower_l.png");
  flower_r = loadImage("flower_r.png");
  drop_s = loadImage("drop_s.png");
  drop_m = loadImage("drop_m.png");
  drop_l = loadImage("drop_l.png");
  petal_l=loadImage("petal_l.png");
  petal_m =loadImage("petal_m.png");
  petal_s=loadImage("petal_s.png");
  petal_ss=loadImage("petal_ss.png");
  petal1=loadImage("petal1.png");
  petal2 = loadImage("petal2.png");
  
  drops=[drop_s,drop_m,drop_l];
}


function setup() {
  frameRate(30);
  cwidth = wid*scal;
  drop_y=cwidth;
  drop_x = int(random(wid))*scal;
  dropAppear=int(random(10));
  dice=int(random(drops.length));
  dropAppearing=drops[dice];
  
  createCanvas(cwidth, cwidth);
  
  background(204,207,217);
  
  // sin wave
  amplitude = cwidth/4;
  swidth = cwidth+scal;
  //dx = map(random(), 0, 1, -(TWO_PI/period)*4, -(TWO_PI/period));
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  //dvel = map(random(), 0, 1, 1, 2);// 二つ目のサインカーブの周期を変える
  dvel = random(1.551,1.6);
  yvalues = new Array(floor(swidth / scal));
}

function draw() {
  d = new Date();
  count = d.getMilliseconds();
  
  // rhombus in the background
  noStroke();
  fill(243,216,186);
  rh_margin=10*scal;// 四角の出現箇所の余白
  rh_x = int(random(rh_margin,cwidth-rh_margin*2));
  rh_y = int(random(rh_margin,cwidth));
  rh_len = int(random(20,30));
  makeRhombus(rh_x,rh_y,rh_len,[243,216,186,50]);
  
  // sin wave
  //fill(204,207,217,50);
  fill(255,255,255,80);
  yvalues = calcWave(yvalues, amplitude, dx, 0.01);
  renderWave(wid/4*scal, yvalues);
  
  image(main,0,0,cwidth,cwidth);
  
  yvalues = calcWave(yvalues, amplitude/2, dvel, 0.001);// ここでdvel にdx をかけると正常なサインカーブになる
  fill(243,216,186);
  renderWave((wid/2+28)*scal, yvalues);
  
  renderWaveImg((wid/2+28)*scal,yvalues,[petal_ss,petal_s]);

  yvalues = calcWave(yvalues, amplitude/4, dx, 0.01);
  renderWaveImg((wid/2+22)*scal,yvalues,[petal1,petal2]);
  
  leafl_x = noise(noisex)*30;
  leafl_y = noise(noisey)*30;
  
  leafr_x = noise(noisey)*30;
  leafr_y = noise(noisex)*30;
  
  flowerl_x = noise(nf_x)*40;
  flowerl_y = noise(nf_y)*40;
  flowerr_x = noise(nf_y)*40;
  flowerr_y = noise(nf_x)*40;
  
  image(leaf_l, -leafl_x, 50*scal+leafl_y, leaf_l.width/8*scal,leaf_l.height/8*scal);
  image(leaf_r, cwidth-leaf_r.width/8*scal+leafl_x, 50*scal+leafl_y, leaf_r.width/8*scal,leaf_r.height/8*scal);
  
  image(flower_l, 5*scal-flowerl_x, 50*scal+flowerl_y, flower_l.width/8*scal,flower_l.height/8*scal);
  image(flower_r, cwidth-flower_r.width/8*scal+flowerr_x,50*scal+flowerr_y,flower_r.width/8*scal,flower_r.height/8*scal);
  
  noisex +=0.001;
  noisey +=0.002;
  nf_x +=0.003;
  nf_y +=0.003;
  
  image(front,0,0,cwidth,cwidth);
  
  //water drop  
  if(dropAppear%5===0 && drop_y > cwidth) {
    dice=int(random(drops.length));
    dropAppearing=drops[dice];
    drop_x = int(random(wid))*scal;
    drop_y=-drop_l.height/8*scal;
  } else {
    dropAppear=int(random(10));
  }    image(dropAppearing,drop_x,drop_y,dropAppearing.width/8*scal,dropAppearing.height/8*scal);

  drop_y++;
}


function calcWave(array, h, _dx, velocity) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += velocity;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < array.length; i++) {
    array[i] = sin(x) * h;
    x += _dx;
  }
  return array;
}

function renderWave(center, array) {
  //noStroke();
  //fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}

function renderWaveImg(center, array,imgs) {
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x+=imgs[1].width/8*scal) {
    //image(imgs, x * scal, center + array[x], imgs.width/8*scal, imgs.height/8*scal);
    let i = count+x;
    if(i<500) {  
      image(imgs[0], x * scal, center + array[x], imgs[0].width/8*scal, imgs[0].height/8*scal);
    } else {
      image(imgs[1], x * scal, center + array[x],imgs[1].width/8*scal, imgs[1].height/8*scal);
    }
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

