document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiParticles = [];

    class Confetti {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 5 + 2;
            this.velocityX = (Math.random() - 0.5) * 10;
            this.velocityY = Math.random() * -10 - 5;
            this.gravity = 0.2;
            this.opacity = 1;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            this.opacity -= 0.01;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00", "#00ffff"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            confettiParticles.push(new Confetti(x, y, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            confettiParticles[i].update();
            confettiParticles[i].draw();

            if (confettiParticles[i].opacity <= 0) {
                confettiParticles.splice(i, 1);
            }
        }
    }

    createConfetti();
    animate();
});
