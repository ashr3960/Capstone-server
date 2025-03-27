/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("RSVPs", (table) => {
        table.increments("id").primary();
        
        // Foreign keys for user and event with compatible data types
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("Users.id").onDelete("CASCADE");
    
        table.uuid("event_id").notNullable();
        table.foreign("event_id").references("PublicEvents.id").onDelete("CASCADE");
    
        table.boolean("confirmed").defaultTo(false); // Track if RSVP is confirmed
    
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
}
  
/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down(knex) {
    return knex.schema.dropTable("RSVPs");
}
