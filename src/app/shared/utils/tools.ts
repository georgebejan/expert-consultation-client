export class Tools {

  /**
   * Gets a property safely or the default value if provided.
   */
  static safeGet<T>(getter: () => T, defaultValue?: T): T {
    try {
      const value: T = getter();
      return (value === null || value === undefined) ? defaultValue : value;
    } catch (e) {
      return defaultValue;
    }
  }

  static loadArgonJs() {
    const node = document.createElement('script');
    node.src = 'assets/argon/js/argon.js';
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }
}
