const canvas = document.querySelector('#bg-main')

const array = canvas.getContext('2d')

const ROW = 18

const COL = 10

// kich thuc 1 o
const SQ = 40

const COLOR = 'WHITE'

var score = 0

var restart =document.querySelector('.restart')

var audio = document.querySelector('#audio')

var  changeLevel =document.querySelector('.change-level')

function drawRectangle(x, y, color) {

    // chon mau

    array.fillStyle = color

    // Ve hinh chu nhat
    array.fillRect(x * SQ, y * SQ, SQ, SQ)

    array.strokeStyle = '#333'

    array.strokeRect(x * SQ, y * SQ, SQ, SQ)

    // array.fillImage()
}

// tao mang 2 chieu

let board = []

for (var i = 0; i < ROW; i++) {
    board[i] = []
    for (var j = 0; j < COL; j++) {
        board[i][j] = COLOR
    }
}
console.log(board)

// render board

function drawBoard() {
    for (var i = 0; i < ROW; i++) {
        for (var j = 0; j < COL; j++) {
            drawRectangle(j, i, board[i][j])
        }
    }
}
drawBoard()

// Tao ra 1 lop gom cac hinh va mau sac
class Piece {
    constructor(shape, color) {
        this.shape = shape
        this.color = color

        // Chi so goc quay dau tien
        this.shapeN = 0
        this.activeShape = this.shape[this.shapeN]

        // toa do dau tien khi ve hinh
        this.x = 3
        this.y = -2
    }

    // to mau cho hinh
    fill(color) {
        for (let r = 0; r < this.activeShape.length; r++) {
            for (let c = 0; c < this.activeShape.length; c++) {
                if (this.activeShape[r][c]) {
                    drawRectangle(this.x + c, this.y + r, color)
                }
            }
        }
    }

    draw() {
        this.fill(this.color)
    }
    unDraw() {
        // mac dinh ve mau trang
        this.fill(COLOR)
    }
    moveDown(){
       if(!this.collision(0,1,this.activeShape)){
        this.unDraw()
        this.y++
        this.draw()
       }else{
           this.lock()
           p = randomPiece()
       }

    }
    moveLeft(){
        if(!this.collision(-1,0,this.activeShape)){
            this.unDraw()
            this.x--
            this.draw()
        }

    }
    moveRight(){
        if(!this.collision(1,0,this.activeShape)){
            this.unDraw()
            this.x++
            this.draw()
        }
    }
    moveTop(){
        var nextPattern = this.shape[(this.shapeN + 1) % this.shape.length]

        var move =0

        if(this.collision(0,0,nextPattern)){
            if(this.x > COL / 2){
                move = -1
            }else{
                move = 1
            }
        }

        if(!this.collision(0,0,nextPattern)){
            this.unDraw()
            this.x += move
            this.shapeN = (this.shapeN +1) % this.shape.length
            this.activeShape = this.shape[this.shapeN]
            this.draw()
        }
    }
    lock(){
        for(var r=0 ;r<this.activeShape.length;r++){
            for(var c=0;c<this.activeShape.length;c++){
                if(!this.activeShape[r][c]){
                    continue
                }
                if(this.y + r < 0){
                    var gameover =document.querySelector('.gameover')
                    gameover.classList.add('active')
                    
                   
                    restart.classList.add('active')

                    var esctext = document.querySelector('.esc-text')

                    esctext.classList.add('active')
                    
                    gameOver=true

                    audio.pause()

                    var soundgameover =document.querySelector('#sound-gameover')

                    soundgameover.play()

                    break
                }

                board[this.y +r][this.x + c] = this.color
            }
        }

        // xu li an diem

        for(var r =0 ; r< ROW ;r++){
            var isFull = true

            for(var c=0;c<COL;c++){
                isFull = isFull && (board[r][c] != COLOR)
            }

            if(isFull){
                for(var y =r ;y>1; y--){
                    for ( var c=0;c<COL ;c++){
                        board[y][c] =board[y-1][c]
                    }
                }

                for(var c=0;c<COL;c++){
                    board[0][c] =COLOR
                }

                var ring =document.querySelector('#ring')
                score+=1
                ring.play()
            }
        }
        drawBoard()

        document.querySelector('.main__score-number').innerText = score
    }
    // va cham
    collision(x,y,piece){
        for(var r=0;r<piece.length; r++){
            for(var c =0; c<piece.length; c++){
                if(!piece[r][c]){
                    // bo qua
                    continue
                }
                let newX =this.x + c + x
                let newY =this.y + r + y

                if(newX < 0 || newX >= COL || newY >=ROW ){
                    return true
                }
                if(newY < 0){
                    continue
                }
                if(board[newY][newX] != COLOR){
                    return true
                }
            }
        }
        return false
    }
}

// danh sach cac hinh
const PIECES = [
    [Z, "#32ff7e"],
    [S, "#7efff5"],
    [T, "#18dcff"],
    [O, "#4b4b4b"],
    [L, "#fff200"],
    [I, "#ff9f1a"],
    [J, "#ff4d4d"]
]

function randomPiece() {
    let random = Math.floor(Math.random() * PIECES.length)

    
    return new Piece(PIECES[random][0], PIECES[random][1])
}

let p = randomPiece()
console.log(p)


function moving(e,l1,l2,r1,r2,t1,t2,d1,d2){
    // 37 : left , 39 : right , 65 : a , 68 :d 
    //  38 : up , 40 down , 87 : w , 83 : s
    if(e.keyCode == l1 || e.keyCode == l2){
        // e.keyCode == 37 || e.keyCode == 65
        p.moveLeft()
    
    }else if (e.keyCode == r1 || e.keyCode == r2){
        // e.keyCode == 39 || e.keyCode == 68
        p.moveRight()
       
    }else if ( e.keyCode == t1 || e.keyCode == t2){
        // e.keyCode == 38 || e.keyCode == 87
        p.moveTop()

    }else if (e.keyCode == d1 || e.keyCode ==d2){
        // e.keyCode == 40 || e.keyCode ==83
        p.moveDown()
    }
}
function movingLv5(e,l1,r1,t1,d1){
    // 37 : left , 39 : right , 65 : a , 68 :d 
    //  38 : up , 40 down , 87 : w , 83 : s
    if(e.keyCode == l1 ){
        // e.keyCode == 37 || e.keyCode == 65
        p.moveLeft()
    
    }else if (e.keyCode == r1){
        // e.keyCode == 39 || e.keyCode == 68
        p.moveRight()
       
    }else if ( e.keyCode == t1){
        // e.keyCode == 38 || e.keyCode == 87
        p.moveTop()

    }else if (e.keyCode == d1){
        // e.keyCode == 40 || e.keyCode ==83
        p.moveDown()
    }
}
document.onkeydown = function(e){
    moving(e,37,65,39,68,38,87,40,83)
    reStart(e)
    pauseGame(e)
}

var lv1 =document.querySelector('.lv1')
lv1.onclick = function(e){
    changeLevel.classList.remove('remote')
    canvas.style.transform = 'rotate(0deg)'
    canvas.classList.remove('hide')
    document.onkeydown = function(e){
      
        moving(e,37,65,39,68,38,87,40,83)
        reStart(e)
        pauseGame(e)
      
    }
    
   
}



var lv2 =document.querySelector('.lv2')
lv2.onclick = function(e){
    changeLevel.classList.remove('remote')
    canvas.style.transform = 'rotate(0deg)'
    canvas.classList.remove('hide')
    document.onkeydown = function(e){
       
        moving(e,39,68,37,65,40,83,38,87)
        reStart(e)
        pauseGame(e)
       
    }
    
  
}
var lv3 =document.querySelector('.lv3')
lv3.onclick = function(e){
    changeLevel.classList.remove('remote')
    canvas.style.transform = 'rotate(180deg)'
    canvas.classList.remove('hide')
    document.onkeydown = function(e){
        moving(e,37,65,39,68,38,87,40,83)
        reStart(e)
        pauseGame(e)
       
    }
    
  
}

var lv4 =document.querySelector('.lv4')
lv4.onclick = function(e){
    changeLevel =document.querySelector('.change-level')

    changeLevel.classList.add('remote')
    canvas.style.transform = 'rotate3d(29, -64, 9, 45deg)'

    canvas.classList.remove('hide')
    var top = document.querySelector('.top-btn')
    var left = document.querySelector('.left-btn')
    var right = document.querySelector('.right-btn')
    var bot = document.querySelector('.bot-btn')

    top.onclick=function(){
        p.moveTop()
    }
    left.onclick=function(){
        p.moveLeft()
    }
    right.onclick=function(){
        p.moveRight()
    }
    bot.onclick=function(){
        p.moveDown()
    }


    document.onkeydown = function(e){
      
        reStart(e)
        pauseGame(e)
       
    }
    
  
}
var lv5 =document.querySelector('.lv5')
lv5.onclick = function(e){
    changeLevel.classList.remove('remote')
    canvas.style.transform = 'rotate(0deg)'

    canvas.classList.add('hide')
    document.onkeydown = function(e){
        movingLv5(e,65,39,38,83)
        reStart(e)
        pauseGame(e)
       
    }
    
  
}

function reStart(e){
    if(e.keyCode == 27){
        
        window.location.reload(true)
        
    }
}

restart.onclick = function(e){
    console.log('click restart')
    window.location.reload(true)
}

let gameOver =false

let interval

function drop(time){
    interval=setInterval(function(){
        if(!gameOver){
            p.moveDown()
        }else{
            clearInterval(interval)
        }
    },time)

    audio.play()
}


function pauseGame(e){
    if(e.keyCode == 32){
     
       var pausegame =document.querySelector('.pausegame')

       pausegame.classList.toggle('active')

       if(pausegame.classList.contains('active')){
         clearInterval(interval)
         audio.pause()
       }else{
           audio.play()
           drop(1000)
       }
       

        // alert('Pause')

     
     }
}


var playGame =document.querySelector('.play')

playGame.onclick =function(){
    playGame.classList.remove('active')
    drop(1000)
}
