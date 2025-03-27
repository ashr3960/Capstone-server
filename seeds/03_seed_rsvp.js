/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("RSVPs").insert([
    {
      user_id: 1, 
      event_id: "0c6100e1-0a1c-11f0-909d-60ff9e2cb671", 
      confirmed: true, 
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
