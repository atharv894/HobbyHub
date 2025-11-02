const ResourceCard = ({ resource, onDelete, canDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{resource.title}</h3>
      <p className="text-gray-600 mb-3">
        <span className="font-semibold">Hobby:</span> {resource.hobby}
      </p>
      <p className="text-gray-500 text-sm mb-3">
        <span className="font-semibold">Posted by:</span> {resource.postedBy?.name || 'Unknown'}
      </p>
      <div className="flex items-center justify-between">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit Resource →
        </a>
        {canDelete && (
          <button
            onClick={() => onDelete(resource._id)}
            className="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;

