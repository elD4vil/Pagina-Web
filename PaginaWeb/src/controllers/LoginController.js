function index(req, res) {
  res.render('login/index');
}

function register(req, res) {
  res.render('login/register');
}

function inicio(req, res){
  res.render('login/casa')
}

function subirM(req, res){
  res.render('login/subirM')
}

function subirA(req, res){
  res.render('login/subirA')
}

function verManuales(req, res){
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM aarchivos', (err, archivos) => {
      if(err) {
        res.json(err);
      }
        res.render('login/verManuales', {archivos});
    });
  });
};

function verAplicaciones(req, res){
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM apliaciones', (err, archivos) => {
      if(err) {
        res.json(err);
      }
        res.render('login/verAplicaciones', {archivos});
    });
  });
};

function destroy(req, res) {
  const id = req.body.id;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM aarchivos WHERE ID = ?', [id], (err, rows) => {
      res.redirect('/verManuales');
    });
  })
}

function destroy1(req, res) {
  const id = req.body.id;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM apliaciones WHERE ID = ?', [id], (err, rows) => {
      res.redirect('/verAplicaciones');
    });
  })
}

function descargarA(req, res){
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM apliaciones', (err, archivos) => {
      if(err) {
        res.json(err);
      }
      res.render('login/descargarA', {archivos});
    });
  });

};

function descargarM(req, res){
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM aarchivos', (err, archivos) => {
      if(err) {
        res.json(err);
      }
      res.render('login/descargarM', {archivos});
    });
  });

};


function descargarArchivo(req, res) {
  const archivoId = req.params.id;

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error en la conexión a la base de datos:', err);
      return res.status(500).send('Error interno del servidor.');
    }

    conn.query('SELECT * FROM aarchivos WHERE ID = ?', [archivoId], (error, results, fields) => {
      if (error || results.length === 0) {
        console.error('Error al obtener el archivo:', error);
        return res.status(404).send('Archivo no encontrado.');
      }

      const archivo = results[0];
      res.setHeader('Content-disposition', `attachment; filename=${archivo.nombre}`);
      res.setHeader('Content-type', archivo.tipo_de_contenido);
      res.send(archivo.contenido);
    });
  });
}

function descargarArchivo1(req, res) {
  const archivoId = req.params.id;

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error en la conexión a la base de datos:', err);
      return res.status(500).send('Error interno del servidor.');
    }

    conn.query('SELECT * FROM apliaciones WHERE ID = ?', [archivoId], (error, results, fields) => {
      if (error || results.length === 0) {
        console.error('Error al obtener el archivo:', error);
        return res.status(404).send('Archivo no encontrado.');
      }

      const archivo = results[0];
      res.setHeader('Content-disposition', `attachment; filename=${archivo.nombre}`);
      res.setHeader('Content-type', 'application/octet-stream');
      res.send(archivo.contenido);
    });
  });
}

function subir1(req, res) {
  if (!req.files || !req.files.archivo) {
    return res.render('login/subirA', { error: ' *Error: No se ha seleccionado ningún archivo.' });
  }
  
  const archivo = req.files.archivo;

  req.getConnection((err, conn) => {
    // Verificar si el nombre del archivo ya existe
    conn.query('SELECT * FROM apliaciones WHERE nombre = ?', [archivo.name], (selectError, selectResults, selectFields) => {
      if (selectError) {
        console.error('Error al verificar si el archivo ya existe:', selectError);
        return res.render('login/subirA', { error: ' *Error: No se pudo verificar si el archivo ya existe.' });
      }

      // Si ya existe un archivo con el mismo nombre, mostrar un mensaje de error
      if (selectResults.length > 0) {
        console.error('Error: Ya existe un archivo con el mismo nombre.');
        return res.render('login/subirA', { error: ' *Error: Ya existe un archivo con el mismo nombre.' });
      }

      // Obtener el tipo de contenido del archivo
      const tipoDeContenido = archivo.mimetype;

      // Si el nombre no existe, insertar el archivo en la base de datos
      conn.query('INSERT INTO apliaciones (nombre, contenido, tipo_de_contenido) VALUES (?, ?, ?)', [archivo.name, archivo.data, tipoDeContenido], (insertError, insertResults, insertFields) => {
        if (insertError) {
          console.error('Error al insertar el archivo en la base de datos:', insertError);
          return res.render('login/subirA', { error: ' *Error: No se pudo subir el archivo.' });
        }

        console.log('Archivo insertado correctamente en la base de datos.');
        return res.render('login/subirA');
      });
    });
  });
}


function subir(req, res) {
  if (!req.files || !req.files.archivo) {
    return res.render('login/subirM', { error: ' *Error: No se ha seleccionado ningún archivo.' });
  }
  
  const archivo = req.files.archivo;

  req.getConnection((err, conn) => {
    // Verificar si el nombre del archivo ya existe
    conn.query('SELECT * FROM aarchivos WHERE nombre = ?', [archivo.name], (selectError, selectResults, selectFields) => {
      if (selectError) {
        console.error('Error al verificar si el archivo ya existe:', selectError);
        return res.render('login/subirM', { error: ' *Error: No se pudo verificar si el archivo ya existe.' });
      }

      // Si ya existe un archivo con el mismo nombre, mostrar un mensaje de error
      if (selectResults.length > 0) {
        console.error('Error: Ya existe un archivo con el mismo nombre.');
        return res.render('login/subirM', { error: ' *Error: Ya existe un archivo con el mismo nombre.' });
      }

      // Obtener el tipo de contenido del archivo
      const tipoDeContenido = archivo.mimetype;

      // Si el nombre no existe, insertar el archivo en la base de datos
      conn.query('INSERT INTO aarchivos (nombre, contenido, tipo_de_contenido) VALUES (?, ?, ?)', [archivo.name, archivo.data, tipoDeContenido], (insertError, insertResults, insertFields) => {
        if (insertError) {
          console.error('Error al insertar el archivo en la base de datos:', insertError);
          return res.render('login/subirM', { error: ' *Error: No se pudo subir el archivo.' });
        }

        console.log('Archivo insertado correctamente en la base de datos.');
        return res.render('login/subirM');
      });
    });
  });
}


function auth(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, rows) => {
      if (rows.length > 0) {
        res.render('login/register');
      } else {
        res.render('login/index', {error: ' *Error: El usuario no existe !'});
      }
    });
  });
}


module.exports = {
  index: index,
  register: register,
  auth: auth,
  inicio: inicio,
  subirM: subirM,
  subir: subir,
  subirA: subirA,
  subir1:subir1,
  descargarM: descargarM,
  descargarA: descargarA,
  verManuales: verManuales,
  destroy: destroy,
  verAplicaciones: verAplicaciones,
  destroy1: destroy1,
  descargarArchivo: descargarArchivo,
  descargarArchivo1: descargarArchivo1
}
