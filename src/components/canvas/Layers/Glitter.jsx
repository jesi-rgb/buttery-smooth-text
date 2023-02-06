import { Abstract } from 'lamina/vanilla'

// Extend the Abstract layer
export class Glitter extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_color = 'blue' // Can be accessed as CustomLayer.color
  static u_alpha = 1 // Can be accessed as CustomLayer.alpha

  // Define your fragment shader just like you already do!
  // Only difference is, you must return the final color of this layer
  static fragmentShader = `
  #ifdef GL_ES
precision mediump float;
#endif
  #define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time = 10.0;

  vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3((angle/TWO_PI)+0.5 * u_time / 10.0,radius,1.0));
    return color;
}
  
  `

  constructor(props) {
    // You MUST call `super` with the current constructor as the first argument.
    // Second argument is optional and provides non-uniform parameters like blend mode, name and visibility.
    super(Glitter, {
      name: 'Glitter',
      ...props,
    })
  }
}
