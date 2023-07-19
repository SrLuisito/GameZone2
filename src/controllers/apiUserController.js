const db = require("../database/models");
const Op = db.Sequelize.Op;
module.exports = {
  list: async (req, res) => {
    try {
      const userList = await db.Usuario.findAll(req.body, {
        attributes: ["id", "name", "email", "img"],
      });
      if (userList) {
        
        const userListWithDetail = userList.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          img: user.img,
        }));
        return res.status(200).json({
          users: userListWithDetail.length,
          lista: userListWithDetail,
          status: 200,
        });
      } else {
        res.status(200).json({
          error: "No se encontro el usuario"
        })
      }

    } catch (error) {
      return res.status(500).json({
        error: "Ocurrió un error al obtener la lista de usuarios",
      });
    }
  },
  verImagen: async (req, res) => {
    const userID = req.params.id;
    const userDetail = await db.Usuario.findByPk(userID, {
      attributes: ["id", "img"],
    });
    res.render("users/verImagen", {
      userDetail,
      error: "No se encontro imagen de img",
    });
  },
  search: async (req, res) => {
    const user = await db.Usuario.findByPk(req.params.id);
    if (user) {
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          img: user.img,
        },
      });
  } else {
    res.status(200).json({
      error: "No se encontro el usuarios"
    })
  }
  },
};
