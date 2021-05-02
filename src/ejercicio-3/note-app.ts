import * as chalk from 'chalk';
import * as yargs from 'yargs';
import { commandFunctions } from './commandFunctionts';
import { Note } from './note';

const noteFunctions = new commandFunctions();

let errorMessage = () => {
  console.log(chalk.red('ERROR: Invalid arguments❌'));
}

yargs.command({
  command: 'add',
  describe: 'Añadir una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.user === 'string' && 
        typeof argv.title === 'string' &&
        typeof argv.body === 'string' && 
        typeof argv.color === 'string') 
      noteFunctions.addNote(argv.user, argv.title, argv.body, argv.color);
    
    else
      errorMessage();
  },
});


yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') 
      noteFunctions.deleteNote(argv.user, argv.title);
  
    else
      errorMessage();
  },
});


yargs.command({
  command: 'modify',
  describe: 'Editar una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Contenido de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.user === 'string' && 
        typeof argv.title === 'string' &&
        typeof argv.body === 'string' && 
        typeof argv.color === 'string')
      noteFunctions.editNote(argv.user, argv.title, argv.body, argv.color);

    else
      errorMessage();
  },
});


yargs.command({
  command: 'read',
  describe: 'Leer una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string')
      noteFunctions.readNote(argv.user, argv.title);
    else
      errorMessage();
  },
});


yargs.command({
  command: 'list',
  describe: 'Mostrar todas las notas del usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if (typeof argv.user === 'string') {
      let notes: Note[] = noteFunctions.showNotes(argv.user);

      console.log(chalk.white('\nNotas del usuario: ' + argv.user));

      notes.forEach((n) => {
        console.log('▫ ', n.title);
      });

      console.log('\n');
    } 

    else 
      errorMessage();
    
  },
});

yargs.parse();