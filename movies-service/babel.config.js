module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current"} }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/data': './src/data',
          '@/domain': './src/domain',
          '@/infra': './src/infra',
          '@/main': './src/main',
          '@/presentation': './src/presentation'
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
}