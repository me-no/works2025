let scal = 2;
let sec;
let count = 0;


// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave

// parlin noise
let nz = 1;
let nz_x = 1;
let nz_y = 2;


function preload () {
  back = loadImage("backwsnake.png");
  cloud = loadImage("clouds.png");
  lantern = loadImage("lantern2.png");
  kid = loadImage("kid-1.png");
  kid2 = loadImage("kid-2.png");
  shrine = loadImage("shrine2.png");
  bamboo1 = loadImage("bamboo1.png");
  bamboo2 = loadImage("bamboo2.png");
  
  start_x = -10*scal;
  start_y = -10*scal;
}

function setup() {
  cwidth = (back.width/8-20)*scal;
  imgwidth = back.width/8*scal;
  createCanvas(cwidth,cwidth);
  background(255);
  
  noStroke();
  fill(226,240,246);
  rect(0,0,276*scal,183*scal)
  
  fill(196,234,249);
  rect(0,0,276*scal,99*scal);
  
  mouseX=0;
  mouseY=cwidth;
  
  // sin wave
  amplitude = cwidth/20;
  swidth = cwidth+scal;// サインカーブの長さを変える(cwidth=100%)
  //dx = map(random(), 0, 1, -(TWO_PI/period)*4, -(TWO_PI/period));
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  yvalues = new Array(floor(swidth / scal));
}

function draw() {
  nzvar_xs = noise(nz_x)*40;
  //nzvar_ys = noise(nz_y)*10;
  
  currentTime = new Date();
  sec = currentTime.getSeconds();
  
  // reset background of bamboo
  makeRhombus(55, cwidth-48, 15, [255,255,255,255]);
  makeRhombus(70, cwidth-28, 15, [255,255,255,255]);
  makeRhombus(95, cwidth-55, 10, [255,255,255,255]);
  
  makeRhombus(cwidth-95, cwidth-50, 15, [255,255,255,255]);
  makeRhombus(cwidth-45, cwidth-30, 15, [255,255,255,255]);

  
  // draw rectangle background
  rhr = int(random(5,20))*scal;
  rh_x = int(random(cwidth)/scal)*scal;
  rh_y = int(random(cwidth)/scal)*scal;
  if(rh_y > 183*scal) {
    rhcolor = [255,255,255,100];
  } else if (rh_y > 99*scal){
    rhcolor= [226,240,246,100];
  } else {
    rhcolor = [196,234,249,100];
  }
  
  if(count%17==0){
    makeRhombus(rh_x, rh_y, rhr,rhcolor);
    count = 0;
  }
  count++;

  
  // draw a line on mouse cursor
  for(let i =0; i<cwidth; i+=scal){// 式はy=x-mouseX+mouseY
    irate=map(cwidth*cwidth-i*i,0,cwidth*cwidth,0,255);
    yrate=(cwidth-mouseY)/cwidth;
    //fill(193,143,81);
    fill(247,217,134,255);
    rect(i, i-mouseX+mouseY, scal, scal);
    fill(247,217,134,140);
    rect(i, i-mouseX+mouseY-scal, scal, scal);
    rect(i, i-mouseX+mouseY+scal, scal,scal);
    fill(247,217,134,70);
    rect(i, i-mouseX+mouseY-2*scal, scal, scal);
    rect(i, i-mouseX+mouseY+2*scal, scal,scal);
  }
  
  image(back,start_x,start_y,imgwidth,imgwidth);
  
  image(cloud,start_x+nzvar_xs-30,start_y,imgwidth,imgwidth);
  
  
  // sine wave
  yvalues = calcWave(yvalues, amplitude, dx, 0.015);// speed controled by 4th
  renderWaveImg(int(cwidth/2/scal+33)*scal, yvalues,lantern, lantern.width/8*scal,lantern.height/8*scal);

  image(shrine,start_x,start_y,imgwidth,imgwidth);

  
  if(sec%4===0 || sec%4===2) {
    image(kid,start_x,start_y,imgwidth,imgwidth);
    image(bamboo1,start_x,start_y,imgwidth,imgwidth);
  } else if (sec%4===1) {
    image(kid,start_x,start_y,imgwidth,imgwidth);
    image(bamboo2,start_x,start_y,imgwidth,imgwidth);
  } else if (sec%4===3) {
    image(kid2,start_x,start_y,imgwidth,imgwidth);
    image(bamboo2,start_x,start_y,imgwidth,imgwidth);
  }
  
  nz_x += 0.01;
  //nz_y += 0.01;
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
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}


function renderWaveImg(center, array,img, i_width, i_height) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x+=i_width/2) {
    image(img, x*scal, center +array[x], i_width, i_height);
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
