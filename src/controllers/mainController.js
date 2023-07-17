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
    //Constante con los errores
    const result = validationResult(req);
    const id = req.params.id
    if (result.errors.length > 0) {
      res.render("formularioDeCarga", {
        errors: result.mapped(),
        oldData: req.body,
      });
    } else {
      await db.Producto.create({
        id: id,
        nombre: req.body.productName,
        precio: req.body.price,
        img: req.file.filename,
      });
      res.redirect("/");
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

    res.redirect("/product-detail/" + id);
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
};

module.exports = mainController;
