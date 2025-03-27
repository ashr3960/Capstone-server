/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("PublicEvents").del();

  await knex("PublicEvents").insert([
    {
      title: "Tech Conference 2025",
      description: "Join industry leaders for a day of insightful discussions.",
      event_date: "2025-04-15 09:00:00",
      location: "New York, USA",
      host: "Tech Community Inc.",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Tech-Conference.jpg", 
      user_id: 1,
    },
    {
      title: "Music Festival",
      description: "A three-day festival with top artists from around the world.",
      event_date: "2025-06-20 12:00:00",
      location: "Los Angeles, USA",
      host: "MusicVibes Ltd.",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Music-Festival.jpg",
      user_id: 1,
    },
    {
      title: "Startup Pitch Night",
      description: "Watch startups pitch to top investors for funding opportunities.",
      event_date: "2025-05-10 18:00:00",
      location: "San Francisco, USA",
      host: "Silicon Valley Network",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Startup-Pitch-Night.jpg", 
      user_id: 1,
    },
    {
      title: "Food & Wine Expo",
      description: "Taste the best wines and gourmet food from world-renowned chefs.",
      event_date: "2025-08-12 11:00:00",
      location: "Paris, France",
      host: "Gastronomy Club",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Food-Wine-Expo.jpg", 
      user_id: 2,
    },
    {
      title: "AI & Machine Learning Summit",
      description: "Explore the future of AI with experts in the industry.",
      event_date: "2025-09-05 09:00:00",
      location: "Boston, USA",
      host: "AI Research Group",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/AI-Machine-Learning.jpg", 
      user_id: 2,
    },
    {
      title: "Gaming Expo",
      description: "Experience the latest games and tech at the ultimate gaming convention.",
      event_date: "2025-11-15 10:00:00",
      location: "Tokyo, Japan",
      host: "E-Sports Alliance",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Gaming-Expo.jpg", 
      user_id: 2,
    },
    {
      title: "Health & Wellness Retreat",
      description: "Relax, rejuvenate, and learn about holistic wellness practices.",
      event_date: "2025-07-18 14:00:00",
      location: "Bali, Indonesia",
      host: "Mind & Body Wellness",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Health-Wellness-Retreat.jpg", 
      user_id: 1,
    },
    {
      title: "Car Enthusiast Show",
      description: "Showcasing the world's most exotic and high-performance cars.",
      event_date: "2025-10-10 16:00:00",
      location: "Dubai, UAE",
      host: "Auto Passion Club",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Car-Show.jpg", 
      user_id: 1,
    },
    {
      title: "Fashion Week Runway",
      description: "The latest trends from top designers hit the runway.",
      event_date: "2025-09-22 20:00:00",
      location: "Milan, Italy",
      host: "Elite Fashion Association",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Fashion-Week.jpg", 
      user_id: 1,
    },
    {
      title: "Book Fair & Writers Meetup",
      description: "Meet your favorite authors and discover new books.",
      event_date: "2025-12-05 09:00:00",
      location: "London, UK",
      host: "Literary Society",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Book-Fair.jpg", 
      user_id: 2,
    },
  ]);
}
