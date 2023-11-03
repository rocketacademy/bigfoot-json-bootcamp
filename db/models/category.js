const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    // create our associations

    static associate(models) {
      // create associations in here
      Category.belongsToMany(models.sighting, {
        through: "sighting_categories",
      });
      // note that you don't actually have a through table MODEL called sighting_categories
      // sequelize is making the MODEL automatically under the hood AT RUNTIME.
      // because it contains only two foreign keys. (you only made the join table with migration, not the model.)
      // note that if you need an extra column in it you need to build model.
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
      timestamps: true,
      underscored: true,
    }
  );

  return Category;
};
