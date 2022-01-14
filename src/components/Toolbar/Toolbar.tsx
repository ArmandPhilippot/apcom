import { ButtonToolbar } from '@components/Buttons';
import MainNav from '@components/MainNav/MainNav';
import SearchForm from '@components/SearchForm/SearchForm';
import Settings from '@components/Settings/Settings';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const searchModalRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const settingsModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNavOpened) {
      setIsSearchOpened(false);
      setIsSettingsOpened(false);
    }
  }, [isNavOpened]);

  useEffect(() => {
    if (isSearchOpened) {
      setIsNavOpened(false);
      setIsSettingsOpened(false);
    }
  }, [isSearchOpened]);

  useEffect(() => {
    if (isSettingsOpened) {
      setIsNavOpened(false);
      setIsSearchOpened(false);
    }
  }, [isSettingsOpened]);

  const isClickOutside = (
    ref: RefObject<HTMLDivElement>,
    target: EventTarget
  ) => {
    const currentRef = ref.current;
    return currentRef && !currentRef.contains(target as Node);
  };

  const isToggleBtn = (ref: RefObject<HTMLDivElement>, target: EventTarget) => {
    const currentRef = ref.current;
    return (
      currentRef &&
      currentRef.previousElementSibling &&
      currentRef.previousElementSibling.contains(target as Node)
    );
  };

  const isSearchBtn = useCallback((target: HTMLElement) => {
    return (
      target === searchBtnRef.current || searchBtnRef.current?.contains(target)
    );
  }, []);

  const isSettingsBtn = useCallback((target: HTMLElement) => {
    return (
      target === settingsBtnRef.current ||
      settingsBtnRef.current?.contains(target)
    );
  }, []);

  const handleVisibility = useCallback(
    (e: MouseEvent | FocusEvent) => {
      let ref: RefObject<HTMLDivElement> | null = null;
      if (isSearchOpened) ref = searchModalRef;
      if (isSettingsOpened) ref = settingsModalRef;

      if (!ref || !ref.current || !ref.current.id) return;
      if (!isClickOutside(ref, e.target as Node)) return;
      if (isToggleBtn(ref, e.target as Node)) return;

      if (
        ref.current.id === 'search-modal' &&
        !isSettingsBtn(e.target as HTMLElement)
      )
        setIsSearchOpened(false);
      if (
        ref.current.id === 'settings-modal' &&
        !isSearchBtn(e.target as HTMLElement)
      )
        setIsSettingsOpened(false);
    },
    [isSearchOpened, isSettingsOpened, isSearchBtn, isSettingsBtn]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleVisibility);
    document.addEventListener('focusin', handleVisibility);

    return () => {
      document.removeEventListener('mousedown', handleVisibility);
      document.removeEventListener('focusin', handleVisibility);
    };
  }, [handleVisibility]);

  const searchClasses = `${styles.menu} ${
    isSearchOpened ? styles['menu--opened'] : styles['menu--closed']
  }`;

  const settingsClasses = `${styles.menu} ${
    isSettingsOpened ? styles['menu--opened'] : styles['menu--closed']
  }`;

  return (
    <div className={styles.wrapper}>
      <MainNav isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
      <ButtonToolbar
        ref={searchBtnRef}
        type="search"
        isActivated={isSearchOpened}
        setIsActivated={setIsSearchOpened}
      />
      <div id="search-modal" className={searchClasses} ref={searchModalRef}>
        <SearchForm isOpened={isSearchOpened} />
      </div>
      <ButtonToolbar
        ref={settingsBtnRef}
        type="settings"
        isActivated={isSettingsOpened}
        setIsActivated={setIsSettingsOpened}
      />
      <div
        id="settings-modal"
        className={settingsClasses}
        ref={settingsModalRef}
      >
        <Settings />
      </div>
    </div>
  );
};

export default Toolbar;
