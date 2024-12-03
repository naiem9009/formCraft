declare module 'next-themes' {
    import * as React from 'react';
  
    export interface ThemeProviderProps {
      forcedTheme?: string;
      enableSystem?: boolean;
      disableTransitionOnChange?: boolean;
      enableColorScheme?: boolean;
      storageKey?: string;
      themes?: string[];
      defaultTheme?: string;
      attribute?: string;
      children?: React.ReactNode;
    }
  
    export const ThemeProvider: React.FC<ThemeProviderProps>;
    export function useTheme(): {
      theme: string;
      setTheme: (theme: string) => void;
      resolvedTheme: string;
    };
  }
  