window.addEventListener('load', function () {
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas1");

    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("webgl non supporté");
        return;
    }

	const vsSource = `
	  attribute vec4 aVertexPosition;

	  uniform mat4 uModelViewMatrix;
	  uniform mat4 uProjectionMatrix;

	  void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	  }`;
	

	const fsSource = `
		void main() {
		  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
		}`;

	const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPositions: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		},
	};

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    const positions = [
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const fov = 45 * Math.PI / 180;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;

	const projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

	const modelViewMatrix = mat4.create();

	mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

	gl.vertexAttribPointer(programInfo.attribLocations.vertexPositions, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexPositions);

	gl.useProgram(programInfo.program);

	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
})

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
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Impossible d'initialiser le programme shader : " + gl.getProgramInfoLog(shaderProgram));
        return null;
    } else {
        return shaderProgram;
    }
}
