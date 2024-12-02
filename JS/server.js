const express = require('express');
const connection = require('./conexion');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/obtener-productos', (req, res) => {
  const query = `SELECT * FROM vwproductos`;
  connection.query(query, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
   });
});

app.get('/api/obtener-categorias', (req, res) => {
  const query = `SELECT * FROM categorias`;
  connection.query(query, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.get('/api/obtener-marcas', (req, res) => {
  const query = `SELECT * FROM marcas`;
  connection.query(query, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.post('/api/registrar-producto', (req, res) => {
    const { ID_Articulo, Articulo, ID_Categoria, ID_Marca, Cantidad, Estado, Precio, Imagen } = req.body;

    if (!ID_Articulo || !Articulo || Cantidad === undefined || Estado === undefined || !Precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const IVA = 0.21; // 21% de IVA
    const PrecioFinal = Math.round(parseFloat(Precio) * (1 + IVA) * 100) / 100;
    
    try {
        connection.beginTransaction();

        // Insertar en la tabla Productos
        connection.query(
            'INSERT INTO Productos (ID_Articulo, Articulo, ID_Categoria, ID_Marca, Cantidad, Estado, Imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ID_Articulo, Articulo, ID_Categoria, ID_Marca, Cantidad, Estado, Imagen]
        );
        // Insertar en la tabla ProductosPrecios
        connection.query(
            'INSERT INTO ProductosPrecios (ID_Articulo, PrecioNeto, PrecioFinal) VALUES (?, ?, ?)',
            [ID_Articulo, Precio, PrecioFinal]
        );

        connection.commit();

        res.status(201).json({ message: 'Producto registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/actualizar-producto', (req, res) => {
    const { ID_Articulo, Articulo, ID_Categoria, ID_Marca, Cantidad, Estado, Precio, Imagen } = req.body;

    if (!ID_Articulo || !Articulo || Cantidad === undefined || Estado === undefined || !Precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const IVA = 0.21; // 21% de IVA
    const PrecioFinal = Math.round(parseFloat(Precio) * (1 + IVA) * 100) / 100;
    
    const verificarProducto = 'SELECT COUNT(*) AS count FROM vwproductos WHERE ID_Articulo = ?';
    connection.query(verificarProducto, [ID_Articulo], (error, results) => {
      if (error) {
          console.error('Error al verificar la existencia del infante:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
      }

      const exists = results[0].count > 0;

      if (exists) {
          // Si existe, realiza un UPDATE
          const updateProductos = 'UPDATE productos SET Articulo = ?, ID_Marca = ?, ID_Categoria = ?, cantidad = ?, Estado = ?, Imagen = ? WHERE ID_Articulo = ?';
          const valoresP = [Articulo, ID_Categoria, ID_Marca, Cantidad, Estado, Imagen, ID_Articulo];
          const updateProductosP = 'UPDATE productosprecios SET PrecioNeto = ?, PrecioFinal = ? WHERE ID_Articulo = ?';
          const valoresPP = [Precio, PrecioFinal, ID_Articulo];

          connection.query(updateProductos, valoresP, (updateError, updateResults) => {
              if (updateError) {
                  console.error('Error al actualizar datos en la base de datos:', updateError);
                  return res.status(500).json({ error: 'Error en el servidor' });
              }
              res.status(200).json({ message: 'Producto actualizado correctamente' });
          });

          connection.query(updateProductosP, valoresPP, (updateError, updateResults) => {
            if (updateError) {
                console.error('Error al actualizar datos en la base de datos:', updateError);
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        });
      }
  });
});

app.delete('/api/eliminar-productos/:id', (req, res) => {
    const { id } = req.params; // Obtener el ID del artículo a eliminar
    
    connection.query('DELETE FROM productos WHERE ID_Articulo = ?', [id]);
    connection.query('DELETE FROM productosprecios WHERE ID_Articulo = ?', [id])
});

app.post('/api/registrar-marcas', (req, res) => {
    const { Descripcion } = req.body;

    if (!Descripcion ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        connection.beginTransaction();

        // Insertar en la tabla Marcas
        connection.query(
            'INSERT INTO marcas (Descripcion) VALUES (?)',
            [Descripcion]
        );

        connection.commit();

        res.status(201).json({ message: 'Marca registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar marca:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/registrar-categorias', (req, res) => {
    const { Descripcion } = req.body;

    if (!Descripcion ) {return res.status(400).json({ error: 'Todos los campos son obligatorios' });}

    try {
        connection.beginTransaction();
        // Insertar en la tabla Categorias
        connection.query(
            'INSERT INTO categorias (Descripcion) VALUES (?)',
            [Descripcion]
        );
        connection.commit();
        res.status(201).json({ message: 'Categoria registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar categoria:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/registrar-clientes', (req, res) => {
    const { ID_Cliente, Cliente, Domicilio, Localidad, Estado, ID_Usuario } = req.body;

    if (!ID_Cliente || !Cliente || Estado === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        connection.beginTransaction();

        // Insertar en la tabla Clientes
        connection.query(
            'INSERT INTO clientes (ID_Cliente, Cliente, Domicilio, Localidad, Estado, ID_Usuario) VALUES (?, ?, ?, ?, ?, ?)',
            [ID_Cliente, Cliente, Domicilio, Localidad, Estado, ID_Usuario]
        );

        connection.commit();

        res.status(201).json({ message: 'Cliente registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar cliente:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/actualizar-clientes', (req, res) => {
    const { ID_Cliente, Cliente, Domicilio, Localidad, Estado, ID_Usuario } = req.body;

    if (!ID_Cliente || !Cliente || Estado === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    const verificarCliente = 'SELECT COUNT(*) AS count FROM clientes WHERE ID_Cliente = ?';
    connection.query(verificarCliente, [ID_Cliente], (error, results) => {
      if (error) {
          console.error('Error al verificar la existencia del cliente:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
      }

      const exists = results[0].count > 0;

      if (exists) {
          // Si existe, realiza un UPDATE
          const updateClientes = 'UPDATE clientes SET Cliente = ?, Domicilio = ?, Localidad = ?, Estado = ?, ID_Usuario = ? WHERE ID_Cliente = ?';
          const valoresC = [Cliente, Domicilio, Localidad, Estado, ID_Usuario, ID_Cliente];

          connection.query(updateClientes, valoresC, (updateError, updateResults) => {
              if (updateError) {
                  console.error('Error al actualizar datos en la base de datos:', updateError);
                  return res.status(500).json({ error: 'Error en el servidor' });
              }
              res.status(200).json({ message: 'Cliente actualizado correctamente' });
          });
      }
  });
});

app.delete('/api/eliminar-clientes/:id', (req, res) => {
    const { id } = req.params; // Obtener el ID del cliente a eliminar
    
    connection.query('DELETE FROM clientes WHERE ID_Cliente = ?', [id]);
});

app.post('/api/registrar-usuarios', (req, res) => {
    const { ID_Usuario, Usuario, Clave, Email, Telefono } = req.body;

    if (!ID_Usuario || !Usuario || !Clave) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        connection.beginTransaction();

        // Insertar en la tabla Usuarios
        connection.query(
            'INSERT INTO usuarios (ID_Usuario, Usuario, Clave, Email, Telefono) VALUES (?, ?, ?, ?, ?)',
            [ID_Usuario, Usuario, Clave, Email, Telefono]
        );

        connection.commit();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/actualizar-usuarios', (req, res) => {
    const { ID_Usuario, Usuario, Clave, Email, Telefono } = req.body;

    if (!ID_Usuario || !Usuario || !Clave) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    const verificarUsuario = 'SELECT COUNT(*) AS count FROM usuarios WHERE ID_Usuario = ?';
    connection.query(verificarUsuario, [ID_Usuario], (error, results) => {
      if (error) {
          console.error('Error al verificar la existencia del usuario:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
      }

      const exists = results[0].count > 0;

      if (exists) {
          // Si existe, realiza un UPDATE
          const updateUsuarios = 'UPDATE usuarios SET Usuario = ?, Clave = ?, Email = ?, Telefono = ? WHERE ID_Usuario = ?';
          const valoresU = [Usuario, Clave, Email, Telefono, ID_Usuario];

          connection.query(updateUsuarios, valoresU, (updateError, updateResults) => {
              if (updateError) {
                  console.error('Error al actualizar datos en la base de datos:', updateError);
                  return res.status(500).json({ error: 'Error en el servidor' });
              }
              res.status(200).json({ message: 'Usuario actualizado correctamente' });
          });
      }
  });
});

app.delete('/api/eliminar-usuarios/:id', (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario a eliminar
    
    connection.query('DELETE FROM usuarios WHERE ID_Usuario = ?', [id]);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});