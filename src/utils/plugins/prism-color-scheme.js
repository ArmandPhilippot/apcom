(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (!Prism.plugins.toolbar) {
    console.warn('Color scheme plugin loaded before Toolbar plugin.');

    return;
  }

  /**
   *
   * @typedef {"dark" | "light" | "system"} Theme
   * @typedef {Record<"current", Theme> & Record<"dark" | "light", string>} Settings
   */

  var storage = {
    /**
     * Get a deserialized value from local storage.
     *
     * @param {string} key - The local storage key.
     * @returns {string | undefined} The value of the given key.
     */
    get: function (key) {
      var serializedItem = localStorage.getItem(key);
      return serializedItem ? JSON.parse(serializedItem) : undefined;
    },
    /**
     * Set or update a local storage key with a new serialized value.
     *
     * @param {string} key - The local storage key.
     * @param {string} value - The value of the given key.
     */
    set: function (key, value) {
      var serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    },
  };

  /**
   * Check if user has set its color scheme preference.
   *
   * @returns {boolean} True if user prefers dark color scheme.
   */
  function prefersDarkScheme() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Get the theme that matches the system theme.
   *
   * @returns {Theme} The theme to use.
   */
  function getThemeFromSystem() {
    return prefersDarkScheme() ? 'dark' : 'light';
  }

  /**
   * Check if the provided string is a valid theme.
   *
   * @param {string} theme - A theme to check.
   * @returns {boolean} True if it is a valid theme.
   */
  function isValidTheme(theme) {
    return theme === 'dark' || theme === 'light' || theme === 'system';
  }

  /**
   * Set the default theme depending on user preferences.
   *
   * @returns {Theme} The default theme.
   */
  function setDefaultTheme() {
    var theme = storage.get('prismjs-color-scheme');

    return theme && isValidTheme(theme) ? theme : 'system';
  }

  /**
   * Traverses up the DOM tree to find data attributes that override the
   * default plugin settings.
   *
   * @param {Element} startElement - An element to start from.
   * @returns {Settings} The plugin settings.
   */
  function getSettings(startElement) {
    /** @type Settings */
    var settings = {
      current: setDefaultTheme(),
      dark: 'Toggle Dark Theme',
      light: 'Toggle Light Theme',
    };
    var prefix = 'data-prismjs-color-scheme-';

    for (var key in settings) {
      var attr = prefix + key;
      var element = startElement;

      while (element && !element.hasAttribute(attr)) {
        element = element.parentElement;
      }

      if (element) {
        settings[key] = element.getAttribute(attr);
      }
    }

    return settings;
  }

  /**
   * Retrieve the new theme depending on current theme value.
   *
   * @param {Theme} currentTheme - The current theme.
   * @returns {Theme} The new theme.
   */
  function getNewTheme(currentTheme) {
    switch (currentTheme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'light';
      case 'system':
      default:
        return getNewTheme(getThemeFromSystem());
    }
  }

  /**
   * Get the button content depending on current theme.
   *
   * @param {Theme} theme - The current theme.
   * @param {Settings} settings - The plugin settings.
   * @returns {string} The button text.
   */
  function getButtonContent(theme, settings) {
    return theme === 'dark' ? settings['light'] : settings['dark'];
  }

  /**
   * Update the button text depending on the current theme.
   *
   * @param {HTMLButtonElement} button - The color scheme button.
   * @param {Settings} settings - The plugin settings.
   */
  function updateButtonText(button, settings) {
    var theme =
      settings['current'] === 'system'
        ? getThemeFromSystem()
        : settings['current'];

    button.textContent = getButtonContent(theme, settings);
  }

  /**
   * Update pre data-prismjs-color-scheme attribute.
   *
   * @param {HTMLPreElement} pre - The pre element wrapping the code.
   * @param {Theme} theme - The current theme.
   */
  function updatePreAttribute(pre, theme) {
    pre.setAttribute('data-prismjs-color-scheme-current', theme);
  }

  /**
   * Update pre attribute for all code blocks.
   *
   * @param {Theme} theme - The new theme.
   */
  function switchTheme(theme) {
    var allPre = document.querySelectorAll(
      'pre[data-prismjs-color-scheme-current]'
    );
    allPre.forEach((pre) => {
      updatePreAttribute(pre, theme);
    });
  }

  /**
   * Set current theme on pre attribute change.
   *
   * @param {HTMLPreElement} pre - The pre element wrapping the code.
   * @param {Settings} settings - The plugin settings.
   */
  function listenAttributeChange(pre, settings) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach((record) => {
        var mutatedPre = record.target;
        var button = mutatedPre.parentElement.querySelector(
          '.prism-color-scheme-button'
        );
        var newTheme = mutatedPre.getAttribute(
          'data-prismjs-color-scheme-current'
        );
        settings['current'] = newTheme;
        updateButtonText(button, settings);
      });
    });
    observer.observe(pre, {
      attributes: true,
      attributeFilter: ['data-prismjs-color-scheme-current'],
    });
  }

  /**
   * Create a color scheme button.
   *
   * @param {Object<string, any>} env - The environment variables of the hook.
   * @returns {HTMLButtonElement} The color scheme button.
   */
  function getColorSchemeButton(env) {
    var element = env.element;
    var pre = element.parentElement;
    var settings = getSettings(element);
    var themeButton = document.createElement('button');
    themeButton.className = 'prism-color-scheme-button';
    themeButton.setAttribute('type', 'button');
    updateButtonText(themeButton, settings);
    updatePreAttribute(pre, settings['current']);
    listenAttributeChange(pre, settings);

    themeButton.addEventListener('click', () => {
      var newTheme = getNewTheme(settings['current']);
      switchTheme(newTheme);
      storage.set('prismjs-color-scheme', newTheme);
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'prismjs-color-scheme') {
        var newTheme = JSON.parse(e.newValue);
        if (isValidTheme(newTheme)) updatePreAttribute(pre, newTheme);
      }
    });

    return themeButton;
  }

  /**
   * Register a new button in Prism toolbar plugin.
   */
  Prism.plugins.toolbar.registerButton('color-scheme', getColorSchemeButton);
})();
