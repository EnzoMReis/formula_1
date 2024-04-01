class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w 
        this.h = h 
        this.a = a 
    }

    draw_obj(){
        draw.fillStyle = this.a
        draw.fillRect(this.x,this.y,this.w,this.h)
    }

    draw_img(){
        let img = new Image()
        img.src = this.a
        draw.drawImage(img,this.x, this.y, this.w, this.h)
    }

}

class Carro extends Obj{
    dir = 0
    pts = 0
    life = 3
    frame = 1
    time = 0

    anim(nome){
        this.time += 1
        if(this.time > 12){
            this.time = 0
            this.frame += 1
        }
        if(this.frame > 4){
            this.frame = 1
        }
        this.a = "assets/" + nome + this.frame + ".jpg"
    }

    draw_carro(){

        // roda dianteira direita
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#232323'
        draw.fillStyle = '#000000'
        draw.rect(this.x+40, this.y-60, 10, 10)
        draw.closePath()
        draw.stroke()
        draw.fill()
        
        // roda dianteira esquerda
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#232323'
        draw.fillStyle = '#000000'
        draw.rect(this.x, this.y-60, 10, 10)
        draw.closePath()
        draw.stroke()
        draw.fill()
        
        // roda traseira direira
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#232323'
        draw.fillStyle = '#000000'
        draw.rect(this.x+40, this.y-20, 10, 10)
        draw.closePath()
        draw.stroke()
        draw.fill()
       
        // roda traseira esquerda
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#232323'
        draw.fillStyle = '#000000'
        draw.rect(this.x, this.y-20, 10, 10)
        draw.closePath()
        draw.stroke()
        draw.fill()

        // trapézio do carro
        draw.beginPath()
        draw.moveTo(this.x,this.y) // coordenadas x e y
        draw.lineTo(this.x+50,this.y)
        draw.lineTo(this.x+40,this.y-50)
        draw.lineTo(this.x+10,this.y-50)
        draw.closePath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#dd2828'
        draw.fillStyle = this.a
        draw.stroke()
        draw.fill()

        // desenhando corpo frente em um retângulo
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#dd2828'
        draw.fillStyle = this.a
        draw.rect(this.x+10,this.y-70,30,20)
        draw.closePath()
        draw.stroke()
        draw.fill()

        // desenhando a asa frontal em um retângulo
        draw.beginPath()
        draw.lineWidth = '5'
        draw.strokeStyle = '#dd2828'
        draw.fillStyle = this.a
        draw.rect(this.x,this.y-80,50,10)
        draw.closePath()
        draw.stroke()
        draw.fill()
    }

    atual_carro(){
        this.x += this.dir
        if(this.x <= 12){
            this.x = 12
        }else if(this.x >= 438){
            this.x = 438
        }
    }

    point(objeto){
       if((objeto.y >= 607)&&(objeto.y < 609)){
            return true
       }else{
            false
       }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
        (this.x + this.w > objeto.x)&&
        (this.y < objeto.y + objeto.h)&&
        (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
}

class Enemy extends Carro{
    atual_enemy(){
        this.y += 4
        if(this.y >= 680){
            this.redo()
        }
    }
    
    redo(){
        this.y = Math.floor(Math.random() * ((-500 - (-100) + 1) + (-100)))
        this.x = Math.floor(Math.random() * ((408 - 12 + 1) + 12))
    }
}

class Estrada extends Obj{
    draw_road(){
        draw.fillStyle = this.a
        draw.fillRect(this.x,this.y,this.w,this.h)
    }

    mov_road(){
        this.y += 4
        if(this.y >= 690){
            this.y = -100
        }
    }
}

class Text{
    draw_text(text,x,y,cor,font){
        draw.fillStyle = cor
        draw.lineWidth = '5'
        draw.font = font
        draw.fillText(text,x,y)
    }
}