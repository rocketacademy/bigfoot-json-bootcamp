// models/sighting.js

import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import Comment from "./Post";

class Sighting extends Model {}

Sighting.init(
  {
    // ... Existing attributes
  },
  {
    sequelize,
    modelName: "Sighting",
  }
);

Sighting.hasMany(Comment, { foreignKey: "SightingId" });

export default Sighting;
