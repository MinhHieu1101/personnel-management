import { knex } from "knex";
import config from "./knexfile.js";

const knexInstance = knex(config[process.env.NODE_ENV]);

export default knexInstance;
