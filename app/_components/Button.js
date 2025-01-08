' use client ';

export default function Button({ filter, children, activeFilter, onClick }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
