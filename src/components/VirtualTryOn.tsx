import { useRef, useState, useEffect, useCallback } from 'react';
import type { Hands, Results } from '@mediapipe/hands';
import type { Camera } from '@mediapipe/camera_utils';
import { useTheme } from '../context/ThemeContext';
import { Camera as CameraIcon, Upload, RotateCcw, Download, FlipHorizontal } from 'lucide-react';

interface WatchOption {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
}

interface VirtualTryOnProps {
  watches: WatchOption[];
}

export default function VirtualTryOn({ watches }: VirtualTryOnProps) {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [selectedWatch, setSelectedWatch] = useState<WatchOption>(watches[0]);
  const [watchImg, setWatchImg] = useState<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<'idle' | 'camera' | 'photo'>('idle');
  const [photoResult, setPhotoResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchSize, setWatchSize] = useState(1.0);
  const [mirrored, setMirrored] = useState(true);
  const [handsInstance, setHandsInstance] = useState<Hands | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Load watch face images (PNG overlays)
  const watchFaces: Record<string, string> = {
    'seiko-presage-srpd37': 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&q=80',
    'casio-gshock-ga2100': 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=300&q=80',
    'orient-bambino-v2': 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=300&q=80',
  };

  // Load watch image when selection changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setWatchImg(img);
    img.src = watchFaces[selectedWatch.id] || selectedWatch.image;
  }, [selectedWatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (handsInstance) {
        handsInstance.close();
      }
    };
  }, [handsInstance]);

  const onResults = useCallback((results: Results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = results.image.width || 640;
    canvas.height = results.image.height || 480;

    // Clear and draw the camera/photo frame
    ctx.save();
    if (mirrored && mode === 'camera') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Draw watch on each detected hand
    if (results.multiHandLandmarks && watchImg) {
      for (const landmarks of results.multiHandLandmarks) {
        // Wrist landmark (0) and middle finger MCP (9) to determine orientation
        const wrist = landmarks[0];
        const middleMCP = landmarks[9];
        const indexMCP = landmarks[5];
        const pinkyMCP = landmarks[17];

        // Calculate wrist position in canvas coordinates
        let wristX = wrist.x * canvas.width;
        const wristY = wrist.y * canvas.height;
        let middleX = middleMCP.x * canvas.width;
        const middleY = middleMCP.y * canvas.height;
        let indexX = indexMCP.x * canvas.width;
        const indexY = indexMCP.y * canvas.height;
        let pinkyX = pinkyMCP.x * canvas.width;
        const pinkyY = pinkyMCP.y * canvas.height;

        if (mirrored && mode === 'camera') {
          wristX = canvas.width - wristX;
          middleX = canvas.width - middleX;
          indexX = canvas.width - indexX;
          pinkyX = canvas.width - pinkyX;
        }

        // Calculate the angle of the forearm
        const angle = Math.atan2(middleY - wristY, middleX - wristX);

        // Calculate wrist width using index and pinky MCP distance
        const wristWidth = Math.sqrt(
          Math.pow(pinkyX - indexX, 2) + Math.pow(pinkyY - indexY, 2)
        );

        // Watch size proportional to wrist width
        const size = wristWidth * 1.6 * watchSize;

        // Position the watch slightly above wrist (between wrist and palm)
        const watchCenterX = wristX + (middleX - wristX) * 0.15;
        const watchCenterY = wristY + (middleY - wristY) * 0.15;

        // Draw the watch
        ctx.save();
        ctx.translate(watchCenterX, watchCenterY);
        ctx.rotate(angle - Math.PI / 2);

        // Draw circular watch frame
        const radius = size / 2;
        
        // Watch case (gold bezel)
        ctx.beginPath();
        ctx.arc(0, 0, radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = '#C5A55A';
        ctx.fill();
        ctx.closePath();

        // Clip to circle for watch face
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.clip();

        // Draw watch face image
        ctx.drawImage(watchImg, -radius, -radius, size, size);

        ctx.restore();

        // Draw strap lines
        ctx.save();
        ctx.translate(watchCenterX, watchCenterY);
        ctx.rotate(angle - Math.PI / 2);
        
        const strapWidth = size * 0.45;
        const strapLength = size * 0.8;

        // Top strap
        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.roundRect(-strapWidth / 2, -radius - strapLength, strapWidth, strapLength, 4);
        ctx.fill();

        // Bottom strap  
        ctx.beginPath();
        ctx.roundRect(-strapWidth / 2, radius, strapWidth, strapLength, 4);
        ctx.fill();

        // Strap details (lines)
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
          const y1 = -radius - strapLength + (strapLength / 4) * i;
          ctx.beginPath();
          ctx.moveTo(-strapWidth / 2 + 3, y1);
          ctx.lineTo(strapWidth / 2 - 3, y1);
          ctx.stroke();

          const y2 = radius + (strapLength / 4) * i;
          ctx.beginPath();
          ctx.moveTo(-strapWidth / 2 + 3, y2);
          ctx.lineTo(strapWidth / 2 - 3, y2);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // If in photo mode, save the result
    if (mode === 'photo') {
      setPhotoResult(canvas.toDataURL('image/png'));
    }
  }, [watchImg, watchSize, mirrored, mode]);

  // Update the onResults callback when dependencies change
  useEffect(() => {
    if (handsInstance) {
      handsInstance.onResults(onResults);
    }
  }, [watchImg, watchSize, mirrored, mode, handsInstance, onResults]);

  const startCamera = async () => {
    setLoading(true);
    setMode('camera');
    setPhotoResult(null);

    try {
      if (!videoRef.current) return;

      // Lazy-load MediaPipe on first use
      let hands = handsInstance;
      if (!hands) {
        const { Hands: HandsClass } = await import('@mediapipe/hands');
        hands = new HandsClass({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });
        hands.onResults(onResults);
        setHandsInstance(hands);
      }
      const { Camera: CameraClass } = await import('@mediapipe/camera_utils');

      const cam = new CameraClass(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && hands) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });

      await cam.start();
      cameraRef.current = cam;
      setCameraActive(true);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
      setMode('idle');
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    setCameraActive(false);
    setMode('idle');
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMode('photo');

    // Stop camera if running
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
      setCameraActive(false);
    }

    // Lazy-load MediaPipe on first use
    let hands = handsInstance;
    if (!hands) {
      const { Hands: HandsClass } = await import('@mediapipe/hands');
      hands = new HandsClass({
        locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
      });
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });
      hands.onResults(onResults);
      setHandsInstance(hands);
    }
    const img = new Image();
    img.onload = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !hands) return;
      canvas.width = img.width;
      canvas.height = img.height;

      await hands.send({ image: img });
      setLoading(false);
    };
    img.src = URL.createObjectURL(file);
  };

  const downloadResult = () => {
    if (!photoResult && !canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `watchvault-tryon-${selectedWatch.id}.png`;
    link.href = photoResult || canvasRef.current!.toDataURL('image/png');
    link.click();
  };

  const captureFrame = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhotoResult(dataUrl);
    stopCamera();
    setMode('photo');
  };

  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Watch Selector */}
      <div className="mb-8">
        <h3
          className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          Select a Watch to Try On
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {watches.map((watch) => (
            <button
              key={watch.id}
              onClick={() => setSelectedWatch(watch)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedWatch.id === watch.id
                  ? 'border-gold bg-gold/10'
                  : isDark
                  ? 'border-gray-700 hover:border-gray-500 bg-dark-secondary'
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {watch.brand}
                  </p>
                  <p
                    className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {watch.name}
                  </p>
                  <p className="text-gold font-bold">${watch.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {!cameraActive ? (
          <button
            onClick={startCamera}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            <CameraIcon size={20} />
            {loading ? 'Starting Camera...' : 'Open Camera'}
          </button>
        ) : (
          <>
            <button
              onClick={captureFrame}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              <CameraIcon size={20} />
              Capture Photo
            </button>
            <button
              onClick={stopCamera}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Stop Camera
            </button>
          </>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            isDark
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          } disabled:opacity-50`}
        >
          <Upload size={20} />
          Upload Photo
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {cameraActive && (
          <button
            onClick={() => setMirrored(!mirrored)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            title="Mirror camera"
          >
            <FlipHorizontal size={20} />
          </button>
        )}

        {(photoResult || mode === 'photo') && (
          <>
            <button
              onClick={downloadResult}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
            >
              <Download size={20} />
              Download
            </button>
            <button
              onClick={() => {
                setPhotoResult(null);
                setMode('idle');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </>
        )}
      </div>

      {/* Watch Size Slider */}
      <div className="mb-6">
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          Watch Size: {Math.round(watchSize * 100)}%
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={watchSize}
          onChange={(e) => setWatchSize(parseFloat(e.target.value))}
          className="w-full max-w-xs accent-gold"
        />
      </div>

      {/* Video / Canvas Display */}
      <div
        className={`relative rounded-2xl overflow-hidden border-2 ${
          isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-100'
        }`}
        style={{ maxWidth: 720 }}
      >
        {/* Hidden video element for camera feed */}
        <video
          ref={videoRef}
          className="hidden"
          playsInline
        />

        {/* Canvas for rendering */}
        <canvas
          ref={canvasRef}
          className={`w-full ${mode === 'idle' ? 'hidden' : ''}`}
          style={{ maxHeight: '70vh' }}
        />

        {/* Photo result overlay */}
        {photoResult && mode === 'photo' && (
          <img
            src={photoResult}
            alt="Try-on result"
            className="w-full"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
          />
        )}

        {/* Idle state */}
        {mode === 'idle' && !photoResult && (
          <div className="flex flex-col items-center justify-center py-24 px-8">
            <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center mb-6">
              <CameraIcon size={40} className="text-gold" />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Virtual Watch Try-On
            </h3>
            <p className={`text-center max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Open your camera or upload a photo of your wrist to see how the watch looks on you.
              Our AI will automatically detect your wrist and place the watch perfectly.
            </p>
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white font-medium">Loading AI model...</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div
        className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-dark-secondary' : 'bg-gray-50'}`}
      >
        <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Tips for Best Results:
        </h4>
        <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>• Hold your hand with the inner wrist facing the camera</li>
          <li>• Keep your hand well-lit and against a contrasting background</li>
          <li>• Spread your fingers slightly for better detection</li>
          <li>• Adjust the watch size slider to match your preference</li>
          <li>• Use the capture button to save a photo, then download it</li>
        </ul>
      </div>
    </div>
  );
}
