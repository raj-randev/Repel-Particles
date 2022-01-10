const canvas = document.getElementById('canvas1');

const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = []

const mouse = {
    x: null,
    y: null,
    radius: 250
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

c.fillStyle = 'white';
c.font = '30px Verdana';
c.fillText('A', 20, 60);
const data = c.getImageData(0, 0, 100, 100)


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30 + 1)
    }
    draw() {
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {

            if(this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx;
            }

            if(this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy;
            }
        }
    }
}

function init() {
    particleArray = [];

    for (let i = 0; i < 1500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x,y))
    }
    
}

init();

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();