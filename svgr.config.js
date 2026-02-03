/** @type {import('@svgr/core').Config} */
export default {
  // Output as TypeScript
  typescript: true,

  // Use default exports (works better with auto-generated index files)
  exportType: 'default',

  // Use automatic JSX runtime (no need to import React)
  jsxRuntime: 'automatic',

  // Icon mode: sets width/height to 1em, preserves viewBox
  icon: true,

  // SVGO optimization options
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // Keep viewBox for proper scaling
            removeViewBox: false,
          },
        },
      },
      // Remove hardcoded dimensions (we use viewBox)
      'removeDimensions',
    ],
  },

  // Props to forward to SVG element
  svgProps: {
    role: 'img',
  },
};
