import { useEffect, useRef } from 'react';

// Couldn't get this to work!!!

export default function useCustomDelay() {
  const callBackAfterDelay = (callback: () => void) => {
    console.log('inside hook');
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log('calling back...');
        callback();
        resolve();
      }, 20000),
    );
  };
  return { callBackAfterDelay };
}
