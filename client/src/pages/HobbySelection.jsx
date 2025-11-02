import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HobbySelection = () => {
  // Hardcoded hobbies list - no database needed
  const hobbies = ["coding", "singing", "guitar", "reading", "gaming"];
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [error, setError] = useState("");
  const { user, updateHobbies } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user's previously selected hobbies if they exist
    if (user?.hobbies) {
      setSelectedHobbies(user.hobbies);
    }
  }, [user]);

  const toggleHobby = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (selectedHobbies.length === 0) {
      setError("Please select at least one hobby");
      return;
    }

    // Update hobbies in local storage (no database)
    updateHobbies(selectedHobbies);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Select Your Hobbies
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Choose the hobbies you're interested in. You can always update these
          later.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {hobbies.map((hobby) => (
              <button
                key={hobby}
                type="button"
                onClick={() => toggleHobby(hobby)}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedHobbies.includes(hobby)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                }`}
              >
                {hobby}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HobbySelection;
