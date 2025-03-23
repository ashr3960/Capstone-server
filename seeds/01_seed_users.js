/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Delete all existing records in Users table
  await knex("Users").del();

  // Insert new records for authorized and normal users
  await knex("Users").insert([
    {
      full_name: "Admin User",
      username: "adminuser",
      email: "admin@example.com",
      password: "adminpassword", 
      is_authorized: true, // Authorized
    },
    {
      full_name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      password: "password123",
      is_authorized: true, // authorized
    },
    {
      full_name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      password: "mypassword", 
      is_authorized: false, // Not authorized
    },
  ]);
}
