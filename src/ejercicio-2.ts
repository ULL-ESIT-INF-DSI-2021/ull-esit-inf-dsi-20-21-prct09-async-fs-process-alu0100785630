import { access, constants } from 'fs';
import { spawn } from 'child_process';
import * as yargs from 'yargs';

export function countPipe(file: string, chars: boolean, words: boolean, lines: boolean): void {
  
  access(file, constants.F_OK, (err) => {    
    if (err) process.exit(-1);
    
    else {
      const wc = spawn('wc', [file]);

      let output = '';
      wc.stdout.on('data', (chunk) => (output += chunk));

      wc.on('close', () => {
        const parts = output.split(/\s+/);
        if (chars)
          spawn('echo', [`Lines: ${parseInt(parts[1])+1}`]).stdout.pipe(process.stdout);

        if (words)
          spawn('echo', [`Words: ${parts[2]}`]).stdout.pipe(process.stdout);
  
        if (lines) 
          spawn('echo', [`Chars: ${parts[3]}`]).stdout.pipe(process.stdout);
      });
    }
  });
}

export function countNoPipe(file: string, chars: boolean, words: boolean, lines: boolean): void {
  
  access(file, constants.F_OK, (err) => {
    if (err) process.exit(-1);
    
    else {
      const wc = spawn('wc', [file]);
      let output = '';

      wc.stdout.on('data', (chunk) => (output += chunk));

      wc.on('close', () => {
        const results = output.split(/\s+/);
        let out = '';
        
        if (chars) out+= `Lines: ${parseInt(results[1])+1}\n`;
        if (words) out+= `Words: ${results[2]}\n`;
        if (lines) out+= `Chars: ${results[3]}`;

        console.log(out);
      });
    }
  });
}

yargs.command({
  command: 'fileInfo',
  describe: 'Información de un fichero',
  builder: {
    file: {
      describe: 'Nombre del fichero',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Método pipe (flag)',
      demandOption: true,
      type: 'boolean',
    },
    chars: {
      describe: 'Cuenta los caracteres',
      demandOption: true,
      type: 'boolean',
    },
    words: {
      describe: 'Cuenta las palabras',
      demandOption: true,
      type: 'boolean',
    },
    lines: {
      describe: 'Cuenta las líneas',
      demandOption: true,
      type: 'boolean',
    },
  },

  handler(argv) {
    if (typeof argv.file === 'string' 
    && typeof argv.pipe === 'boolean'
    && typeof argv.chars === 'boolean' 
    && typeof argv.words === 'boolean'
    && typeof argv.lines === 'boolean') {
      
      if (argv.pipe) countPipe(argv.file, argv.chars, argv.words, argv.lines);
      else countNoPipe(argv.file, argv.chars, argv.words, argv.lines);
    }
  },
});

//node dist/ejercicio-2.js fileInfo --file=helloWorld.txt --pipe=true --chars=true --words=true --lines=true
yargs.parse();