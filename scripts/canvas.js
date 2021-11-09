window.onload = function() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas1");

    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("webgl non supporté");
        return;
    }

    const vertexShader = 

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

     const positions = [
        1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}