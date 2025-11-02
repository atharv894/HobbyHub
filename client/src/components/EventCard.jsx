import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Link to={`/events`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        <div className="space-y-1 text-sm text-gray-500">
          <p><span className="font-semibold">Date:</span> {formatDate(event.dateTime)}</p>
          <p><span className="font-semibold">Location:</span> {event.location}</p>
          <p><span className="font-semibold">Hobby:</span> {event.hobby}</p>
          <p><span className="font-semibold">Host:</span> {event.hostedBy?.name || 'Unknown'}</p>
          <p><span className="font-semibold">Participants:</span> {event.participants?.length || 0}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

