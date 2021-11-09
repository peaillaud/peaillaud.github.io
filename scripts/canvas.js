function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);


    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    } else {
        return shader;
    }
}

function createShaderProgram(gl, vSource, fSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
}

window.onload = function() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas1");

    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("webgl non supporté");
        return;
    }

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