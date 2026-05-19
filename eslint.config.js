import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    'dist', 'coverage', '*.json'
  ]),
  {
    files: [ '**/*.{js,mjs,cjs,jsx}' ],
    plugins: {
      '@eslint/js': js.configs.recommended,
      'eslint-plugin-react-hooks': reactHooks.configs['recommended-latest'],
      'eslint-plugin-react-refresh': reactRefresh.configs.vite
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'max-len': [
        2, 150, {
          ignoreUrls: true,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreRegExpLiterals: true,
        }
      ],
      indent: [ 'error', 2 ], // отступы, авто
      semi: [ 'error', 'always' ], // точка с запятой, авто
      'no-unused-vars': 'off', // не испоьзуемые переменные
      'no-console': 'off', // console.log
      'no-var': 'warn',
    },
  },
  {
    files: [ '*.config.*' ], // правила для конфигов
    rules: {
      'no-underscore-dangle': [ 'off' ], // двойное подчеркивание перед/после переменной
      'import/no-extraneous-dependencies': 'off', // импорт из дев-зависимостей
    },
  },
  {
    rules: {
      quotes: [ 'error', 'single' ], // одинарные кавычки, авто
      'array-bracket-spacing': [ 'error', 'always' ], // пробелы внутри массива - авто
      'array-bracket-newline': [
        'warn',
        {
          multiline: true,
          minItems: 3,
        },
      ], // перенос элементов массива на новые строки, если многоэлементный - авто
      'object-curly-spacing': [ 'error', 'always' ], // пробелы внутри объекта
      // 'object-curly-newline': [
      //   'warn',
      //   {
      //     ObjectExpression: {
      //       multiline: true,
      //       minProperties: 2,
      //     },
      //   },
      // ], // перенос свойств объекта на новые строки, если много свойств - авто
      'no-multi-spaces': [
        'error',
        {
          exceptions: {
            Property: false,
            BinaryExpression: true,
            VariableDeclarator: true,
            ImportDeclaration: true,
          },
        },
      ], // убираем много пробелов в разных местах, авто
      'key-spacing': [
        'error', {
          mode: 'strict'
        }
      ],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1, // одна внутренняя
          maxBOF: 1, // одна сверху в импортах
        }
      ] // пустые строки, авто
    }
  }
]);
