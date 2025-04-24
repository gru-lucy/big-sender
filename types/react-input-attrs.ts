import 'react';

declare module 'react' {
  interface InputHTMLAttributes<T> {
    // allow selecting folders in file input
    webkitdirectory?: boolean | string;
    directory?: boolean | string;
    mozdirectory?: boolean | string;
  }
} 