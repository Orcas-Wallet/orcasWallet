module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel",
      [
        'module-resolver',
        {
          alias: {
            'crypto': 'react-native-fast-crypto',
            'stream': 'stream-browserify',
          },
        },
      ],
    ]};
};
