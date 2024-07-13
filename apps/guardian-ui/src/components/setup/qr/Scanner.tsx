import QrScanner from 'qr-scanner';
import React from 'react';

export type ScannerProps = {
  scanning: boolean;
  onResult: (result: string) => void;
  onError: (error: string) => void;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export const Scanner: React.FC<ScannerProps> = ({
  scanning,
  onResult,
  onError,
  ...props
}) => {
  const res = React.useRef<string | null>(null);
  const err = React.useRef<string | null>(null);
  const ref = React.useRef<HTMLVideoElement>(null);
  const scannerRef = React.useRef<QrScanner | null>(null);

  React.useEffect(() => {
    (async () => {
      if (!ref.current) return;

      if (scanning) {
        scannerRef.current = new QrScanner(
          ref.current,
          (result) => {
            if (result && res.current !== result.data) {
              res.current = result.data;
              onResult(result.data);
              if (scannerRef.current) {
                scannerRef.current.stop();
                scannerRef.current.$overlay?.remove();
              }
            }
          },
          {
            onDecodeError: (error) => {
              if (typeof error === 'string' && err.current !== error) {
                err.current = error;
                onError(error);
              } else if (
                typeof error !== 'string' &&
                err.current !== error.message
              ) {
                err.current = error.message;
                onError(error.message);
              }
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment',
          }
        );
        scannerRef.current.setInversionMode('both');
        await scannerRef.current.start();
      } else if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        res.current = null;
        err.current = null;
        scannerRef.current = null;
      }
    })();
  }, [scanning, ref, onError, onResult]);

  return (
    <video
      ref={ref}
      {...props}
      style={{ display: scanning ? 'block' : 'hidden' }}
    />
  );
};