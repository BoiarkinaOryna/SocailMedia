module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            "@shared": "./src/shared",
            "@assets": "./assets",
            "@modules": "./src/modules"
          },
          extensions: [
            '.ts',
            '.tsx',
            '.jpg',
            '.jpeg',
            '.png'
          ],
        },
      ],
    ],
  };
};
