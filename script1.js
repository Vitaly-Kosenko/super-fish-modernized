let cvs = document.createElement("canvas");
cvs.className = 'canvas_class';
cvs.width = "1880";
cvs.height = "899";
document.querySelector('div').appendChild(cvs);
let ctx = cvs.getContext('2d');
let imgFish = new Image();
let imgCoin = new Image();
let imgSuperCoin = new Image();
let imgBadCoin = new Image();
let imgSea = new Image();
let cWidth = 40;
let fWidth = 40;
let startTime = new Date();
let MaxCoins =10;

fish = {
    x: 30,
    y: 200,
    width: fWidth,
    height: fWidth
};
let score = 0;
coin = [];
coin[0] = {
    x: cvs.width,
    y: yPos()

};
badCoin = [];
badCoin[0] = {
    x: cvs.width,
    y: yPos()
};
imgFish.src = "img/fish.png";
imgCoin.src = "img/Coin.png";
imgSuperCoin.src = "img/SuperCoin.png";
imgBadCoin.src = "img/badcoin.png";
imgSea.src = "img/sea.jpg";
document.addEventListener('keydown', event => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': fish.y -= 25;
            break;
        case 'ArrowDown':
        case 'KeyS': fish.y += 25;
            break;
        case 'ArrowLeft':
        case 'KeyA': fish.x -= 25;
            break;
        case 'ArrowRight':
        case 'KeyD': fish.x += 25;
            break;
    }
});
function draw() {
    ctx.drawImage(imgSea, 0, 0);
    for (i = 0; i < coin.length; i++) {
        ctx.drawImage(imgCoin, coin[i].x, coin[i].y, cWidth, cWidth);
        coin[i].x--;
        if (coin[i].x === 420 && coin.length <= MaxCoins) {
            generateCoin();
        }
        if (coin[i].x === 0) {
            coin.splice(i, 1);
            if (coin.length <= MaxCoins)
               
            generateCoin(); 
        }
        
        if (Math.sqrt(Math.pow(fish.x - coin[i].x, 2) + Math.pow(fish.y - coin[i].y, 2)) < fish.width) {
            score++;
            if (fish.width <= 60) { 
                fish.width++;
                fish.height++;
            }
            coin.splice(i, 1);
            if (coin.length <= 1)
                generateCoin();
		}

        
        if (Math.sqrt(Math.pow(fish.x - coin[i].x, 2) + Math.pow(fish.y - coin[i].y, 2)) < fish.width) {
            score++;
            if (fish.width <= 60) { 
                fish.width++;
                fish.height++;
            }
            coin.splice(i, 1);
            if (coin.length <= 1)
                generateCoin()
			
		}
	}
	
    for (i = 0; i < badCoin.length; i++) {
        ctx.drawImage(imgBadCoin, badCoin[i].x, badCoin[i].y, cWidth, cWidth);
        badCoin[i].x--;
        if (badCoin[i].x === 320) {
            badCoin.push({
                x: cvs.width,
                y: yPos()
            });
        }
        if (Math.sqrt(Math.pow(fish.x - badCoin[i].x, 2) + Math.pow(fish.y - badCoin[i].y, 2)) < fish.width) {
            
            location.reload();
        }
        
        if (badCoin[i].x === 0) {
            badCoin.splice(i, 1);
        }
    }
    
    if (fish.x <= 0 ||
        fish.x + fish.width >= 1880 ||
        fish.y <= 0 ||
        fish.y + fish.width >= 899 ) 
        {
        
        location.reload();
    }
    ctx.drawImage(imgFish, fish.x, fish.y, fish.width, fish.height);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '14px Verdana';
    ctx.fillText("Money: " + score, 10, 20);
    getTime();
    ctx.fillText("x: " + fish.x + "y: " + fish.y,320,20);
    requestAnimationFrame(draw);
}

function yPos() {
    return Math.floor(Math.random() * (cvs.height - cWidth));
}

function generateCoin() {
    coin.push({
        x: cvs.width,
        y: yPos()
    });
}
function getTime() {
    let dateNow = new Date();
    let msPerSec = 1000;
    let time = new Date() - startTime; 
    sec = Math.floor(time / msPerSec);
    let minutes = Math.floor(sec / 500000);
    
    if (minutes > 0)
        ctx.fillText('Time: ' + minutes + "min. " + (secminutes * 500000) + " sec", 120, 20);
    else 
        ctx.fillText('Time: ' + sec + " sec", 120, 20);
}
imgSea.onload = draw;