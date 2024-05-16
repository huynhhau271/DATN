import { useDropzone } from "react-dropzone";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import UploadAvatarImage from "./UploadImages";
import { Image } from "antd";

type UploadContainerProps = {
     dragactive: string;
};

type UserImageUploaderProps = {
     defaultValue?: string;
     readonly?: boolean;
     uploadedImage: string | undefined;
     setUploadedImage: (imageUpload: string | undefined) => void;
     setFileName: (name: string) => void;
};

const UploadImageContainer = tw.div<UploadContainerProps>`
    flex
    justify-center
    items-center
    h-40
    w-40
    cursor-pointer
    ${(p) =>
         p.dragactive === "true"
              ? "bg-primaryPrimary100 bg-opacity-50"
              : "bg-none"}
`;

const Uploader: React.FC<UserImageUploaderProps> = ({
     defaultValue,
     setUploadedImage,
     uploadedImage,
     setFileName,
}) => {
     const onDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          const reader = new FileReader();

          reader.onload = () => {
               setUploadedImage(reader.result as string);
               setFileName(file.name);
          };
          reader.readAsDataURL(file);
     };

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: {
               "image/jpeg": [".png", ".jpg", ".jpeg"],
          },
     });
     const draggative = isDragActive ? "true" : "false";

     useEffect(() => {
          if (!defaultValue) {
               setUploadedImage(undefined);
          }
     }, [defaultValue, setUploadedImage]);

     return (
          <>
               <UploadImageContainer dragactive={draggative}>
                    <div {...getRootProps()}>
                         {uploadedImage ? (
                              <div className="relative">
                                   <Image
                                        src={uploadedImage}
                                        alt="Uploaded Image"
                                        preview={false}
                                        className="h-40 w-40 object-cover"
                                   />
                              </div>
                         ) : (
                              <div className="relative">
                                   {defaultValue ? (
                                        <Image
                                             src={defaultValue}
                                             preview={false}
                                             alt="Uploaded Image"
                                             className="h-40 w-40 object-cover"
                                        />
                                   ) : (
                                        <UploadAvatarImage />
                                   )}
                              </div>
                         )}
                         <input {...getInputProps()} />
                    </div>
               </UploadImageContainer>
          </>
     );
};
export default Uploader;
