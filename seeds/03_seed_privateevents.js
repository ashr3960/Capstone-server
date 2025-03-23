/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Delete all existing records in PrivateEvents table
  await knex("PrivateEvents").del();

  // Insert new records into the PrivateEvents table
  await knex("PrivateEvents").insert([
    {
      title: "Private Birthday Party",
      description: "A small gathering with close friends and family.",
      event_date: "2025-07-10 19:00:00",
      location: "New York, USA",
      host: "John Doe",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
      user_id: 3, 
    },
    {
      title: "Family Reunion",
      description: "A gathering of family members for a weekend of fun.",
      event_date: "2025-08-01 14:00:00",
      location: "Chicago, USA",
      host: "John Doe",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
      user_id: 3,
    },
  ]);
}
