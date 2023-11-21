import {
  type ReactNode,
  useCallback,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from 'react';
import {
  useBoolean,
  useOnClickOutside,
  useOnRouteChange,
  type useOnClickOutsideHandler,
  useTimeout,
} from '../../../../utils/hooks';
import {
  Checkbox,
  Heading,
  Icon,
  type IconShape,
  Label,
  Overlay,
  Flip,
  FlipSide,
  type ListItemProps,
  ListItem,
} from '../../../atoms';
import { Modal } from '../../../molecules';
import styles from './navbar-item.module.scss';

export type NavbarItemActivationHandler = (isActive: boolean) => void;

export type NavbarItemProps = Omit<
  ListItemProps,
  'children' | 'hideMarker' | 'id'
> & {
  /**
   * Add a delay (in ms) before triggering the `onActivation` handler.
   */
  activationHandlerDelay?: number;
  /**
   * The modal contents.
   */
  children: ReactNode;
  /**
   * An icon to illustrate the nav item.
   */
  icon: IconShape;
  /**
   * The item id.
   */
  id: string;
  /**
   * An accessible name for the nav item.
   */
  label: string;
  /**
   * The modal heading.
   */
  modalHeading?: string;
  /**
   * Make the modal always visible from the given breakpoint.
   */
  modalVisibleFrom?: 'sm' | 'md';
  /**
   * A callback function to handle item activation.
   */
  onActivation?: NavbarItemActivationHandler;
  /**
   * Should we add the icon on the modal?
   *
   * @default false
   */
  showIconOnModal?: boolean;
};

const NavbarItemWithRef: ForwardRefRenderFunction<
  HTMLLIElement,
  NavbarItemProps
> = (
  {
    activationHandlerDelay,
    children,
    className = '',
    icon,
    id,
    label,
    modalHeading,
    modalVisibleFrom,
    onActivation,
    showIconOnModal = false,
    ...props
  },
  ref
) => {
  const itemClass = [
    styles.item,
    modalVisibleFrom
      ? styles[`item--hidden-controller-${modalVisibleFrom}`]
      : '',
    className,
  ].join(' ');
  const { deactivate, state: isActive, toggle } = useBoolean(false);
  const labelRef = useRef<HTMLLabelElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const deactivateItem: useOnClickOutsideHandler = useCallback(
    (e) => {
      const isCheckbox =
        e.target && checkboxRef.current?.contains(e.target as Node);
      const isLabel = e.target && labelRef.current?.contains(e.target as Node);

      if (!isCheckbox && !isLabel) deactivate();
    },
    [deactivate]
  );
  const modalRef = useOnClickOutside<HTMLDivElement>(deactivateItem);

  useOnRouteChange(deactivate, 'end');

  const handleActivation = useCallback(() => {
    if (onActivation) onActivation(isActive);
  }, [isActive, onActivation]);

  useTimeout(handleActivation, activationHandlerDelay);

  return (
    <ListItem {...props} className={itemClass} hideMarker ref={ref}>
      <Checkbox
        className={styles.checkbox}
        id={id}
        isChecked={isActive}
        name={id}
        onChange={toggle}
        ref={checkboxRef}
        value={id}
      />
      <Label
        aria-label={label}
        className={styles.label}
        htmlFor={id}
        ref={labelRef}
      >
        {icon === 'hamburger' ? (
          <Icon
            aria-hidden
            className={styles[`icon--${icon}`]}
            shape={icon}
            // eslint-disable-next-line react/jsx-no-literals
            size="lg"
          />
        ) : (
          <Flip aria-hidden className={styles.flip} showBack={isActive}>
            <FlipSide className={styles.flip__side}>
              <Icon
                shape={icon}
                // eslint-disable-next-line react/jsx-no-literals
                size="lg"
              />
            </FlipSide>
            <FlipSide className={styles.flip__side} isBack>
              <Icon
                // eslint-disable-next-line react/jsx-no-literals
                shape="cross"
              />
            </FlipSide>
          </Flip>
        )}
      </Label>
      <Overlay className={styles.overlay} isVisible={isActive}>
        <Modal
          className={styles.modal}
          heading={
            modalHeading ? (
              <Heading isFake level={3}>
                {modalHeading}
              </Heading>
            ) : null
          }
          icon={showIconOnModal ? <Icon shape={icon} /> : null}
          ref={modalRef}
        >
          {children}
        </Modal>
      </Overlay>
    </ListItem>
  );
};

export const NavbarItem = forwardRef(NavbarItemWithRef);
