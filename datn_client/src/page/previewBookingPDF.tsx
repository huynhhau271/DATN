import { PDFViewer } from "@react-pdf/renderer";
import VaccinePDF from "../utils/components/vaccinePDF";

const PDFPreview: React.FC<{ data: any }> = ({ data }) => {
     return (
          <div className="absolute top-0 right-0 left-0 bottom-0">
               <PDFViewer width="100%" height="100%">
                    <VaccinePDF data={data} />
               </PDFViewer>
          </div>
     );
};

export default PDFPreview;
