import tw from "tailwind-styled-components";
const Header = tw.div`flex justify-start w-full text-3xl`;
import CreateUpdateStaffForm from "../forms/createUpdateStaffForm";
interface Props {
     idStaff?: number;
}
const CreateUpdateStaff = ({ idStaff }: Props) => {
     return (
          <div className="ml-2 flex flex-col items-center">
               <Header>
                    <h2>Thêm Mới Nhân Viên</h2>
               </Header>
               <CreateUpdateStaffForm idStaff={idStaff} />
          </div>
     );
};

export default CreateUpdateStaff;
