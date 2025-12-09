import React from 'react';

export const ProfileCard: React.FC = () => {
  const socials = [
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      color: 'hover:text-red-600 hover:shadow-red-500/30',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com',
      color: 'hover:text-pink-500 hover:shadow-pink-500/30',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v10.1c-.05 2.31-1.73 4.14-3.84 4.82-2.11.68-4.56.13-6.14-1.33-1.66-1.55-2.1-4.04-1.09-6.07 1.03-2.07 3.29-3.32 5.6-3.12v4c-1.32-.27-2.53.71-2.73 1.93-.21 1.25.68 2.5 1.92 2.78 1.25.28 2.55-.58 2.82-1.83.03-.16.03-.33.03-.49V4.04c-.01-.05-.01-.11-.01-.16-.06-1.28-.06-2.56-.06-3.84.05-.01.12-.02.18-.02z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      color: 'hover:text-fuchsia-600 hover:shadow-fuchsia-500/30',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.2-4.356-2.623-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      color: 'hover:text-blue-600 hover:shadow-blue-500/30',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
           <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.12h5.306l-1.035 3.667h-4.271v7.98h-5.017z"/>
        </svg>
      )
    },
    {
      name: 'Spotify',
      url: 'https://spotify.com',
      color: 'hover:text-green-500 hover:shadow-green-500/30',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
    }
  ];

  return (
    <header className="text-center relative z-10">
      <div className="mb-6 relative inline-block group cursor-pointer hover:scale-105 transition-transform duration-300">
        
        {/* 3D Gold Frame Container */}
        <div className="relative p-1">
            {/* Outer Gold Glow Shadow */}
            <div className="absolute inset-0 bg-yellow-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            
            {/* Main 3D Metallic Ring Structure */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_6px_rgba(0,0,0,0.3)]"></div>
            
            {/* Inner Ring Detail */}
            <div className="absolute inset-1.5 rounded-full bg-gradient-to-tl from-yellow-100 via-yellow-400 to-yellow-700"></div>
            
            {/* Dark gap between frame and image */}
            <div className="absolute inset-2.5 rounded-full bg-gray-900 shadow-inner"></div>

            {/* Profile Image */}
            <div className="relative z-10 p-3">
                 <img 
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=256&h=256&auto=format&fit=crop" 
                  alt="Foto Profil Sidhanie" 
                  className="w-32 h-32 object-cover rounded-full shadow-2xl"
                />
            </div>
        </div>

        {/* 3D Status Badge */}
        <div className="absolute bottom-2 right-2 bg-gradient-to-br from-green-400 to-green-600 w-8 h-8 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center z-20" title="Online">
             <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
        </div>
      </div>
      
      {/* Gradient Text */}
      <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 tracking-tight drop-shadow-sm">
        SIDHANIE
      </h1>
      <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-inner">
        <p className="text-sm text-indigo-600 font-bold uppercase tracking-widest">Artis & Musisi</p>
      </div>

      {/* Social Media Links - Glassmorphism & Glow Effect */}
      <div className="flex justify-center gap-3 mt-4 flex-wrap px-4">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className={`
              p-2.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm
              text-gray-600 transition-all duration-300
              hover:scale-110 hover:-translate-y-1 hover:bg-white
              ${social.color}
            `}
          >
            {social.icon}
          </a>
        ))}
      </div>
      
      <p className="text-gray-600 mt-6 leading-relaxed mx-auto text-base font-medium px-2">
        Selamat datang! 🎵 Setiap nada butuh tenaga. Dukung saya untuk peralatan studio & video klip. 
        <span className="block mt-2 text-indigo-500 font-bold">Kontribusi Anda = Energi Saya! 🚀</span>
      </p>
    </header>
  );
};