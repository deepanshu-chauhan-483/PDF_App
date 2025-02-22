import { useState } from "react"
import FileUpload from "./components/FileUpload"
import QuestionForm from "./components/QuestionForm"
import Logo from './assets/image.png'
import { CiFileOn } from "react-icons/ci";

function App() {
  const [documentText, setDocumentText] = useState("")
  const [pdfName, setPdfName] = useState("")

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-12 w-24" />

        {/* File Upload with Filename */}
        <div className="flex items-center gap-4">
  {pdfName && (
    <>
      <CiFileOn className="text-green-500 w-5 h-5" /> 
      <span className="text-sm text-green-500 truncate max-w-[150px]">{pdfName}</span>
    </>
  )}
  <FileUpload setDocumentText={setDocumentText} setPdfName={setPdfName} />
</div>
      </header>

      {/* Chat UI */}
      <main className="flex-1 overflow-hidden">
        <QuestionForm documentText={documentText} />
      </main>
    </div>
  )
}

export default App