import {configDefaults, defineConfig, mergeConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude:[
      ...configDefaults.exclude, 
      'build/__test__/*'
    ],
    reporters: ['verbose']
  },
});