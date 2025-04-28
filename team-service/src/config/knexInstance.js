import pkg from "knex";
import config from "./knexfile.js";
const { knex } = pkg;

const knexInstance = knex(config[process.env.NODE_ENV]);

export default knexInstance;
