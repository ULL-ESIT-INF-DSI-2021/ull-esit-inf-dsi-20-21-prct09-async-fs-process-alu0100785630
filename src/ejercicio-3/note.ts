export class Note {
  /**
   * Constructor de la clase Note
   * @param titulo => Titulo de la nota
   * @param content => Contenido de la nota
   * @param color => Color de la nota
   */

  constructor (
    public title: string, 
    public content: string, 
    public color: string) {
      this.title = title;
      this.content = content;
      this.color = color;
  }

  /**
   * Función para obtener el título de la nota
   * @returns Título de la nota
   */
  getTitle() {
    return this.title;
  }

  /**
   * Funcion para establecer el titulo de la nota
   * @param title Titulo a establecer
   */
  setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Funcion para obtener el color de la nota
   * @returns El color de la nota
   */
   getColor() {
    return this.color;
  }

  /**
   * Función que establece el color a la nota
   * @param color Color establecer
   */
  setColor(color: string): void {
    this.color = color;
  }

  /**
   * Función para obtener el contenido de la nota
   * @returns Contenido de la nota
   */
  getContent() {
    return this.content;
  }

  /**
   * Función para establecer el contenido de la nota
   * @param content Contenido a establecer
   */
  setContent(content: string): void {
    this.content = content;
  }

  /**
   * Cambia el formato de la nota a JSON
   * @returns Todo el conjunto de datos de la nota en formato JSON
   */
  toJSON(): string {
    return '{\n\"title\": \"' + this.title + '\",\n\"content\": \"' + this.content + '\",\n\"color\": \"' + this.color + '\"\n}';
  }
}