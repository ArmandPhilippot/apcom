import { useEffect } from 'react';

export type useAttributesProps = {
  /**
   * An HTML element.
   */
  element?: HTMLElement;
  /**
   * The attribute name.
   */
  attribute: string;
  /**
   * The attribute value.
   */
  value: string;
};

/**
 * Set HTML attributes to the given element or to the HTML document.
 *
 * @param props - An object with element, attribute name and value.
 */
const useAttributes = ({ element, attribute, value }: useAttributesProps) => {
  useEffect(() => {
    if (element) {
      element.dataset[attribute] = value;
    } else {
      document.documentElement.dataset[attribute] = value;
    }
  }, [attribute, element, value]);
};

export default useAttributes;
