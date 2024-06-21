import { PDFViewer } from "@react-pdf/renderer";
import VaccinePDF from "../utils/components/vaccinePDF";
import { useGetUserRole } from "../hook/useGetUserRole";
import { UserRoles } from "../utils/userRole";
import { Loading } from "../utils/components/sprin";

const PDFPreview: React.FC<{ data: any }> = ({ data }) => {
     const { staffs } = useGetUserRole(UserRoles.MANAGER);
     if (!staffs) return <Loading />;
     else
          return (
               <div className="absolute top-0 right-0 left-0 bottom-0">
                    <PDFViewer width="100%" height="100%">
                         <VaccinePDF data={data} staff={staffs[0]} />
                    </PDFViewer>
               </div>
          );
};

export default PDFPreview;
