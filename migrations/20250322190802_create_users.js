/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("Users", (table) => {
      table.increments("id").primary();
      table.string("full_name").notNullable(); 
      table.string("username").notNullable().unique();  
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.boolean("is_authorized").defaultTo(false); 
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("Users");
  }
  