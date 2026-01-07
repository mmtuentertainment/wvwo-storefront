/**
 * SPEC-20: Placeholder Resort Data
 * Example data for testing ResortTemplate
 * NOT real destination data - actual data comes in future specs
 */
import type { ResortTemplateProps } from '../../types/templates/resort';

export const exampleResortData: ResortTemplateProps = {
  // Hero Section
  name: "Mountain Adventures Resort",
  location: "New River Gorge, West Virginia",
  acreage: 500,
  season: {
    open: "March 15",
    close: "November 15"
  },
  signatureActivities: ["Whitewater Rafting", "Zip Lines", "Rock Climbing", "Mountain Biking"],
  quickHighlights: [
    "50+ years of adventure",
    "Class III-V rapids",
    "2,000 ft zip line",
    "On-site lodging"
  ],
  heroImage: "/images/placeholder/resort-hero.jpg",
  heroImageAlt: "Aerial view of adventure resort nestled in New River Gorge",

  // Activity Categories
  activityCategories: [
    {
      category: "Water Adventures",
      activities: [
        {
          name: "Upper New River Rafting",
          difficulty: "Beginner",
          duration: "Half Day (4 hours)",
          minAge: 6,
          description: "Perfect introduction to whitewater with Class I-III rapids through scenic gorge.",
          highlights: ["Professional guides", "All equipment included", "Riverside lunch"],
          season: "May - October",
          priceRange: "$79-99/person"
        },
        {
          name: "Lower New River Rafting",
          difficulty: "Intermediate",
          duration: "Full Day (6 hours)",
          minAge: 12,
          description: "Challenge yourself on Class III-V rapids in America's newest National Park.",
          highlights: ["Class IV-V rapids", "Expert guides", "Photos included"],
          season: "April - October",
          priceRange: "$129-169/person"
        },
        {
          name: "Kayak Tours",
          difficulty: "All Levels",
          duration: "2-4 hours",
          description: "Guided kayak adventures on calm sections of the New River.",
          highlights: ["Instruction included", "Wildlife viewing", "All skill levels"],
          season: "May - September",
          priceRange: "$59-89/person"
        }
      ]
    },
    {
      category: "Land Activities",
      activities: [
        {
          name: "Rock Climbing",
          difficulty: "All Levels",
          duration: "Half Day",
          minAge: 8,
          description: "Climb world-class sandstone cliffs with certified guides.",
          highlights: ["All equipment provided", "Routes for all levels", "Small groups"],
          season: "Year-round",
          priceRange: "$89-129/person"
        },
        {
          name: "Mountain Biking",
          difficulty: "Intermediate",
          duration: "2-4 hours",
          description: "Explore 30+ miles of singletrack through Appalachian forest.",
          highlights: ["Trail maps provided", "Bike rentals available", "Shuttle service"],
          season: "April - November",
          priceRange: "$45-75/person"
        }
      ]
    },
    {
      category: "Air Sports",
      activities: [
        {
          name: "Zip Line Canopy Tour",
          difficulty: "Beginner",
          duration: "2-3 hours",
          minAge: 10,
          description: "Soar over the gorge on 8 zip lines spanning 2,000 feet.",
          highlights: ["Trained guides", "Spectacular views", "Photo opportunities"],
          season: "April - October",
          priceRange: "$99-129/person"
        }
      ]
    }
  ],

  // Guided Trips
  guidedTrips: [
    {
      name: "Upper Gauley Full Day",
      category: "Water",
      difficulty: "Advanced (Class V)",
      duration: "Full Day",
      groupSize: "6-12 people",
      includes: ["Professional guide", "All equipment", "Riverside lunch", "Photos"],
      pricing: [
        { type: "Adults", price: "$199/person" },
        { type: "Groups of 8+", price: "$179/person" }
      ],
      minAge: 16,
      seasonalNotes: "Gauley Season: September - October (dam release weekends)"
    },
    {
      name: "Family Float Trip",
      category: "Water",
      difficulty: "Beginner (Class I-II)",
      duration: "Half Day",
      groupSize: "4-20 people",
      includes: ["Guide", "Equipment", "Snacks", "Shuttle"],
      pricing: [
        { type: "Adults", price: "$69/person" },
        { type: "Children (6-12)", price: "$49/person" },
        { type: "Family 4-Pack", price: "$199" }
      ],
      minAge: 6,
      seasonalNotes: "Great for families with younger children"
    }
  ],

  // Lodging
  lodging: [
    {
      type: "Riverside Cabins",
      capacity: "Sleeps 4-6",
      amenities: ["Full kitchen", "Hot tub", "River views", "Fire pit", "WiFi"],
      priceRange: "$175-275/night",
      bookingUrl: "https://example.com/book/cabins"
    },
    {
      type: "Glamping Tents",
      capacity: "Sleeps 2-4",
      amenities: ["Queen bed", "Electricity", "Shared bathhouse", "Fire ring"],
      priceRange: "$95-145/night",
      bookingUrl: "https://example.com/book/glamping"
    },
    {
      type: "Primitive Camping",
      capacity: "Varies",
      amenities: ["Fire ring", "Picnic table", "Restrooms nearby"],
      priceRange: "$25-35/night"
    },
    {
      type: "Bunkhouse",
      capacity: "Groups up to 24",
      amenities: ["Bunk beds", "Shared kitchen", "Common area", "Group rates"],
      priceRange: "$35-55/person",
      bookingUrl: "https://example.com/book/bunkhouse"
    }
  ],

  // Packages
  packages: [
    {
      name: "Ultimate Adventure Weekend",
      duration: "3 days / 2 nights",
      includes: [
        "2 nights cabin lodging",
        "Full day rafting trip",
        "Zip line canopy tour",
        "Rock climbing session",
        "All meals included"
      ],
      price: "$599/person",
      audience: "Adults & Families",
      seasonalAvailability: "May - October"
    },
    {
      name: "Family Fun Package",
      duration: "2 days / 1 night",
      includes: [
        "1 night glamping",
        "Family float trip",
        "Campfire cookout",
        "S'mores kit"
      ],
      price: "$299/person",
      audience: "Families with kids 6+",
      seasonalAvailability: "June - August"
    },
    {
      name: "Thrill Seeker Special",
      duration: "1 day",
      includes: [
        "Lower New River rafting",
        "Zip line tour",
        "Lunch",
        "Photos"
      ],
      price: "$249/person",
      audience: "Adventure seekers",
      seasonalAvailability: "April - October"
    }
  ],

  // Outfitter Services
  outfitterServices: [
    {
      category: "Rentals",
      services: [
        {
          name: "Kayak Rental",
          description: "Single and tandem kayaks for self-guided river exploration.",
          pricing: "$45-75/day",
          booking: "Reserve 24 hours in advance"
        },
        {
          name: "Mountain Bike Rental",
          description: "Quality hardtail and full-suspension bikes for trail riding.",
          pricing: "$55-85/day",
          booking: "Walk-ins welcome, reservations recommended"
        },
        {
          name: "Camping Gear",
          description: "Tents, sleeping bags, cookware, and more for your outdoor adventure.",
          pricing: "Varies by item"
        }
      ]
    },
    {
      category: "Shuttles",
      services: [
        {
          name: "River Shuttle",
          description: "Transportation to put-in and take-out points along the New River.",
          pricing: "$25-45/person",
          booking: "Schedule at front desk"
        },
        {
          name: "Trailhead Shuttle",
          description: "Drop-off and pick-up service for hiking and biking trails.",
          pricing: "$20-35/person"
        }
      ]
    },
    {
      category: "Instruction",
      services: [
        {
          name: "Kayak Lessons",
          description: "Learn proper paddling technique from ACA-certified instructors.",
          pricing: "$89/person (2-hour session)",
          booking: "Small group and private lessons available"
        },
        {
          name: "Climbing Clinic",
          description: "Introduction to outdoor climbing, belaying, and rope skills.",
          pricing: "$129/person (half-day)"
        }
      ]
    }
  ],

  // Facilities
  facilities: {
    dining: [
      {
        name: "River Rock Grill",
        type: "Restaurant",
        hours: "7am - 9pm daily",
        notes: "Reservations recommended for dinner"
      },
      {
        name: "Trailhead Cafe",
        type: "Cafe",
        hours: "6am - 4pm daily"
      },
      {
        name: "Riverside Cookout",
        type: "BBQ",
        hours: "Weekends 5pm - 8pm",
        notes: "Seasonal - Memorial Day to Labor Day"
      }
    ],
    retail: [
      {
        name: "Adventure Outfitters",
        offerings: ["Outdoor gear", "Apparel", "Souvenirs", "Local crafts"],
        hours: "8am - 8pm daily"
      },
      {
        name: "General Store",
        offerings: ["Groceries", "Ice", "Firewood", "Camping supplies"],
        hours: "7am - 10pm daily"
      }
    ],
    eventSpaces: [
      {
        name: "Gorge View Pavilion",
        capacity: "Up to 150 guests",
        use: "Weddings, reunions, corporate events"
      },
      {
        name: "Creekside Meeting Room",
        capacity: "Up to 30 guests",
        use: "Corporate retreats, small groups"
      }
    ],
    other: [
      {
        type: "Swimming Pool",
        description: "Heated outdoor pool with mountain views, open May-September"
      },
      {
        type: "Hot Tubs",
        description: "Two riverside hot tubs available to all guests"
      },
      {
        type: "Game Room",
        description: "Pool table, arcade games, and board games for rainy days"
      }
    ]
  },

  // Booking & Policies
  booking: {
    reservationUrl: "https://example.com/reservations",
    phone: "(304) 555-RAFT",
    email: "info@mountainadventures.example.com",
    policies: [
      {
        category: "Cancellation Policy",
        details: [
          "Full refund if cancelled 7+ days before trip",
          "50% refund if cancelled 3-6 days before trip",
          "No refund for cancellations less than 3 days"
        ]
      },
      {
        category: "Weather Policy",
        details: [
          "Trips run rain or shine",
          "High water conditions may require trip modification",
          "Full refund or reschedule if we cancel due to weather"
        ]
      },
      {
        category: "Age & Health Requirements",
        details: [
          "Minimum ages vary by activity (see individual listings)",
          "Participants must be able to swim",
          "Pregnant women and those with back/heart conditions should consult a doctor"
        ]
      },
      {
        category: "What to Bring",
        details: [
          "Clothes you don't mind getting wet",
          "Secure footwear (no flip-flops)",
          "Sunscreen and sunglasses with strap",
          "Change of clothes for after your adventure"
        ]
      }
    ]
  },

  // Optional
  activityMapUrl: "/images/placeholder/resort-activity-map.jpg"
};
