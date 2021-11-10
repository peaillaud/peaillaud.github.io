var squareRotation = 0.0;

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
		attribute vec4 aVertexColor;

		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		varying lowp vec4 vColor;

		void main() {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vColor = aVertexColor;
		}`;
	

	const fsSource = `
		varying lowp vec4 vColor;

		void main() {
		  gl_FragColor = vColor;
		}`;

	const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPositions: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		},
	};

    const vertexBuffer = gl.createBuffer();
    const positions = [
		// Front face
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,
		1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		1.0, -1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0,  1.0,  1.0,
		1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0,
	];

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	const colorBuffer = gl.createBuffer();

	const faceColors = [
		[1.0,  1.0,  1.0,  1.0],
		[1.0,  0.0,  0.0,  1.0],
		[0.0,  1.0,  0.0,  1.0],
		[0.0,  0.0,  1.0,  1.0],
		[1.0,  1.0,  0.0,  1.0],
		[1.0,  0.0,  1.0,  1.0],
	];

	var colors = [];
	for (var i = 0; i < faceColors.length; ++i) {
		const c = faceColors[i];
		colors = colors.concat(c, c, c, c);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	const indexBuffer = gl.createBuffer();
	const indices = [
		0,  1,  2,      0,  2,  3,    // front
		4,  5,  6,      4,  6,  7,    // back
		8,  9,  10,     8,  10, 11,   // top
		12, 13, 14,     12, 14, 15,   // bottom
		16, 17, 18,     16, 18, 19,   // right
		20, 21, 22,     20, 22, 23,   // left
	];

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	var then = 0;
	function render(now) {
		now *= 0.1;
		const deltaTime = now - then;
		then = now;

		drawScene(gl, programInfo, vertexBuffer, colorBuffer, indexBuffer, deltaTime);
		requestAnimationFrame(render);
	}
	this.requestAnimationFrame(render);
})

function drawScene(gl, programInfo, vertexBuffer, colorBuffer, indexBuffer, deltaTime) {
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

	mat4.rotate(modelViewMatrix, modelViewMatrix, degreeToRad(squareRotation), [1, 1, 1]);

	{
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.vertexAttribPointer(programInfo.attribLocations.vertexPositions, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPositions);
	}

	{
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

	gl.useProgram(programInfo.program);

	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

	squareRotation += deltaTime;
	console.log(squareRotation);
}

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
