import { useCallback, useEffect } from 'react';
import { fromKebabCaseToCamelCase } from '../helpers';

export type useAttributesProps = {
  /**
   * An HTML element.
   */
  element?: HTMLElement;
  /**
   * A node list of HTML Element.
   */
  elements?: NodeListOf<HTMLElement> | HTMLElement[];
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
export const useAttributes = ({
  element,
  elements,
  attribute,
  value,
}: useAttributesProps) => {
  const setAttribute = useCallback(
    (el: HTMLElement) => {
      if (attribute.startsWith('data')) {
        el.setAttribute(attribute, value);
      } else {
        const camelCaseAttribute = fromKebabCaseToCamelCase(attribute);
        el.dataset[camelCaseAttribute] = value;
      }
    },
    [attribute, value]
  );

  useEffect(() => {
    if (element) setAttribute(element);
    if (elements && elements.length > 0) elements.forEach(setAttribute);
  }, [element, elements, setAttribute]);
};
