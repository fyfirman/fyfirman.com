// Grainy gradient: a weighted blend of soft colour blobs with animated film grain, drawn in a WebGL shader.

// [x, y, radius, colour], x/y/radius in units of the canvas width (y from the top).
export type Blob = [number, number, number, string];

export const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const vertexShader = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const fragmentShader = (max: number) => `
  precision highp float;
  uniform vec2 res;
  uniform float time;
  uniform float drift;
  uniform float grain;
  uniform int count;
  uniform vec4 blob[${max}];
  uniform vec3 col[${max}];
  float hash(vec2 p){ p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
  void main(){
    vec2 uv = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y) / res.x;
    float lw[${max}]; float m = -1e9;
    for (int i = 0; i < ${max}; i++) {
      if (i >= count) break;
      float k = float(i);
      vec2 wander = vec2(sin(time * (0.11 + 0.017 * k) + k * 1.7), cos(time * (0.09 + 0.013 * k) + k * 2.3)) * drift;
      vec2 d = uv - blob[i].xy - wander;
      lw[i] = -dot(d, d) / (2.0 * blob[i].z * blob[i].z);
      m = max(m, lw[i]);
    }
    vec3 c = vec3(0.0); float ws = 0.0;
    for (int i = 0; i < ${max}; i++) {
      if (i >= count) break;
      float w = exp(lw[i] - m); c += w * col[i]; ws += w;
    }
    c /= ws;
    vec2 frame = vec2(17.31, 41.77) * floor(time * 24.0);
    c += (hash(gl_FragCoord.xy + mod(frame, 997.0)) - 0.5) * grain;
    gl_FragColor = vec4(c, 1.0);
  }`;

export function createGrainyGradient(canvas: HTMLCanvasElement, maxBlobs: number, options?: WebGLContextAttributes) {
  const gl = canvas.getContext("webgl", options);
  if (!gl) return null;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.shaderSource(vs, vertexShader);
  gl.compileShader(vs);
  gl.shaderSource(fs, fragmentShader(maxBlobs));
  gl.compileShader(fs);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const [res, time, drift, grain, count, blob, col] = ["res", "time", "drift", "grain", "count", "blob", "col"].map(u);

  return {
    setBlobs(blobs: Blob[]) {
      const list = blobs.slice(0, maxBlobs);
      gl.uniform1i(count, list.length);
      gl.uniform4fv(
        blob,
        list.flatMap(([x, y, r]) => [x, y, r, 0]),
      );
      gl.uniform3fv(
        col,
        list.flatMap((b) => hexToRgb(b[3])),
      );
    },
    draw(t: number, driftAmount: number, grainAmount: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(res, canvas.width, canvas.height);
      gl.uniform1f(time, t);
      gl.uniform1f(drift, driftAmount);
      gl.uniform1f(grain, grainAmount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
