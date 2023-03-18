const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');      // returns the drawing context on the canvas
console.log(c);
// Set Canvas size
canvas.width = window.innerWidth
canvas.height = window.innerHeight  

class Boundary {
    static width = 40
    static height = 40
    constructor({position, image}) {
        this.position = position
        this.width = 40
        this.height = 40 
        this.image = image
    }

    draw(){
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

// Cleate pacman
class Player{
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius, 0, Math.PI*2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const boundaries = []
const player = new Player({
    position: {
        x: Boundary.width+ Boundary.width/2, 
        y: Boundary.height+Boundary.height/2},
    velocity: {x: 0, y: 0}
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}
let lastkey = ''
const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src){
    const image = new Image()   // default js object
    image.src = src
    return image    
}

map.forEach((row,i) =>{
    row.forEach((symbol,j) =>{
        switch (symbol) {
            case '-': 
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j, 
                            y: Boundary.height*i
                        },
                        image: createImage('./img/pipeHorizontal.png')
                    })
                )
                break
            case '|': 
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width*j, 
                        y: Boundary.height*i
                    },
                    image: createImage('./img/pipeVertical.png')
                })
            )
            break
            case '1': 
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j, 
                            y: Boundary.height*i
                        },
                        image: createImage('./img/pipeCorner1.png')
                    })
                )
                break
            case '2': 
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width*j, 
                        y: Boundary.height*i
                    },
                    image: createImage('./img/pipeCorner2.png')
                })
            )
            break
            case '3': 
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j, 
                            y: Boundary.height*i
                        },
                        image: createImage('./img/pipeCorner3.png')
                    })
                )
                break
            case '4': 
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width*j, 
                        y: Boundary.height*i
                    },
                    image: createImage('./img/pipeCorner4.png')
                })
            )
            break
            case 'b': 
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j, 
                            y: Boundary.height*i
                        },
                        image: createImage('./img/block.png')
                    })
                )
                break
                case '[':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capLeft.png')
                  })
                )
            break
            case ']':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capRight.png')
                  })
                )
                break
            case '_':
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: createImage('./img/capBottom.png')
              })
            )
            break
            case '^':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capTop.png')
                  })
                )
                break
            case '+':
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: createImage('./img/pipeCross.png')
              })
            )
            break
            case '5':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorTop.png')
                  })
                )
            break
            case '6':
                boundaries.push(
                    new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorRight.png')
              })
            )
            break
            case '7':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorBottom.png')
                  })
                )
                break
            case '8':
            boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: createImage('./img/pipeConnectorLeft.png')
              })
            )
            break
        }
    })
})

function circleCollidesWithRectangle({circle,rectangle})
{
    const padding = Boundary.width/2 - circle.radius -1
    return (circle.position.y - circle.radius + circle.velocity.y <= 
        rectangle.position.y + rectangle.height + padding  && 
        circle.position.x + circle.radius + circle.velocity.x >= 
        rectangle.position.x - padding && 
        circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y - padding && 
        circle.position.x - circle.radius + circle.velocity.x <= 
        rectangle.position.x + rectangle.width + padding
        )
}
// we are creating an animation loop here that call the code for each frame
// of the animation and keep calling itself
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    if(keys.w.pressed && lastkey === 'w'){
    for(let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
        if(circleCollidesWithRectangle({
            circle: {
                ...player, 
                velocity: {
                x: 0, 
                y: -5
            }},
            rectangle: boundary
        })){
            player.velocity.y = 0
            break
        } else {
            player.velocity.y = -5
        }
    }
    }else if(keys.a.pressed && lastkey === 'a'){
        for(let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
        if(circleCollidesWithRectangle({
            circle: {
                ...player, 
                velocity: {
                x: -5, 
                y: 0
            }},
            rectangle: boundary
        })){
            player.velocity.x = 0
            break
        } else {
            player.velocity.x = -5
        }
    }
    }else if(keys.s.pressed && lastkey === 's'){
        for(let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
        if(circleCollidesWithRectangle({
            circle: {
                ...player, 
                velocity: {
                x: 0, 
                y: 5
            }},
            rectangle: boundary
        })){
            player.velocity.y = 0
            break
        } else {
            player.velocity.y = 5
        }
    }
    }else if(keys.d.pressed && lastkey === 'd'){
        for(let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i]
        if(circleCollidesWithRectangle({
            circle: {
                ...player, 
                velocity: {
                x: 5, 
                y: 0
            }},
            rectangle: boundary
        })){
            player.velocity.x = 0
            break
        } else {
            player.velocity.x = 5
        }
    }
    }
    boundaries.forEach((boundary) =>{
        boundary.draw()

        if(circleCollidesWithRectangle({
            circle: player,
            rectangle: boundary
        })
        ){
            console.log('We are colliding')
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    player.update()
    // player.velocity.y =0
    // player.velocity.x =0
}

animate()

window.addEventListener('keydown', ({key})=>{
    console.log(key)
    switch(key){
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
    console.log(player.velocity)
})

window.addEventListener('keyup', ({key})=>{
    console.log(key)
    switch(key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    console.log(player.velocity)
})