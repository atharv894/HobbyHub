import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ResourceCard from "../components/ResourceCard";

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [filterHobby, setFilterHobby] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    hobby: "",
  });

  useEffect(() => {
    // Set hardcoded hobbies
    const hardcodedHobbies = [
      "coding",
      "singing",
      "guitar",
      "reading",
      "gaming",
    ];
    setHobbies(hardcodedHobbies);
    fetchResources();
  }, []);

  useEffect(() => {
    fetchResources();
  }, [filterHobby]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const params = filterHobby ? { hobby: filterHobby } : {};
      const response = await axios.get("/api/resources", { params });
      console.log("Fetched resources:", response.data.length);
      setResources(response.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      // Still show empty array if fetch fails
      setResources([]);
      alert("Failed to load resources. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/resources", formData);
      console.log("Resource created successfully:", response.data);

      // Add the new resource to the list immediately
      const newResource = response.data;
      setResources((prevResources) => [newResource, ...prevResources]);

      // Close modal and reset form
      setShowModal(false);
      setFormData({ title: "", url: "", hobby: "" });

      // Show success message
      alert("Resource shared successfully! 🎉");
    } catch (error) {
      console.error("Error creating resource:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create resource";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    try {
      await axios.delete(`/api/resources/${resourceId}`, {
        withCredentials: true,
      });
      fetchResources();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete resource");
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Learning Resources
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Share Resource
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

        {/* Resources Grid */}
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                resource={resource}
                onDelete={handleDelete}
                canDelete={
                  (resource.postedBy?._id || resource.postedBy) ===
                    (user?._id || user?.id) ||
                  String(resource.postedBy?._id || resource.postedBy) ===
                    String(user?._id || user?.id)
                }
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
            No resources found. Share the first one!
          </div>
        )}

        {/* Share Resource Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Share a Resource</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    required
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hobby
                  </label>
                  <select
                    value={formData.hobby}
                    onChange={(e) =>
                      setFormData({ ...formData, hobby: e.target.value })
                    }
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
                    Share
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

export default Resources;
