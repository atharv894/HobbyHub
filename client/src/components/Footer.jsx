const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HobbyHub</h3>
            <p className="text-gray-400">
              Connect with hobby enthusiasts, join events, and share resources.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/events" className="hover:text-white transition">Events</a></li>
              <li><a href="/resources" className="hover:text-white transition">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <p className="text-gray-400">
              Join our community and fuel your passion for hobbies.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HobbyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

