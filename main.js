let draw = document.getElementById('draw').getContext('2d')

// let f1 = new Carro(400,500,50,80,'red')
let f1 = new Carro(400,450,45,100,'./assets/carro_01.png')
let enemy = new Enemy(340,-40,45,100,'./assets/carro_02.png')
let enemy2 = new Enemy(90,-200,45,100,'./assets/carro_03.png')
let roadL = new Estrada(2,2,10,698,'#f5f5f5')
let roadR = new Estrada(488,2,10,698,'f5f5f5')
let roadC1 = new Estrada(246,10,10,80,'f5f5f5')
let roadC2 = new Estrada(246,200,10,80,'f5f5f5')
let roadC3 = new Estrada(246,400,10,80,'f5f5f5')
let roadC4 = new Estrada(246,600,10,80,'f5f5f5')

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()

let f1Idle = new Audio('./assets/songs/f1Idle.wav')
let carCrash = new Audio('./assets/songs/carCrash.mp3')
let backgroundSound = new Audio('./assets/songs/backgroundSound.wav')
let gameOver = new Audio('./assets/songs/gameOver.wav')

f1Idle.volume = 0.7
f1Idle.loop = true
carCrash.volume = 0.4
carCrash.loop = false 
backgroundSound.volume = 0.9
backgroundSound.loop = true
gameOver.volume = 0.8

let play = true

document.addEventListener('keydown',(e)=>{
    if(e.key === 'a'){
        f1.dir -= 5
    }else if (e.key === 'd'){
        f1.dir += 5
    }   
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'a'){
        f1.dir = 0
    }else if(e.key === 'd'){
        f1.dir = 0
    }
})

function game_over(){
    if(f1.life <= 0){
        play = false
        f1Idle.pause()
        carCrash.pause()
        backgroundSound.pause()
        gameOver.play()
    }
}

function pontos(){
    if(f1.point(enemy)){
        f1.pts += 1
    }else if(f1.point(enemy2)){
        f1.pts += 1
    }
}

function colisao(){
    if(f1.colid(enemy)){
        f1.life -= 1
        enemy.redo()
        carCrash.play()
    }else if(f1.colid(enemy2)){
        f1.life -= 1
        enemy2.redo()
        carCrash.play()
    }
}

function desenha(){
    t1.draw_text('Points: ', 360, 29, 'aliceblue', '26px Times')
    t3.draw_text(f1.pts, 440, 29, 'aliceblue', '26px Times')
    t2.draw_text('Lifes: ', 40, 29, 'aliceblue', '26px Times')
    t4.draw_text(f1.life, 110, 29, 'aliceblue', '26px Times')
    
    if(play){
        roadL.draw_road()
        roadR.draw_road()
        roadC1.draw_road()
        roadC2.draw_road()
        roadC3.draw_road()
        roadC4.draw_road()
        enemy.draw_img()
        enemy2.draw_img()
        f1.draw_img()
    }else{
        roadL.draw_road()
        roadR.draw_road()
        roadC1.draw_road()
        roadC2.draw_road()
        roadC3.draw_road()
        roadC4.draw_road()  
        t5.draw_text('Game Over', 160, 300, 'aliceblue', '40px Times')
    }

}

function atualiza(){
    if(play){
        f1Idle.play()
        backgroundSound.play()
        roadC1.mov_road()
        roadC2.mov_road()
        roadC3.mov_road()
        roadC4.mov_road()
        enemy.atual_enemy()
        enemy2.atual_enemy()
        f1.atual_carro()
        f1.anim('carro_01_')
        pontos()
        colisao()
        game_over()
    }
   
}

function main(){
    draw.clearRect(0,0,500,607)
    desenha()
    atualiza()
}

setInterval(main,10)