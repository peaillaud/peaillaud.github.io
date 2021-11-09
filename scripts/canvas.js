function draw() {
    var canvas = document.getElementById("canvas1");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(10, 100, 50, 50);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    }
}