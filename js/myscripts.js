var canvas= document.getElementById('canvas');
var cw =  canvas.width = window.innerWidth;
var ch = canvas.height = document.body.clientHeight;
var limit = 30;
var particles = [];
var context = canvas.getContext('2d');

var mouseX = 0;
var mouseY = 0;


function Particle (pos, target, speed, cx, cy) {
    this.speed = 0.08;
    this.dir = 'left';
    this.radius = 40;
    this.cx = cx;
    this.cy = cy;
    this.angle = Math.floor(Math.random() * (Math.PI*2));
    this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
    if (!pos) pos = {};
    if (!target) target = {};
    console.log(this.angle)
    this.pos = {
        x: pos.x || 0,
        y: pos.y || 0
    };
    
  
    this.speed = {
        x: speed.x,
        y: speed.y
    };
    
    this.target = {
        y: target.y || 0
    };
    
    this.lastPos = {
        x: this.x,
        y: this.y
    };
    
    this.draw = function() {
        this.angle += 0.002;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        this.pos.x = this.cx + Math.cos(this.angle)*50;
        this.pos.y = this.cy + Math.sin(this.angle)*50;
        context.fill();
    }
    this.move = function() {
        this.angle += 0.1;
        this.pos.x = cw/2 + Math.cos(this.angle)*100;
        this.pos.y = ch/2 + Math.sin(this.angle)*100;
        
        this.draw();
    }
}

function draw() {
      var a = limit;
    while (a--) {
        var randomX = Math.floor(Math.random() * cw);
        var randomY = Math.floor(Math.random() * ch);
        circle = new Particle(
            {
                x: cw/2,
                y: ch/2
            },
            {},
            {
                x: Math.random(),
                y: Math.random()
            },
            Math.floor(Math.random()*cw),
            Math.floor(Math.random()*ch),
        );
        circle.draw();
        particles.push(circle);
    }
    
}
draw();
function render() {
    requestAnimationFrame(render);
    var a = particles.length;
    // context.fillStyle = 'black'
    context.globalCompositeOperation = "source-over";

    context.fillStyle = 'rgba(255,255,255,0.1)';
    context.fillRect(0,0, cw, ch);
    while (a--) {
        particles[a].draw();
    }
    
}
requestAnimationFrame(render);

canvas.addEventListener('click', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});






