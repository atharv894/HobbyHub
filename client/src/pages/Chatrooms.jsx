import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Chatrooms = () => {
  const { user } = useAuth();
  // Hardcoded hobbies list - no database needed
  const hobbies = ['coding', 'singing', 'guitar', 'reading', 'gaming'];

  const userHobbies = user?.hobbies || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Hobby Chatrooms</h1>
        <p className="text-gray-600 mb-8">
          Join real-time chatrooms for your favorite hobbies. Your selected hobbies are highlighted.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => {
            const isUserHobby = userHobbies.includes(hobby);
            return (
              <Link
                key={hobby}
                to={`/chat/${encodeURIComponent(hobby)}`}
                className={`block p-6 rounded-lg shadow-md transition hover:shadow-lg ${
                  isUserHobby
                    ? 'bg-blue-600 text-white border-2 border-blue-700'
                    : 'bg-white text-gray-800 border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{hobby}</h3>
                  {isUserHobby && (
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Your Hobby
                    </span>
                  )}
                </div>
                <p className="mt-2 opacity-90">
                  Join the {hobby} community chat
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chatrooms;

