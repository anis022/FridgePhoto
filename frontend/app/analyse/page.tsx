"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Import Image to use for background
import { Button } from "@/components/ui/button";
import { Book, Camera, Folder } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Webcam from "react-webcam";
import Link from "next/link";

// Converts a base64 image string to a Blob
const base64ToBlob = (base64: string) => {
  const parts = base64.split(",");
  const byteString = atob(parts[1]);
  const mimeString = parts[0].match(/:(.*?);/)![1];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

function MobileCamera({
  onCapture,
}: {
  onCapture: (data: Blob | string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  );

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 640 }, height: { ideal: 480 } },
        });
        activeStream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => videoRef.current?.play();
        }
      } catch (error) {
        console.error("Error accessing mobile camera:", error);
      }
    };
    startCamera();
    return () => {
      if (activeStream)
        activeStream.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      onCapture(imageData);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-sm rounded-2xl border border-gray-300 shadow-sm"
      />
      <div className="flex gap-3">
        <Button onClick={capturePhoto}>Capture</Button>
        <Button
          onClick={() =>
            setFacingMode((prev) =>
              prev === "environment" ? "user" : "environment"
            )
          }
          variant="secondary"
        >
          Switch
        </Button>
      </div>
    </div>
  );
}

function DesktopCamera({
  onCapture,
}: {
  onCapture: (data: Blob | string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) onCapture(imageSrc);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {showWebcam ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-2xl border shadow-sm"
          />
          <div className="flex gap-3">
            <Button onClick={capturePhoto}>Capture</Button>
            <Button onClick={() => setShowWebcam(false)} variant="ghost">
              Close
            </Button>
          </div>
        </>
      ) : (
        <Button
          onClick={() => setShowWebcam(true)}
          className="flex items-center gap-2"
        >
          <Camera className="size-5" />
          Open Webcam
        </Button>
      )}
      <Button asChild variant="outline" className="flex items-center gap-2">
        <label className="cursor-pointer">
          <Folder className="size-5" />
          Upload a photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onCapture(file);
            }}
            className="hidden"
          />
        </label>
      </Button>
    </div>
  );
}

export default function Analyse() {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleImageUpload = async (image: Blob | string) => {
    const formData = new FormData();
    if (typeof image === "string" && image.startsWith("data:")) {
      const blob = base64ToBlob(image);
      formData.append("image", blob, "captured.jpg");
    } else if (image instanceof Blob) {
      formData.append("image", image, "uploaded.jpg");
    }

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error", response.status, errorText);
        return;
      }

      const data = await response.json();

      const imageBlob = new Blob([new Uint8Array(data.image.data)], {
        type: "image/jpeg",
      });
      const imageUrl = URL.createObjectURL(imageBlob);

      localStorage.setItem(
        "fridgeResult",
        JSON.stringify({
          photo: imageUrl,
          items: data.items,
        })
      );

      setScreenshot(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCapture = (data: Blob | string) => {
    setScreenshot(typeof data === "string" ? data : URL.createObjectURL(data));
    handleImageUpload(data);
  };

  if (isMobileDevice === null) {
    return (
      <AnimatedGroup>
        <section className="py-24 text-center">
          <div className="text-lg font-medium">Loading camera...</div>
        </section>
      </AnimatedGroup>
    );
  }

  return (
    // Wrap the content in a main container with a background image
    <main className="relative min-h-screen overflow-hidden">
      {/* Background image container */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg_analyse.png"   // Ensure this file is in your public folder
          alt="Analysis Background"
          fill
          priority
          className="object-cover blur-lg brightness-75"
        />
      </div>

      <AnimatedGroup>
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              It's time to get cookin'
            </h2>
            <p className="mt-4 text-muted-foreground">
              Upload a photo of your fridge to begin analysis.
            </p>
            <div className="mt-12 flex flex-col items-center gap-6">
              {isMobileDevice ? (
                <MobileCamera onCapture={handleCapture} />
              ) : (
                <DesktopCamera onCapture={handleCapture} />
              )}
              {screenshot && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <img
                    src={screenshot}
                    alt="Captured"
                    className="max-w-sm rounded-2xl border shadow-md"
                  />
                  <Button asChild size="sm">
                    <Link href="/results" className="flex items-center gap-2">
                      <Book className="size-5" />
                      <span>Analyse Results</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedGroup>
    </main>
  );
}
