const SectionHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="flex items-center gap-6 mb-8 mt-1">
      {/* ============================
          Icon Container
          Glassy rounded block that wraps the section icon
         ============================ */}
      <div
        className="
          p-4 rounded-2xl
          bg-white/20
          backdrop-blur-2xl
          shadow-lg
          border border-white/30
          ring-1 ring-black/5
          transition-all duration-300
        "
      >
        <div className="text-3xl drop-shadow-sm">{icon}</div>
      </div>

      {/* ============================
          Title and Subtitle stack
          Main heading for the section with optional subtext
         ============================ */}
      <div className="flex flex-col">
        <h2
          className="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            drop-shadow-sm
          "
        >
          {title}
        </h2>

        {/* Subtitle only renders if provided */}
        {subtitle && (
          <p
            className="
              text-base
              text-gray-700/80
              mt-2
              leading-snug
            "
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
