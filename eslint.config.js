import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  {
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    files: ['packages/output-view/test/**/*.ts'],
    rules: {
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
      'virtual-dom/prefer-state-destructuring': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
])
