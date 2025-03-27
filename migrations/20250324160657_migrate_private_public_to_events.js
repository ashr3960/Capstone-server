/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.transaction(async (trx) => {
        // Migrate data from PrivateEvents
        const privateEvents = await trx("PrivateEvents").select("*");
        // Insert private events into the new Events table, preserving the IDs
        await trx("Events").insert(
            privateEvents.map(event => ({
                ...event,
                event_type: "private",  // Assign event_type for private events
            }))
        );

        // Migrate data from PublicEvents
        const publicEvents = await trx("PublicEvents").select("*");
        // Insert public events into the new Events table, preserving the IDs
        await trx("Events").insert(
            publicEvents.map(event => ({
                ...event,
                event_type: "public",  // Assign event_type for public events
            }))
        );
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex("Events").truncate();  
};
