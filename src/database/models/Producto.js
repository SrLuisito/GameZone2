module.exports = function (sequelize, DataTypes) {
  let alias = "Producto";

  let col = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descuento: {
      type: DataTypes.DECIMAL,
    },
    precio: {
      type: DataTypes.DECIMAL,
    },
    img: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
  };

  let config = {
    tableName: "productos", // Corrige el nombre de la tabla
    timestamps: false,
  };

  let Producto = sequelize.define(alias, col, config);

  // Producto.associate = function (models) {
  //   Producto.belongsTo(models.Clase, {
  //     foreignKey: "clase_id",
  //     as: "clases",
  //   });
  // };

  return Producto;
};
