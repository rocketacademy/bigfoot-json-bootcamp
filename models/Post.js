// Sequelize Model Definition
import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "postgres",
  // logging: console.log, // Change to a custom logging function if needed
});

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Updated to ARRAY of STRING
    },
  },
  {
    tableName: "Posts",
    timestamps: false,
  }
);

export default Post;
