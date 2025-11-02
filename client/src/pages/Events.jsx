import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [filterHobby, setFilterHobby] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    hobby: ''
  });
  const [searchParams] = useSearchParams();

  // Hardcoded hobbies list - no database needed
  const hardcodedHobbies = ['coding', 'singing', 'guitar', 'reading', 'gaming'];

  useEffect(() => {
    setHobbies(hardcodedHobbies);
    fetchEvents();
    
    if (searchParams.get('action') === 'host') {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [filterHobby]);

  // Generate mock events for next month - no database needed
  const allMockEvents = useMemo(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    return [
      // Coding events
      {
        _id: '1',
        title: 'Web Development Workshop',
        description: 'Join us for a hands-on workshop on modern web development using React and Node.js. Learn best practices and build a project together.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 5, 14, 0).toISOString(),
        location: 'Tech Hub Community Center',
        hobby: 'coding',
        hostedBy: { _id: 'host1', name: 'Alex Developer' },
        participants: ['user1', 'user2', 'user3']
      },
      {
        _id: '2',
        title: 'Python Coding Night',
        description: 'A fun evening of Python coding challenges and problem-solving. All skill levels welcome!',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 12, 18, 30).toISOString(),
        location: 'Code Cafe Downtown',
        hobby: 'coding',
        hostedBy: { _id: 'host2', name: 'Sarah Programmer' },
        participants: ['user4', 'user5']
      },
      {
        _id: '3',
        title: 'Hackathon Preparation Meetup',
        description: 'Get ready for the upcoming hackathon! Share ideas, form teams, and discuss strategies.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 20, 10, 0).toISOString(),
        location: 'Innovation Lab',
        hobby: 'coding',
        hostedBy: { _id: 'host3', name: 'Mike Tech' },
        participants: ['user6', 'user7', 'user8', 'user9']
      },
      
      // Singing events
      {
        _id: '4',
        title: 'Community Choir Rehearsal',
        description: 'Weekly choir rehearsal for all voice types. We\'ll practice new songs and prepare for upcoming performances.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 3, 19, 0).toISOString(),
        location: 'Music Hall Auditorium',
        hobby: 'singing',
        hostedBy: { _id: 'host4', name: 'Emma Vocalist' },
        participants: ['user10', 'user11', 'user12']
      },
      {
        _id: '5',
        title: 'Karaoke Night',
        description: 'A fun and relaxed karaoke night! Show off your singing skills or just enjoy the music.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 15, 20, 0).toISOString(),
        location: 'The Sound Lounge',
        hobby: 'singing',
        hostedBy: { _id: 'host5', name: 'John Melody' },
        participants: ['user13', 'user14', 'user15', 'user16', 'user17']
      },
      {
        _id: '6',
        title: 'Vocal Technique Workshop',
        description: 'Learn breathing techniques, vocal exercises, and how to improve your singing range.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 25, 16, 0).toISOString(),
        location: 'Voice Studio Academy',
        hobby: 'singing',
        hostedBy: { _id: 'host6', name: 'Lisa Singer' },
        participants: ['user18', 'user19']
      },
      
      // Guitar events
      {
        _id: '7',
        title: 'Acoustic Guitar Jam Session',
        description: 'Bring your guitar and join us for an informal jam session. All skill levels welcome!',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 8, 17, 0).toISOString(),
        location: 'Park Amphitheater',
        hobby: 'guitar',
        hostedBy: { _id: 'host7', name: 'Tom Guitarist' },
        participants: ['user20', 'user21', 'user22']
      },
      {
        _id: '8',
        title: 'Fingerstyle Guitar Workshop',
        description: 'Learn fingerstyle guitar techniques from an experienced instructor. Bring your acoustic guitar.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 18, 15, 30).toISOString(),
        location: 'Guitar Shop Studio',
        hobby: 'guitar',
        hostedBy: { _id: 'host8', name: 'Chris Strings' },
        participants: ['user23', 'user24', 'user25', 'user26']
      },
      {
        _id: '9',
        title: 'Electric Guitar Masterclass',
        description: 'Advanced techniques for electric guitar players. We\'ll cover solos, riffs, and effects.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 28, 19, 0).toISOString(),
        location: 'Rock Music School',
        hobby: 'guitar',
        hostedBy: { _id: 'host9', name: 'Rocky Guitar' },
        participants: ['user27', 'user28']
      },
      
      // Reading events
      {
        _id: '10',
        title: 'Book Club Discussion',
        description: 'Monthly book club meeting to discuss this month\'s selection. Come share your thoughts and insights!',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 7, 18, 0).toISOString(),
        location: 'City Library Meeting Room',
        hobby: 'reading',
        hostedBy: { _id: 'host10', name: 'Bookworm Betty' },
        participants: ['user29', 'user30', 'user31', 'user32', 'user33']
      },
      {
        _id: '11',
        title: 'Poetry Reading Evening',
        description: 'An intimate evening of poetry readings. Share your favorite poems or read your own works.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 14, 19, 30).toISOString(),
        location: 'Cozy Corner Bookstore',
        hobby: 'reading',
        hostedBy: { _id: 'host11', name: 'Poet Paul' },
        participants: ['user34', 'user35', 'user36']
      },
      {
        _id: '12',
        title: 'Author Meet & Greet',
        description: 'Meet local authors and learn about their writing process. Book signing included!',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 22, 14, 0).toISOString(),
        location: 'Literary Cafe',
        hobby: 'reading',
        hostedBy: { _id: 'host12', name: 'Writer Wendy' },
        participants: ['user37', 'user38', 'user39', 'user40']
      },
      
      // Gaming events
      {
        _id: '13',
        title: 'Gaming Tournament',
        description: 'Competitive gaming tournament with prizes! Multiple games including FPS and strategy games.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 6, 12, 0).toISOString(),
        location: 'GameZone Arcade',
        hobby: 'gaming',
        hostedBy: { _id: 'host13', name: 'Gamer Greg' },
        participants: ['user41', 'user42', 'user43', 'user44', 'user45', 'user46']
      },
      {
        _id: '14',
        title: 'Board Game Night',
        description: 'Join us for a fun evening of board games! We\'ll have a variety of games available for all players.',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 13, 18, 0).toISOString(),
        location: 'Community Center Hall',
        hobby: 'gaming',
        hostedBy: { _id: 'host14', name: 'Board Master Bob' },
        participants: ['user47', 'user48', 'user49', 'user50']
      },
      {
        _id: '15',
        title: 'Esports Watch Party',
        description: 'Watch the latest esports tournament together! Food and drinks provided. Come support your favorite teams!',
        dateTime: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 27, 16, 0).toISOString(),
        location: 'Sports Bar & Grill',
        hobby: 'gaming',
        hostedBy: { _id: 'host15', name: 'Esports Eric' },
        participants: ['user51', 'user52', 'user53', 'user54', 'user55']
      }
    ];
  }, []);

  const fetchEvents = () => {
    // Use mock events instead of API call
    let events = allMockEvents;
    // Filter by hobby if selected
    if (filterHobby) {
      events = events.filter(event => event.hobby === filterHobby);
    }
    setEvents(events);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new event to the list (no database, just local state)
    const newEvent = {
      _id: Date.now().toString(),
      ...formData,
      hostedBy: { _id: user?.id || 'user', name: user?.name || 'You' },
      participants: [user?.id || 'user']
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ title: '', description: '', dateTime: '', location: '', hobby: '' });
  };

  const handleJoin = (eventId) => {
    // Update local state (no database)
    setEvents(events.map(event => {
      if (event._id === eventId) {
        const userId = user?.id || 'user';
        if (!event.participants.includes(userId)) {
          return {
            ...event,
            participants: [...event.participants, userId]
          };
        }
      }
      return event;
    }));
  };

  const handleLeave = (eventId) => {
    // Update local state (no database)
    setEvents(events.map(event => {
      if (event._id === eventId) {
        const userId = user?.id || 'user';
        return {
          ...event,
          participants: event.participants.filter(p => p !== userId)
        };
      }
      return event;
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Events</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Host Event
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filterHobby}
            onChange={(e) => setFilterHobby(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Hobbies</option>
            {hobbies.map((hobby) => (
              <option key={hobby} value={hobby}>
                {hobby}
              </option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const currentUserId = user?._id || user?.id;
              const isJoined = event.participants?.some(
                (p) => {
                  const participantId = p?._id || p;
                  return participantId === currentUserId || participantId?.toString() === currentUserId?.toString();
                }
              );
              const hostId = event.hostedBy?._id || event.hostedBy;
              const isHost = hostId === currentUserId || hostId?.toString() === currentUserId?.toString();

              return (
                <div key={event._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <p><span className="font-semibold">Date:</span> {new Date(event.dateTime).toLocaleString()}</p>
                    <p><span className="font-semibold">Location:</span> {event.location}</p>
                    <p><span className="font-semibold">Hobby:</span> {event.hobby}</p>
                    <p><span className="font-semibold">Host:</span> {event.hostedBy?.name || 'Unknown'}</p>
                    <p><span className="font-semibold">Participants:</span> {event.participants?.length || 0}</p>
                  </div>
                  {!isHost && (
                    <button
                      onClick={() => isJoined ? handleLeave(event._id) : handleJoin(event._id)}
                      className={`w-full py-2 rounded-lg transition ${
                        isJoined
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isJoined ? 'Leave Event' : 'Join Event'}
                    </button>
                  )}
                  {isHost && (
                    <div className="bg-gray-100 text-gray-600 py-2 rounded-lg text-center">
                      You are hosting this event
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
            No events found. Be the first to host one!
          </div>
        )}

        {/* Host Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Host New Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hobby
                  </label>
                  <select
                    value={formData.hobby}
                    onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a hobby</option>
                    {hobbies.map((hobby) => (
                      <option key={hobby} value={hobby}>
                        {hobby}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

