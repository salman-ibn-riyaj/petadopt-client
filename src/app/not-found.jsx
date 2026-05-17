import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Visual Element */}
      <div className="relative">
        <h1 
          className="text-9xl font-extrabold tracking-widest opacity-20"
          style={{ color: '#56B6C6' }}
        >
          404
        </h1>
        <div 
          className="px-4 py-1 text-sm font-bold rounded rotate-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white shadow-sm"
          style={{ backgroundColor: '#56B6C6' }}
        >
          PAGE NOT FOUND
        </div>
      </div>

      {/* Messaging */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Looks like this pup strayed too far.
        </h2>
        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          We couldn't find the page you were looking for. Let's get you back to 
          the pack so you can find your perfect companion.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link 
          href="/"
          className="px-8 py-3 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
          style={{ 
            background: 'linear-gradient(135deg, #8ACBD0 0%, #56B6C6 100%)' 
          }}
        >
          Return Home
        </Link>
      </div>

      {/* Subtle Paw Icon */}
      <div className="mt-12" style={{ color: '#8ACBD0', opacity: 0.4 }}>
        <svg 
          className="w-16 h-16 mx-auto" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M4.5 10c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm15 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-8-3c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm4 10c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-8 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z"/>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;