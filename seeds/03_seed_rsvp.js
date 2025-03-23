/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("RSVPs").insert([
    {
      user_id: 1, 
      event_id: 1, 
      confirmed: true, // RSVP is confirmed
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
