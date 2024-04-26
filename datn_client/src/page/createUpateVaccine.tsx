import tw from "tailwind-styled-components";
const Header = tw.div`flex justify-start w-full text-3xl`;
interface Props {
  idStaff?: number;
}
const CreateUpdateSVaccine = ({ idStaff }: Props) => {
  return (
    <div className="ml-2 flex flex-col items-center">
      <Header>
        <h2>Thêm Mới Vaccine</h2>
      </Header>
      //
    </div>
  );
};

export default CreateUpdateSVaccine;

