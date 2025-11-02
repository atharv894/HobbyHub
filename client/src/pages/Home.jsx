import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect, Learn, and Share Enthusiasm
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join a community of passionate hobbyists and discover your next adventure
          </p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Hobby Guidance</h3>
              <p className="text-gray-600">
                Discover hobbies that match your interests and preferences
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
              <p className="text-gray-600">
                Connect with like-minded enthusiasts and build meaningful relationships
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Live Workshops</h3>
              <p className="text-gray-600">
                Join events and workshops to learn and share your passion
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
              <p className="text-gray-600">
                Access a curated collection of learning resources and materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Discover The Story Behind HobbyHub's Creation</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              HobbyHub was born from a simple idea: everyone deserves a place to pursue their passions 
              and connect with others who share the same enthusiasm. Whether you're into photography, 
              music, gaming, or any other hobby, we provide a platform where you can learn, share, and grow.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to create a vibrant community where hobby enthusiasts can discover new interests, 
              participate in events, engage in real-time discussions, and access valuable resources to enhance their skills.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose HobbyHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Community Focused</h3>
              <p className="text-gray-600">
                Built around the idea that hobbies are better shared with others
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Comprehensive Resources</h3>
              <p className="text-gray-600">
                Access a wide range of learning materials and expert insights
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Real-Time Interaction</h3>
              <p className="text-gray-600">
                Engage with your community through live chatrooms and instant messaging
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Events and Meetups</h3>
              <p className="text-gray-600">
                Host or join events to meet fellow enthusiasts in person or online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "HobbyHub helped me find a community of photographers. I've learned so much and made great friends!"
              </p>
              <p className="font-semibold">- Sarah M., Photography Enthusiast</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The events feature is amazing! I've hosted several gaming tournaments and they were all successful."
              </p>
              <p className="font-semibold">- Mike T., Gaming Community Leader</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "I love sharing resources with others. The platform makes it so easy to help fellow hobbyists learn and grow."
              </p>
              <p className="font-semibold">- Emily R., Cooking Enthusiast</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join HobbyHub and Fuel Your Passion!</h2>
          <p className="text-xl mb-8 text-purple-100">
            Start your journey today and connect with thousands of hobby enthusiasts
          </p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

