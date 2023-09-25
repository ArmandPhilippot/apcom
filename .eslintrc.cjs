module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['react', 'import', 'jsx-a11y', 'formatjs'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: true,
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    // CORE RULES
    'array-callback-return': [
      'error',
      { allowImplicit: false, checkForEach: true },
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'block-scoped-var': 'error',
    // cspell:disable-next-line
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: true,
      },
    ],
    complexity: ['error', { max: 20 }],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': ['error', { allowKeywords: true }],
    eqeqeq: ['error', 'always', { null: 'always' }],
    'func-name-matching': ['error', 'always'],
    'func-names': ['error', 'always'],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'guard-for-in': 'error',
    'init-declarations': ['error', 'always'],
    'max-depth': ['error', { max: 4 }],
    'max-nested-callbacks': ['error', { max: 10 }],
    'max-params': ['error', { max: 3 }],
    'max-statements': ['error', { max: 10 }],
    'new-cap': [
      'error',
      {
        capIsNew: true,
        capIsNewExceptionPattern: '^[A-Z]+[A-Z._]*[A-Z]+$',
        newIsCap: true,
        properties: true,
      },
    ],
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-confusing-arrow': [
      'error',
      { allowParens: false, onlyOneSimpleParam: false },
    ],
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-div-regex': 'error',
    'no-duplicate-imports': ['error', { includeExports: false }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': 'error',
    'no-empty-static-block': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': [
      'error',
      {
        boolean: false,
        number: true,
        string: true,
        disallowTemplateShorthand: false,
      },
    ],
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': ['error', { capIsConstructor: true }],
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'error',
      {
        detectObjects: false,
        enforceConst: false,
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: false,
        ignoreClassFieldInitialValues: true,
        ignoreDefaultValues: true,
      },
    ],
    'no-multi-assign': ['error', { ignoreNonDeclaration: false }],
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    // cspell:disable-next-line
    'no-new-native-nonconstructor': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': ['error', { props: false }],
    'no-promise-executor-return': 'error',
    'no-proto': 'error',
    // cspell:disable-next-line
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-return-assign': ['error', 'always'],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': ['error', { allowInParentheses: true }],
    'no-shadow': [
      'error',
      {
        builtinGlobals: true,
        hoist: 'functions',
        allow: ['name'],
        ignoreOnInitialization: false,
      },
    ],
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable-loop': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        enforceForJSX: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'no-useless-call': 'error',
    'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
    'no-useless-concat': 'error',
    'no-useless-rename': [
      'error',
      { ignoreImport: false, ignoreExport: false, ignoreDestructuring: false },
    ],
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-warning-comments': [
      'error',
      { location: 'anywhere', terms: ['fixme'] },
    ],
    'object-shorthand': ['error', 'properties'],
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],
    'prefer-const': [
      'error',
      { destructuring: 'any', ignoreReadBeforeAssign: false },
    ],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-named-capture-group': 'error',
    'prefer-object-has-own': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': [
      'error',
      'as-needed',
      { keywords: false, numbers: true, unnecessary: true },
    ],
    radix: ['error', 'always'],
    'require-atomic-updates': ['error', { allowProperties: false }],
    'require-await': 'error',
    strict: ['error', 'safe'],
    'symbol-description': 'error',
    'vars-on-top': 'error',
    yoda: ['error', 'never', { exceptRange: false, onlyEquality: false }],
    // FORMATJS PLUGIN
    'formatjs/enforce-default-message': ['error', 'literal'],
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
    // IMPORT PLUGIN
    'import/first': 'error',
    'import/newline-after-import': [
      'error',
      { considerComments: true, count: 1 },
    ],
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-deprecated': 'warn',
    'import/no-duplicates': [
      'error',
      { considerQueryString: true, 'prefer-inline': true },
    ],
    'import/no-empty-named-blocks': 'error',
    'import/no-import-module-exports': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      { alphabetize: { order: 'asc', caseInsensitive: true } },
    ],
    // JSX A11Y PLUGIN
    'jsx-a11y/control-has-associated-label': 'warn',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/prefer-tag-over-role': 'warn',
    // REACT PLUGIN
    'react/boolean-prop-naming': [
      'warn',
      {
        propTypeNames: ['bool'],
        rule: '^(is|has|hide|show)[A-Z]([A-Za-z0-9]?)+',
        message:
          'It is better if your prop ({{ propName }}) matches this pattern: ({{ pattern }})',
        validateNested: true,
      },
    ],
    'react/button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
    'react/default-props-match-prop-types': [
      'error',
      { allowRequiredDefaults: false },
    ],
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: false, destructureInSignature: 'ignore' },
    ],
    'react/forbid-prop-types': ['error', { allowInPropTypes: true }],
    'react/hook-use-state': ['error', { allowDestructuredState: false }],
    'react/iframe-missing-sandbox': 'warn',
    'react/jsx-child-element-spacing': 'warn',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
      'warn',
      { children: 'ignore', propElementValues: 'always', props: 'never' },
    ],
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-filename-extension': [
      'error',
      { allow: 'as-needed', extensions: ['.jsx'] },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: false,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-leaked-render': [
      'error',
      { validStrategies: ['ternary', 'coerce'] },
    ],
    'react/jsx-no-literals': [
      'warn',
      {
        allowedStrings: ['button', 'reset', 'submit'],
        ignoreProps: false,
        noAttributeStrings: true,
        noStrings: true,
      },
    ],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowLeadingUnderscore: false,
        allowNamespace: false,
      },
    ],
    // cspell:disable-next-line
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-danger': 'warn',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-namespace': 'error',
    'react/no-object-type-as-default-prop': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/no-unused-class-component-methods': 'error',
    'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '.mts', '.cts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['tsconfig.eslint.json', './tests/cypress/tsconfig.json'],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          node: true,
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'react/jsx-filename-extension': [
          'error',
          { allow: 'as-needed', extensions: ['.tsx'] },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-exports': [
          'error',
          { fixMixedExportsWithInlineTypeSpecifier: false },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
            disallowTypeAnnotations: true,
          },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-base-to-string': 'warn',
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true, ignoreVoidOperator: true },
        ],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': [
          'warn',
          { allowInGenericTypeArguments: true, allowAsThisParameter: false },
        ],
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
          'warn',
          {
            allowComparingNullableBooleansToTrue: true,
            allowComparingNullableBooleansToFalse: true,
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': [
          'error',
          {
            allowConstantLoopConditions: false,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
          },
        ],
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': [
          'error',
          { allowBitwiseExpressions: false },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          {
            ignoreConditionalTests: true,
            ignoreTernaryTests: true,
            ignoreMixedLogicalExpressions: true,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
          },
        ],
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': [
          'error',
          {
            allowAny: true,
            allowedPromiseNames: [],
            checkArrowFunctions: true,
            checkFunctionDeclarations: true,
            checkFunctionExpressions: true,
            checkMethodDeclarations: true,
          },
        ],
        '@typescript-eslint/require-array-sort-compare': [
          'warn',
          { ignoreStringArrays: false },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unified-signatures': [
          'warn',
          { ignoreDifferentlyNamedParameters: false },
        ],
        /**
         * Typescript extension rules -- Core rules need to be disabled.
         */
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
        'init-declarations': 'off',
        '@typescript-eslint/init-declarations': ['error', 'always'],
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        'no-invalid-this': 'off',
        '@typescript-eslint/no-invalid-this': [
          'error',
          { capIsConstructor: true },
        ],
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': [
          'error',
          {
            detectObjects: false,
            enforceConst: false,
            ignore: [-1, 0, 1, 2],
            ignoreArrayIndexes: false,
            ignoreClassFieldInitialValues: true,
            ignoreDefaultValues: true,
          },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            builtinGlobals: true,
            hoist: 'functions',
            allow: ['name'],
            ignoreOnInitialization: false,
          },
        ],
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTernary: false,
            allowTaggedTemplates: false,
            enforceForJSX: true,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: true,
            classes: true,
            variables: true,
            allowNamedExports: false,
          },
        ],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
      },
    },
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        'react/jsx-no-literals': 'off',
        'storybook/csf-component': 'warn',
        'storybook/no-stories-of': 'warn',
        'storybook/no-title-property-in-meta': 'off',
      },
    },
    {
      files: ['*.test.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'react/jsx-no-literals': 'off',
      },
    },
  ],
};
