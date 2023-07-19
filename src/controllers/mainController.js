const { validationResult } = require("express-validator");
const db = require("../database/models/");
const mainController = {
  index: async (req, res) => {
    try {
      const productos = await db.Producto.findAll();
      res.render("index", { productos });
    } catch (error) {
      console.log(error);
    }
  },

  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
  carrito: (req, res) => {
    res.render("carrito");
  },
  details: async (req, res) => {
    const id = req.params.id;
    const product = await db.Producto.findOne({
      where: { id: id },
    });
    res.render("productDetail", { product});
  },

  cargaGet: (req, res) => {
    res.render("formularioDeCarga");
  },
  addDetails: async (req, res) => {
    const result = validationResult(req);
  
    if (result.errors.length > 0) {
      res.render("formularioDeCarga", {
        errors: result.mapped(),
        oldData: req.body,
      });
    } else {
      try {
        await db.Producto.create({
          nombre: req.body.productName,
          precio: req.body.price,
          description: req.body.description,
          img: req.file.filename,
          clase_id: req.body.clase_id
        });
  
        res.redirect("/");
      } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error al crear el producto.");
      }
    }
  },
  edit: async (req, res) => {
    let id = req.params.id;
    let product = await db.Producto.findOne({ where: { id: id } });
    res.render("formularioDeEdicion", { product });
  },
  update: async (req, res) => {
    let id = req.params.id;
    let productEdited = await db.Producto.findOne({ where: { id: id } });
    productEdited.nombre = req.body.productName;
    productEdited.precio = req.body.price;
    productEdited.description = req.body.description;
    await productEdited.save();

    res.redirect("/productos-detail/" + id);
  },
  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      await db.Producto.destroy({ where: { id: id } });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  search: async function (req,res) {
    
  }
};

module.exports = mainController;