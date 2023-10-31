const { Model } = require("sequelize");

module.exports =
  (sequelize,
  (DataTypes) => {
    class Users extends Model {
      // create our associations

      static association(models) {
        // create associations in here
      }
    }

    // Similar structure to the migration, except the primary key and created_at/updated_at
    Users.init(
      {
        date: {
          type: DataTypes.DATE,
        },
        location: {
          type: DataTypes.STRING,
        },
        notes: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "users",
        timestamps: true,
        underscored: true,
      }
    );

    return Users;
  });
