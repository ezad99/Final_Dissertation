module.exports = {
    presets: [
      '@babel/preset-env',         // Modern JS support
      '@babel/preset-react',       // React JSX transformation
      '@babel/preset-typescript',  // TypeScript support
    ],
    plugins: [
      '@babel/plugin-transform-runtime',  // Optimize Babel processing
    ],
    // For handling ES modules in Jest properly
    sourceType: 'unambiguous',
  };
  