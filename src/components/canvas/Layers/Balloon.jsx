import { Abstract } from 'lamina/vanilla'

// Extend the Abstract layer
export class Balloon extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_color = 'blue' // Can be accessed as CustomLayer.color
  static u_alpha = 1 // Can be accessed as CustomLayer.alpha
  static u_inflate = 0

  // Define your fragment shader just like you already do!
  // Only difference is, you must return the final color of this layer
  static fragmentShader = `
      uniform vec3 u_color;
      uniform float u_alpha;

      // Varyings must be prefixed by "v_"
      varying vec3 v_Position;

      vec4 main() {
        // Local variables must be prefixed by "f_"
        vec4 f_color = vec4(u_color, u_alpha);
        return f_color;
      }
    `

  // Optionally Define a vertex shader!
  // Same rules as fragment shaders, except no blend modes.
  // Return a non-projected vec3 position
  //   static vertexShader = `
  //     uniform float u_inflate;

  //     void main() {

  //         vec3 f_pos = position;

  //         f_pos.x *= u_inflate;

  //         return f_pos;
  //     }
  //   `
  static vertexShader = `
      uniform float u_inflate;
      uniform mat3 um3_matrix;
      uniform mat3 um3_pmatrix;
      float f_divisor = 10.0;

      void main() {

          vec3 f_pos = position;
          float f_X = abs(f_pos.x);
          float f_Y = abs(f_pos.y);

          if (f_X == 1.0 && f_Y == 1.0){
              float f_offset = 1.0 - (u_inflate/f_divisor);
              f_pos.x *= f_offset;
              f_pos.y *= f_offset;
          }
          else if (f_X == 0.0 && f_Y == 0.0){
              f_pos.z = u_inflate;
          }
          return um3_pmatrix * um3_matrix * f_pos;
          // return f_pos;
      }
    `

  constructor(props) {
    // You MUST call `super` with the current constructor as the first argument.
    // Second argument is optional and provides non-uniform parameters like blend mode, name and visibility.
    super(Balloon, {
      name: 'Balloon',
      ...props,
    })
  }
}
