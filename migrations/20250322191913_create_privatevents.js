/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("PrivateEvents", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.timestamp("event_date").notNullable();
      table.string("location").notNullable();
      table.string("host").notNullable();
      table.string("image").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  
      // Foreign key linking to the Users table (creator/owner of the event)
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("Users.id").onDelete("CASCADE"); // If user is deleted, their private events will also be deleted
    });
}
  
/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down(knex) {
    return knex.schema.dropTable("PrivateEvents");
}
  