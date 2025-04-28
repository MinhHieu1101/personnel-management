/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("Users", (table) => {
    table.uuid("userId").primary();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable;
    table
      .enu("role", ["MANAGER", "MEMBER"], {
        useNative: true, // native ENUM type
        enumName: "enum_Users_role",
      })
      .notNullable();
    table.timestamp(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("Users");
  await knex.schema.raw('DROP TYPE IF EXISTS "enum_Users_role"');
}
