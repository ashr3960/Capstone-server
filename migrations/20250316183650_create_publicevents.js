/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("PublicEvents", (table) => {
      table.increments("id").primary(); 
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.timestamp("date").notNullable();
      table.string("location").notNullable();
      table.string("host").notNullable();
      table.string("image").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("PublicEvents");
  }
  