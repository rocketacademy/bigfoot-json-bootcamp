import { DataTypes, Sequelize } from "sequelize";
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "postgres",
  logging: true,
});
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: false, // If your table doesn't have createdAt and updatedAt columns
  }
);

export default User;
