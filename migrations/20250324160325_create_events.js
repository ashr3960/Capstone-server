/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("Events", (table) => {
    table.uuid("id").primary();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.timestamp("event_date").notNullable();
    table.string("location").notNullable();
    table.string("host").notNullable();
    table.string("image").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("Users.id").onDelete("CASCADE");
    table.enum("event_type", ["private", "public"]).notNullable();
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down(knex) {
  return knex.schema.dropTableIfExists("Events");
}
