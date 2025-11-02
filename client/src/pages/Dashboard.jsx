import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  const { user, fetchUser } = useAuth();
  const [hostedEvents, setHostedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const updatedUser = await fetchUser();
      if (updatedUser) {
        setHostedEvents(updatedUser.hostedEvents || []);
        setJoinedEvents(updatedUser.joinedEvents || []);
      } else if (user) {
        setHostedEvents(user.hostedEvents || []);
        setJoinedEvents(user.joinedEvents || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {user?.name}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <div>
              <span className="font-semibold">Hobbies:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {user?.hobbies?.length > 0 ? (
                  user.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {hobby}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No hobbies selected</span>
                )}
              </div>
            </div>
            <Link
              to="/hobbies"
              className="text-blue-600 hover:underline inline-block mt-4"
            >
              Update Hobbies
            </Link>
          </div>
        </div>

        {/* Host New Event */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Host an Event</h2>
          <p className="text-gray-600 mb-4">
            Share your passion by hosting an event for your hobby community.
          </p>
          <Link
            to="/events?action=host"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Host New Event
          </Link>
        </div>

        {/* Hosted Events */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Events You're Hosting</h2>
          {hostedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              You haven't hosted any events yet.
            </div>
          )}
        </div>

        {/* Joined Events */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Events You've Joined</h2>
          {joinedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              You haven't joined any events yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

