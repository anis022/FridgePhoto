import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Camera, Folder, Upload } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { useFileInput } from "@/components/ui/use-file-input";
import { cn } from "@/lib/utils";
const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};
// const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
//   useFileInput({
//     maxSize: 2,
//   });

// return (
//   <div className="space-y-4">
//     <h3 className="text-lg font-medium">Basic File Upload</h3>
//     <div className="flex gap-4 items-center">
//       <Button onClick={() => fileInputRef.current?.click()} variant="outline">
//         Select File
//       </Button>
//       {fileName && (
//         <Button onClick={clearFile} variant="ghost" size="sm">
//           Clear
//         </Button>
//       )}
//     </div>

//     <input
//       type="file"
//       className="hidden"
//       ref={fileInputRef}
//       onChange={handleFileSelect}
//     />

//     {fileName && (
//       <p className="text-sm text-muted-foreground">Selected: {fileName}</p>
//     )}
//     {error && <p className="text-sm text-red-500">Error: {error}</p>}
//   </div>
// );

// const handleImageUpload = () => {
//   const handleImageUpload = async (event: any) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//         mode: "cors",
//       });
//       // Handle the enhanced image response here
//       console.log("Enhanced image:", response.formData);
//       // Update state or display the enhanced image
//     } catch (error) {
//       console.error("Error enhancing image:", error);
//     }
//   };
// };

function Analyse() {
  return (
    <>
      <AnimatedGroup variants={transitionVariants}>
        <section className="py-16 md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                It's time to get cookin'
              </h2>
              <p className="mt-4">
                Please provide us with a photo of your fridge so we can start
                our analysis.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Camera className="size-6" aria-hidden />
                  <span>Take a photo</span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  //onChange={handleImageUpload}
                >
                  <Folder className="size-6" aria-hidden />
                  <span>Upload a photo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedGroup>
    </>
  );
}

export default Analyse;

// export function BasicExample() {
//   export function ImageUploader() {
//     const {
//       fileName,
//       error,
//       fileInputRef,
//       handleFileSelect,
//       fileSize,
//       clearFile,
//     } = useFileInput({
//       accept: "image/*",
//       maxSize: 5,
//     });

//     return (
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium">Image Upload</h3>
//         <div className="flex gap-4 items-center">
//           <Button
//             onClick={() => fileInputRef.current?.click()}
//             variant="outline"
//           >
//             Select Image
//           </Button>
//           {fileName && (
//             <Button onClick={clearFile} variant="ghost" size="sm">
//               Clear
//             </Button>
//           )}
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleFileSelect}
//         />

//         {fileName && (
//           <div className="space-y-1">
//             <p className="text-sm text-muted-foreground">
//               Selected: {fileName}
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Size: {(fileSize / (1024 * 1024)).toFixed(2)}MB
//             </p>
//           </div>
//         )}
//         {error && <p className="text-sm text-red-500">Error: {error}</p>}
//       </div>
//     );
//   }

//   export function DocumentUploader() {
//     const { fileName, error, fileInputRef, handleFileSelect, clearFile } =
//       useFileInput({
//         accept: ".pdf,.doc,.docx",
//         maxSize: 10,
//       });

//     return (
//       <div className="space-y-4">
//         <h3 className="text-lg font-medium">Document Upload</h3>
//         <div
//           className={cn(
//             "border-2 border-dashed rounded-lg p-8 text-center",
//             "hover:border-brand/50 transition-colors cursor-pointer",
//             error && "border-red-500"
//           )}
//           onClick={() => fileInputRef.current?.click()}
//         >
//           {fileName ? (
//             <div className="space-y-2">
//               <p className="text-sm font-medium">{fileName}</p>
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   clearFile();
//                 }}
//                 variant="ghost"
//                 size="sm"
//               >
//                 Remove
//               </Button>
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               Click to upload or drag and drop
//               <br />
//               PDF, DOC up to 10MB
//             </p>
//           )}
//         </div>

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleFileSelect}
//         />

//         {error && <p className="text-sm text-red-500">Error: {error}</p>}
//       </div>
//     );
//   }
// }
