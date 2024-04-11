import convert from 'fbx2gltf';
import prompt from 'prompt';
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(1)
let inputPathA = null
if(args?.[0]){
  inputPathA = args[0]
}
prompt.start();
const schema = {
  properties: {
    inputPath: {
      message: '/path/to/input.fbx',
      required: true
    },
    ouputPath: {
      message: '/path/to/output.glb'
    }
  }
};
prompt.get(schema, function (err, result) {
  //
  // Log the results.
  //
  console.log('Command-line input received:');
  console.log('inputPath:',result.inputPath);
  console.log('outputPath:',result.outputPath);
  const inputPath = path.resolve(process.cwd(), result.inputPath || inputPathA)
  const inputExists = fs.existsSync(inputPath)
const outputPath = result.outputPath
  const outputPathFinal = path.resolve(process.cwd(), outputPath || `./${Date.now()}-output.glb`)
  if(inputExists){
    convert(inputPath, outputPathFinal, []).then(
      destPath => {
        // yay, do what we will with our shiny new GLB file!
        console.log('output .glb successfully to', destPath)
      },
      error => {
        // ack, conversion failed: inspect 'error' for details
        console.error('Convert Error:', error)
      }
    );
  } else {
    console.log('no input file found at', inputPath)
  }
});
