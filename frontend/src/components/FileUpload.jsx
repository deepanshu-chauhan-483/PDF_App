"use client"

import { useState } from "react"
import { SlPlus } from "react-icons/sl";

function FileUpload({ setDocumentText, setPdfName }) {
  const [file, setFile] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setUploadError("Only PDF files are supported.")
        return
      }
      setFile(selectedFile)
      setPdfName(selectedFile.name) // Display filename
      setUploadError(null)
      uploadFile(selectedFile)
    }
  }

  const uploadFile = async (selectedFile) => {
    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("/api/upload/", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.text) {
        setDocumentText(data.text) // Set extracted text
        setUploadError(null)
      } else {
        setUploadError("Failed to extract text from the PDF.")
        setDocumentText("") // Reset extracted text
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Error uploading file.")
      setDocumentText("") // Reset extracted text
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* PDF Upload Button */}
      <label className="cursor-pointer">
  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <SlPlus className="w-4 h-4" /> {/* Ensuring the icon has a fixed size */}
    <span>Upload PDF</span>
  </span>
  <input type="file" className="hidden" accept=".pdf" onChange={onFileChange} />
</label>


      {/* Uploading Indicator */}
      {isUploading && <span className="text-sm text-gray-500">Extracting text...</span>}

      {/* Error Message */}
      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
    </div>
  )
}

export default FileUpload
