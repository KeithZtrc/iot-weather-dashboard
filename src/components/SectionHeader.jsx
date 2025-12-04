/* ---------------------------------------------------------------------
   SECTION HEADER COMPONENT
   ----------------------------------------------------------------------
   Purpose:
   - Provides a consistent visual header for dashboard sections
   - Includes:
       • Decorative glassy icon container
       • Title (required)
       • Optional subtitle (context or instructions)
   - Used to visually group related UI areas
---------------------------------------------------------------------- */

const SectionHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="flex items-center gap-6 mb-8 mt-1">
      {/* -----------------------------------------------------------------
         ICON CONTAINER
         - Frosted-glass square housing the section’s icon
         - Adds visual separation + thematic identity
         ----------------------------------------------------------------- */}
      <div
        className="
          p-4 rounded-2xl
          bg-white/20 backdrop-blur-2xl
          border border-white/30 ring-1 ring-black/5
          shadow-lg
          transition-all duration-300
        "
      >
        <div className="text-3xl drop-shadow-sm">{icon}</div>
      </div>

      {/* -----------------------------------------------------------------
         TITLE + SUBTITLE STACK
         - Title always shown
         - Subtitle only rendered if provided
         ----------------------------------------------------------------- */}
      <div className="flex flex-col">
        {/* Main section title */}
        <h2
          className="
            text-3xl font-extrabold tracking-tight
            text-gray-900 drop-shadow-sm
          "
        >
          {title}
        </h2>

        {/* Optional explanatory subtitle */}
        {subtitle && (
          <p
            className="
              text-base text-gray-700/80
              mt-2 leading-snug
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
