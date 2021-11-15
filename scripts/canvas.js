var squareRotation = 0.0;
var cameraTranslation = 0.0;

window.addEventListener('load', function() {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector("#canvas1");

	/** @type {WebGLRenderingContext} */
	const gl = canvas.getContext("webgl");

	// si webgl n'est pas supporte
	if (!gl) {
		alert("webgl non supporté");
		return;
	}

	// vertex shader
	const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec2 aTextureCoord;

		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		varying highp vec2 vTextureCoord;

		void main() {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			gl_Position /= gl_Position.w;
			
			vTextureCoord = aTextureCoord;
		}`;


	// fragment shader
	const fsSource = `
		varying highp vec2 vTextureCoord;

		uniform sampler2D uSampler;

		void main() {
		  gl_FragColor = texture2D(uSampler, vTextureCoord);
		}`;

	// shader program
	const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			// vertex attribute
			vertexPositions: gl.getAttribLocation(shaderProgram, 'aVertexPosition'), 
			//
			// texture attribute
			textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'), 
		},
		uniformLocations: {
			// matrice de mvp
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),

			// le sampler de la texture
			uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
		},
	};

	// le vertex buffer avec les donnes selon les coordonnees NDC de opengl
	const vertexBuffer = gl.createBuffer();
	const positions = [
		// face frontale
		-1.0, -1.0, 1.0,
		1.0, -1.0, 1.0,
		1.0, 1.0, 1.0,
		-1.0, 1.0, 1.0,

		// face arriere 
		-1.0, -1.0, -1.0,
		-1.0, 1.0, -1.0,
		1.0, 1.0, -1.0,
		1.0, -1.0, -1.0,

		// face haut
		-1.0, 1.0, -1.0,
		-1.0, 1.0, 1.0,
		1.0, 1.0, 1.0,
		1.0, 1.0, -1.0,

		// face bas
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0, 1.0,
		-1.0, -1.0, 1.0,

		// face droite
		1.0, -1.0, -1.0,
		1.0, 1.0, -1.0,
		1.0, 1.0, 1.0,
		1.0, -1.0, 1.0,

		// face gauche
		-1.0, -1.0, -1.0,
		-1.0, -1.0, 1.0,
		-1.0, 1.0, 1.0,
		-1.0, 1.0, -1.0,
	];

	// on copie les vertices dans le vertex buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	// creation du index buffer permettant de reutiliser les valeurs du vertex buffer
	const indexBuffer = gl.createBuffer();
	const indices = [
		0, 1, 2, 0, 2, 3,		  // avant
		4, 5, 6, 4, 6, 7,		  // arriere
		8, 9, 10, 8, 10, 11,	  // haut
		12, 13, 14, 12, 14, 15,   // bas
		16, 17, 18, 16, 18, 19,   // droite
		20, 21, 22, 20, 22, 23,   // gauche
	];

	// on copies les indices dans le index buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	// chargement de la texture (necessite d'avoir un serveur local)
	const texture = loadTexture(gl, "../images/credit.jpg");

	// creation du buffer contenant les coordonnees de la texture en fonction de celles du vertex buffer
	const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

	const textureCoordinates = [
		// avant
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// arriere
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// haut
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// bas
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// droite
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		// Left
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

	var then = 0;
	function render(now) {
		now *= 0.1;
		const deltaTime = now - then; // calcul du temps ecoule depuis la derniere frame
		then = now;

		drawScene(gl, programInfo, vertexBuffer, indexBuffer, texture, textureCoordBuffer, deltaTime);
		requestAnimationFrame(render);
	}
	this.requestAnimationFrame(render);
})

function drawScene(/** @type {WebGLRenderingContext} */ gl, programInfo, vertexBuffer, indexBuffer, texture, textureCoordBuffer, deltaTime) {
	// on efface le color et depth buffer
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// parametres de la matrice de projection
	const fov = 45 * Math.PI / 180;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;

	// creation de la matrice de projection
	const projectionMatrix = mat4.create();
	mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

	// creation de la matrice responsable des transformations locales
	const modelViewMatrix = mat4.create();

	// effet de transition
	mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -cameraTranslation / 10]);

	// rotation
	mat4.rotate(modelViewMatrix, modelViewMatrix, degreeToRad(180.0), [0, 0, 1]);
	mat4.rotate(modelViewMatrix, modelViewMatrix, degreeToRad(squareRotation / 2), [1, 1, 1]);
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.vertexAttribPointer(programInfo.attribLocations.vertexPositions, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPositions);
	}

	{
		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
		gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
	}

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

	gl.useProgram(programInfo.program);

	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

	if (squareRotation <= 70) {
		cameraTranslation += deltaTime;
	}
	squareRotation += deltaTime;

}

function loadTexture(/** @type {WebGLRenderingContext} */ gl, url) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	const level = 0;
	const internalFormat = gl.RGBA;
	const width = 1;
	const height = 1;
	const border = 0;
	const srcFormat = gl.RGBA;
	const srcType = gl.UNSIGNED_BYTE;
	const pixel = new Uint8Array([255, 255, 255, 255]);

	gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, border, srcFormat, srcType, pixel);

	const image = new Image();
	image.onload = function() {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

		if (image.width & (image.width - 1) == 0 && image.height & (image.height - 1) == 0) {
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	image.src = url;

	return texture;
}

function loadShader(/** @type {WebGLRenderingContext} */ gl, type, source) {
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

function createShaderProgram(/** @type {WebGLRenderingContext} */ gl, vSource, fSource) {
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
