import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}


/*
TRAZA DE EJECUCIÓN

1) Inicio => Pila de llamadas vacía, registro de eventos, vacío, cola de manejadores vacía.
2) main va a la pila de llamadas.
3) Comprueba si existe un fichero mediante F_OK introduciendo el método access a la pila.
4) Access no pertenece a JavaScript ni V8, por ello se pasa al registro de eventos.
5) Se introduce el handler de access en la cola de manejadores (sale del registro de eventos)
6) Ahora el handler de access es el primero en la cola, por tanto se inserta en la pila de llamadas.
7) Se inicia la ejecución del primer log en la pila de llamadas
8) Se ejecuta la acción (console.log)
9) Entra watch en la pila de llamadas
10) De nuevo, watch no pertenece a JavaScript ni V8, por ello se pasa al registro de eventos.
11) Sale watch del registro de eventos
12) Entra watcher.on en la pila de llamadas
13) Una vez más, watcher.on no pertenece a JavaScript ni V8, por ello se pasa al registro de eventos.
14) watcher.on se sigue ejecutando en el registro de eventos mientras se siguen introduciendo logs (llamadas a console.log) en la pila.
15) Se ejecuta la acción (console.log)
16) El handler de access sale de la pila y ahora la pila estará vacía.
17) Los elementos de la cola de manejadores pasan a la pila y se ejecutan (console.log)
18) Al volver a editar el fichero, se repite el proceso.

- Al parar la ejecución del programa salimos sacamos watcher.on del registro de eventos.
*/