import * as fs from 'fs';
import * as chalk from 'chalk';
import { Note } from './note';

/**
 * Clase commandFunctions que define las funciones que se ejecutan cuando el usuario introduce un comando.
 */

export class commandFunctions {
  constructor() {}

  /**
   * Constructor de la clase nota
   * @param user Usuario owner de la nota
   * @param title Título de la nota
   * @param content Contenido de la nota
   * @param color Color de la nota
   */

  addNote(
    user: string, 
    title: string, 
    content: string,
    color: string): void {

    if (!fs.existsSync(`notes/${user}`)) {
      fs.mkdirSync(`notes/${user}`, { recursive: true });
      console.log(chalk.blue('Fichero usuario creado✅'));
    }

    const nota = new Note(title, content, color);

    if (!fs.existsSync(`notes/${user}/${title}.json`)) {
      fs.writeFileSync(`notes/${user}/${title}.json`, nota.toJSON());
      console.log(chalk.green('Nota creada✅'));
    } 
    else
      console.log(chalk.red('ERROR: No puede haber 2 notas con el mismo título ❌'));
  }

  /**
   * Función para eliminar una nota
   * @param user Usuario owner
   * @param title Título de la nota
   */

  deleteNote(
    user: string, 
    title: string): void {

    if (fs.existsSync(`notes/${user}/${title}.json`)) {
      fs.rmSync(`notes/${user}/${title}.json`);
      console.log(chalk.blue('Nota eliminada✅'));
    } 
    else
      console.log(chalk.red('ERROR: La nota no existe❌'));
  }

  /**
   * Función para editar una nota
   * @param user Usuario owner
   * @param title Titulo de la nota a editar
   * @param content Nuevo contenido de la nota
   * @param color Nuevo color de la nota
   */

  editNote(
    user: string, 
    title: string, 
    content: string,
    color: string): void {

    if (fs.existsSync(`notes/${user}/${title}.json`)) {
      const nota = new Note(title, content, color);
      fs.writeFileSync(`notes/${user}/${title}.json`, nota.toJSON());
      console.log(chalk.green('Nota editada✅'));
    } 
    else
      console.log(chalk.red('ERROR: La nota no existe❌'));
  }

  /**
   * Función para mostras todas las notas de un usuario
   * @param user Usuario owner
   */

  showNotes( user: string ): Note[] {
    let notes: Note[] = [];
    
    fs.readdirSync(`notes/${user}`).forEach((n) => {

      let data = fs.readFileSync(`notes/${user}/${n}`),
      noteJsonData = JSON.parse(data.toString()),
      note = new Note(noteJsonData.title, noteJsonData.content, noteJsonData.color);

      notes.push(note);
    });

    return notes;
  }

  /**
   * Función para mostrar una nota concreta
   * @param usuario Usuario owner
   * @param titulo Titulo de la nota a leer
   */
  readNote(
    user: string, 
    title: string): void {

    if (fs.existsSync(`notes/${user}/${title}.json`)) {

      let data = fs.readFileSync(`notes/${user}/${title}.json`),
      noteJsonData = JSON.parse(data.toString()),
      note = new Note(noteJsonData.title, noteJsonData.content, noteJsonData.color);

      console.log(chalk.keyword(note.getColor())(note.getTitle()));
      console.log(chalk.keyword(note.getColor())(note.getContent()));
    }
    else
      console.log(chalk.red('ERROR: La nota no existe❌'));
  }
}