declare module '@mediapipe/hands' {
  export interface Results {
    image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    multiHandLandmarks?: Array<Array<{ x: number; y: number; z: number }>>;
    multiHandedness?: Array<{ label: string; score: number }>;
  }

  export interface HandsOptions {
    maxNumHands?: number;
    modelComplexity?: number;
    minDetectionConfidence?: number;
    minTrackingConfidence?: number;
  }

  export class Hands {
    constructor(config?: { locateFile?: (file: string) => string });
    setOptions(options: HandsOptions): void;
    onResults(callback: (results: Results) => void): void;
    send(input: { image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement }): Promise<void>;
    close(): void;
  }
}

declare module '@mediapipe/camera_utils' {
  export class Camera {
    constructor(
      videoElement: HTMLVideoElement,
      options: {
        onFrame: () => Promise<void>;
        width?: number;
        height?: number;
      }
    );
    start(): Promise<void>;
    stop(): void;
  }
}
