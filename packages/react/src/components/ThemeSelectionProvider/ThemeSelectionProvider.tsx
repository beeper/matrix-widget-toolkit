/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  extractWidgetApiParameters,
  extractWidgetParameters,
  parseWidgetId,
} from '@beeper/matrix-widget-toolkit-api';
import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext, useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Themes with different color schemes, either `light` or `dark`.
 */
export type Theme = 'light' | 'dark' | string;

/**
 * Return value of the {@link useThemeSelection} hook.
 */
export type ThemeSelectionContextType = {
  /**
   * The current color scheme.
   */
  theme: Theme;
  /**
   * Whether the widget is displayed in a modal.
   *
   * @remarks Modals have different background colors which the theme needs to
   * take into account.
   */
  isModal: boolean;
  /**
   * Select the current color scheme.
   *
   * @param theme - The new color scheme.
   */
  setTheme: (theme: Theme) => void;
};

export const ThemeSelectionContext = createContext<
  ThemeSelectionContextType | undefined
>(undefined);

/**
 * Hook for accessing the current theme selection.
 * @returns The current theme selection.
 */
export const useThemeSelection = (): ThemeSelectionContextType => {
  const context = useContext(ThemeSelectionContext);

  if (context === undefined) {
    throw new Error(
      'useThemeSelection must be used within a ThemeSelectionProvider'
    );
  }

  return context;
};

/**
 * Props for the {@link ThemeSelectionProvider} component.
 */
// {} usage is safe here, see https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
// eslint-disable-next-line @typescript-eslint/ban-types
export type ThemeSelectionProviderProps = PropsWithChildren<{}>;

/**
 * Provides the current theme selection to child components.
 * Use the {@link useThemeSelection} hook to access it.
 * @param param0 - {@link ThemeSelectionProviderProps}
 */
export function ThemeSelectionProvider({
  children,
}: ThemeSelectionProviderProps): ReactElement {

  const [state, setState] = useState<{ theme: Theme | null; isModal: boolean | null }>({
    theme: null,
    isModal: null,
  });

  // useEffect is needed to make this run entirely client-side. Otherwise, NextJS will run it one time server-side before the widget runs this again, which causes the widget to show "Loading" indefinitely.
  useEffect(() => {
    let widgetId = '';
    try {
      ({ widgetId } = extractWidgetApiParameters());
    } catch (e) {
      // ignore
    }

    const { isModal } = parseWidgetId(widgetId);
    const { theme } = extractWidgetParameters();

    if (theme) {
      setState({ theme, isModal });
    } else {
      const prefersColorSchemeDark =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;

      setState({ theme: prefersColorSchemeDark ? 'dark' : 'light', isModal });
    }
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setState((old) => ({ ...old, theme }));
  }, []);

  const context = useMemo(
      () => ({
        ...state,
        setTheme,
      }),
      [state, setTheme]
  );

  return (
    <ThemeSelectionContext.Provider value={context}>
      {children}
    </ThemeSelectionContext.Provider>
  );
}
