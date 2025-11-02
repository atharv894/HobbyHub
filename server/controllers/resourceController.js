// In-memory storage for resources (works without database)
let resources = [
  // Coding resources
  {
    _id: "1",
    title: "FreeCodeCamp - Learn to Code for Free",
    url: "https://www.freecodecamp.org",
    hobby: "coding",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    title: "MDN Web Docs - Web Development Resources",
    url: "https://developer.mozilla.org",
    hobby: "coding",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "3",
    title: "GitHub - Code Repository Platform",
    url: "https://github.com",
    hobby: "coding",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    _id: "4",
    title: "Stack Overflow - Programming Q&A",
    url: "https://stackoverflow.com",
    hobby: "coding",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  // Singing resources
  {
    _id: "5",
    title: "Singing Carrots - Vocal Range Test",
    url: "https://singingcarrots.com",
    hobby: "singing",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "6",
    title: "YouTube Singing Lessons - Eric Arceneaux",
    url: "https://www.youtube.com/c/EricArceneauxOfficial",
    hobby: "singing",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "7",
    title: "Vocal Warm-ups Guide",
    url: "https://takelessons.com/blog/vocal-warm-ups",
    hobby: "singing",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  // Guitar resources
  {
    _id: "8",
    title: "JustinGuitar - Free Guitar Lessons",
    url: "https://www.justinguitar.com",
    hobby: "guitar",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "9",
    title: "Ultimate Guitar - Tabs & Chords",
    url: "https://www.ultimateguitar.com",
    hobby: "guitar",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "10",
    title: "Fender Play - Learn Guitar Online",
    url: "https://www.fender.com/en-US/play",
    hobby: "guitar",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    _id: "11",
    title: "Guitar World - News & Lessons",
    url: "https://www.guitarworld.com",
    hobby: "guitar",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  // Reading resources
  {
    _id: "12",
    title: "Project Gutenberg - Free eBooks",
    url: "https://www.gutenberg.org",
    hobby: "reading",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "13",
    title: "Goodreads - Book Recommendations",
    url: "https://www.goodreads.com",
    hobby: "reading",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "14",
    title: "Library of Congress - Digital Collections",
    url: "https://www.loc.gov",
    hobby: "reading",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    _id: "15",
    title: "Audible - Audiobooks & Podcasts",
    url: "https://www.audible.com",
    hobby: "reading",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  // Gaming resources
  {
    _id: "16",
    title: "Twitch - Live Game Streaming",
    url: "https://www.twitch.tv",
    hobby: "gaming",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "17",
    title: "Steam - Digital Game Store",
    url: "https://store.steampowered.com",
    hobby: "gaming",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "18",
    title: "IGN - Game Reviews & News",
    url: "https://www.ign.com",
    hobby: "gaming",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    _id: "19",
    title: "GameSpot - Gaming Community",
    url: "https://www.gamespot.com",
    hobby: "gaming",
    postedBy: {
      _id: "system",
      name: "HobbyHub",
      email: "support@hobbyhub.com",
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
];

let nextId = 20;

// Helper function to get user info (simplified for in-memory storage)
// Since we're not using a database, we'll just return a simple user object
const getUserInfo = (userId) => {
  // Return default user info (without database, we can't get actual user details)
  // In a real app with database, you would fetch user details here
  return {
    _id: userId,
    name: "User",
    email: "user@example.com",
  };
};

export const createResource = async (req, res) => {
  try {
    const { title, url, hobby } = req.body;

    // Validate required fields
    if (!title || !url || !hobby) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Create resource without authentication (works without database)
    const newResource = {
      _id: String(nextId++),
      title: String(title).trim(),
      url: String(url).trim(),
      hobby: String(hobby).trim(),
      postedBy: {
        _id: "guest",
        name: "Guest User",
        email: "guest@example.com",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to in-memory storage
    resources.push(newResource);
    console.log(`✅ Resource added successfully! Total: ${resources.length}`);

    // Serialize Date objects for JSON response
    const serializedResource = {
      ...newResource,
      createdAt: newResource.createdAt.toISOString(),
      updatedAt: newResource.updatedAt.toISOString(),
    };

    res.status(201).json(serializedResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({
      message: error.message || "Failed to create resource",
    });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const { hobby } = req.query;

    let filteredResources = [...resources]; // Create a copy to avoid mutating original
    if (hobby) {
      filteredResources = filteredResources.filter((r) => r.hobby === hobby);
    }

    // Sort by createdAt descending (newest first)
    filteredResources.sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB =
        b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB - dateA;
    });

    // Convert Date objects to ISO strings for JSON serialization
    const serializedResources = filteredResources.map((r) => ({
      ...r,
      createdAt:
        r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
      updatedAt:
        r.updatedAt instanceof Date ? r.updatedAt.toISOString() : r.updatedAt,
    }));

    console.log(
      `Returning ${serializedResources.length} resources${
        hobby ? ` for hobby: ${hobby}` : ""
      }`
    );
    res.json(serializedResources);
  } catch (error) {
    console.error("Error getting resources:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = resources.find((r) => r._id === req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resourceIndex = resources.findIndex((r) => r._id === req.params.id);

    if (resourceIndex === -1) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const resource = resources[resourceIndex];
    const postedById = resource.postedBy?._id || resource.postedBy;

    // Allow deletion if posted by user or if user ID matches
    if (
      String(postedById) !== String(req.user.userId) &&
      postedById !== "system"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this resource" });
    }

    resources.splice(resourceIndex, 1);
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
