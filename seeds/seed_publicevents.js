/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("PublicEvents").del();

  // Inserts new sample data
  await knex("PublicEvents").insert([
    {
      title: "Tech Conference 2025",
      description: "Join industry leaders for a day of insightful discussions.",
      date: "2025-04-15",
      location: "New York, USA",
      host: "Tech Community Inc.",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Music Festival",
      description: "A three-day festival with top artists from around the world.",
      date: "2025-06-20",
      location: "Los Angeles, USA",
      host: "MusicVibes Ltd.",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Startup Pitch Night",
      description: "Watch startups pitch to top investors for funding opportunities.",
      date: "2025-05-10",
      location: "San Francisco, USA",
      host: "Silicon Valley Network",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Food & Wine Expo",
      description: "Taste the best wines and gourmet food from world-renowned chefs.",
      date: "2025-08-12",
      location: "Paris, France",
      host: "Gastronomy Club",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "AI & Machine Learning Summit",
      description: "Explore the future of AI with experts in the industry.",
      date: "2025-09-05",
      location: "Boston, USA",
      host: "AI Research Group",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Gaming Expo",
      description: "Experience the latest games and tech at the ultimate gaming convention.",
      date: "2025-11-15",
      location: "Tokyo, Japan",
      host: "E-Sports Alliance",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Health & Wellness Retreat",
      description: "Relax, rejuvenate, and learn about holistic wellness practices.",
      date: "2025-07-18",
      location: "Bali, Indonesia",
      host: "Mind & Body Wellness",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Car Enthusiast Show",
      description: "Showcasing the world's most exotic and high-performance cars.",
      date: "2025-10-10",
      location: "Dubai, UAE",
      host: "Auto Passion Club",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Fashion Week Runway",
      description: "The latest trends from top designers hit the runway.",
      date: "2025-09-22",
      location: "Milan, Italy",
      host: "Elite Fashion Association",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
    {
      title: "Book Fair & Writers Meetup",
      description: "Meet your favorite authors and discover new books.",
      date: "2025-12-05",
      location: "London, UK",
      host: "Literary Society",
      image: "https://partycrew.ca/wp-content/uploads/2015/09/Corporate-Events-DJ.jpg",
    },
  ]);
}
