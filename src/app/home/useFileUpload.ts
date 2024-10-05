import { useState } from "react";
import { toast } from "react-toastify";
import { TOAST_CONFIG } from "./toastConfig";

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid CSV file.", TOAST_CONFIG);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected!", TOAST_CONFIG);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload/csv`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file.");
      }

      const data = await response.json();
      toast.success(
        `${data.data.message}, inserted: ${data.data.insertedCount}`,
        TOAST_CONFIG
      );
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred.";
      console.error("Upload error:", errorMessage);
      toast.error(errorMessage, TOAST_CONFIG);
    }
  };

  return { file, handleFileChange, handleUpload };
}
