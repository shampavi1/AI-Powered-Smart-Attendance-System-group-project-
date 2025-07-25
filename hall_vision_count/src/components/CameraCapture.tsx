
import { useState, useRef } from "react";
import { Camera, Upload, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { CountResult } from "../pages/Index";
import { toast } from "sonner";

interface CameraCaptureProps {
  onCountComplete: (result: CountResult) => void;
  sessionName: string;
  onSessionNameChange: (name: string) => void;
}

const CameraCapture = ({ onCountComplete, sessionName, onSessionNameChange }: CameraCaptureProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("Image size should be less than 10MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateProcessing = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
  
    try {
      const blob = await (await fetch(selectedImage)).blob();
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");
  
      const response = await fetch("http://localhost:8000/count-heads/", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      const result: CountResult = {
        id: Date.now().toString(),
        imageUrl: selectedImage,
        headCount: data.headCount,
        confidence: data.confidence,
        timestamp: new Date(),
        sessionName: sessionName || undefined
      };
  
      onCountComplete(result);
      toast.success(`Detected ${result.headCount} people with ${(result.confidence * 100).toFixed(1)}% confidence`);
    } catch (error) {
      toast.error("Failed to process image");
      console.error(error);
    } finally {
      setIsProcessing(false);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <Camera className="h-5 w-5" />
          Capture Lecture Hall
        </CardTitle>
        <CardDescription>
          Upload an image of your lecture hall to count attendees
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Session Name Input */}
        <div className="space-y-2">
          {/* <Label htmlFor="session-name">Session Name (Optional)</Label> */}
          <Input
            id="session-name"
            placeholder="e.g., Aplied Science - Morning Lecture"
            value={sessionName}
            onChange={(e) => onSessionNameChange(e.target.value)}
          />
        </div>

        {/* Image Upload Area */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Selected lecture hall"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600">Image ready for processing</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">Upload Lecture Hall Image</p>
                  <p className="text-sm text-gray-500">
                    Drag and drop or click to select (max 10MB)
                  </p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
              disabled={isProcessing}
            >
              {selectedImage ? "Change Image" : "Select Image"}
            </Button>
          </div>
        </div>

        {/* Processing Info */}
        

        {/* Process Button */}
        <Button
          onClick={simulateProcessing}
          disabled={!selectedImage || isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing with YOLO...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" />
              Count Heads
            </>
          )}
        </Button>
      </CardContent>
    </div>
  );
};

export default CameraCapture;
