'use client'

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Folder } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Webcam from "react-webcam";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

function Analyse() {
  const [showWebcam, setShowWebcam] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleDesktopCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setScreenshot(imageSrc);
      handleImageUpload(imageSrc); // Pass the image to the upload handler
    }
  };

  const handleMobileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          handleImageUpload(reader.result as string); // Pass the image to the upload handler
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (image: string) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
        mode: "cors",
      });
      console.log("Enhanced image:", await response.json());
    } catch (error) {
      console.error("Error enhancing image:", error);
    }
  };

  return (
    <AnimatedGroup>
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              It's time to get cookin'
            </h2>
            <p className="mt-4">
              Please provide us with a photo of your fridge so we can start our
              analysis.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {isMobile() ? (
                // Mobile: Use file input with capture
                <Button asChild size="lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Camera className="size-6" />
                    <span>Take a photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleMobileUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              ) : (
                // Desktop: Use Webcam
                <>
                  {showWebcam ? (
                    <div className="flex flex-col items-center gap-4">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="rounded-lg border"
                      />
                      <Button onClick={handleDesktopCapture} size="lg">
                        Capture Photo
                      </Button>
                      <Button
                        onClick={() => setShowWebcam(false)}
                        variant="ghost"
                        size="sm"
                      >
                        Close Webcam
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setShowWebcam(true)} size="lg">
                      <Camera className="size-6" />
                      <span>Open Webcam</span>
                    </Button>
                  )}
                </>
              )}

              <Button asChild size="lg" variant="outline">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Folder className="size-6" aria-hidden />
                  <span>Upload a photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMobileUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>

            {screenshot && (
              <div className="mt-8">
                <h3 className="text-lg font-medium">Captured Image:</h3>
                <img
                  src={screenshot}
                  alt="Captured"
                  className="mt-4 rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </AnimatedGroup>
  );
}

export default Analyse;
