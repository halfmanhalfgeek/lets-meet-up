// Core database types for Lets Meet Up application
// Based on the design document specifications

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  default_location?: string
  created_at: string
  updated_at: string
}

export interface Group {
  id: string
  name: string
  description?: string
  avatar_url?: string
  invite_code: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface GroupMember {
  id: string
  group_id: string
  user_id: string
  role: 'owner' | 'member'
  joined_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  group_id: string
  owner_id: string
  status: 'draft' | 'voting' | 'confirmed' | 'cancelled'
  confirmed_date?: string
  confirmed_venue_id?: string
  created_at: string
  updated_at: string
}

export interface EventParticipant {
  id: string
  event_id: string
  user_id: string
  status: 'invited' | 'responded' | 'confirmed' | 'declined'
  response_at?: string
}

export interface TimeSlot {
  id: string
  event_id: string
  proposed_by: string
  start_time: string
  end_time: string
  created_at: string
}

export interface TimeSlotResponse {
  id: string
  timeslot_id: string
  user_id: string
  availability: 'available' | 'unavailable' | 'maybe'
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  venue_type: 'restaurant' | 'cafe' | 'bar' | 'park' | 'activity' | 'other'
  external_id?: string // For API-sourced venues (Google Places, Yelp, etc.)
  external_source?: 'google' | 'yelp' | 'eventbrite' | 'manual'
  rating?: number
  price_level?: number
  website?: string
  phone?: string
  created_at: string
}

export interface EventVenue {
  id: string
  event_id: string
  venue_id: string
  proposed_by: string
  created_at: string
}

export interface Vote {
  id: string
  event_id: string
  user_id: string
  vote_type: 'timeslot' | 'venue'
  timeslot_id?: string
  venue_id?: string
  vote_value: 'up' | 'down' | 'neutral'
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  food_preferences: string[]
  activity_preferences: string[]
  accessibility_needs: string[]
  notification_preferences: {
    email: boolean
    push: boolean
    frequency: 'immediate' | 'daily' | 'weekly'
  }
  privacy_settings: {
    location_sharing: 'exact' | 'city' | 'none'
    calendar_visibility: 'full' | 'availability' | 'none'
  }
  created_at: string
  updated_at: string
}

// Database view types for complex queries
export interface GroupWithMembers extends Group {
  members: (GroupMember & { user: User })[]
  member_count: number
}

export interface EventWithDetails extends Event {
  group: Group
  owner: User
  participants: (EventParticipant & { user: User })[]
  timeslots: (TimeSlot & { responses: TimeSlotResponse[] })[]
  venues: (EventVenue & { venue: Venue })[]
  participant_count: number
}

export interface VenueWithVotes extends Venue {
  votes: Vote[]
  vote_score: number
  user_vote?: Vote
}

export interface TimeSlotWithVotes extends TimeSlot {
  responses: (TimeSlotResponse & { user: User })[]
  available_count: number
  maybe_count: number
  unavailable_count: number
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

// Form and input types
export interface CreateGroupInput {
  name: string
  description?: string
}

export interface CreateEventInput {
  title: string
  description?: string
  group_id: string
}

export interface ProposeTimeSlotInput {
  event_id: string
  start_time: string
  end_time: string
}

export interface ProposeVenueInput {
  event_id: string
  name: string
  address: string
  latitude?: number
  longitude?: number
  venue_type: Venue['venue_type']
  website?: string
  phone?: string
}

export interface AvailabilityInput {
  timeslot_id: string
  availability: TimeSlotResponse['availability']
}

export interface VoteInput {
  event_id: string
  vote_type: Vote['vote_type']
  timeslot_id?: string
  venue_id?: string
  vote_value: Vote['vote_value']
}