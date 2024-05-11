import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import { IDisease } from "../models/disease.model";
import { diseaseService } from "../services/diseaseService";
import { useEffect } from "react";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     data?: IDisease;
     refetch: () => void;
}
const DiseaseForm = ({ setOpen, refetch, data }: Props) => {
     const isEdit = data !== undefined;
     const [form] = Form.useForm<IDisease>();
     const onFinish = async (value: IDisease) => {
          diseaseService
               .saveDisease(isEdit ? { ...value, id: data.id } : value)
               .then(() => {
                    toast.success(
                         isEdit
                              ? "Cập Nhật Thông Tin Bệnh Thành Công"
                              : "Thêm Bệnh Mới Thành Công"
                    );
                    refetch();
                    form.resetFields();
                    setOpen(false);
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else
                         toast.error(
                              isEdit
                                   ? "Cập Nhật Thông Tin Bênh Mới Thất Bại"
                                   : "Thêm Bệnh Mới Thất Bại"
                         );
               });
     };
     const onReset = () => {
          form.resetFields();
     };
     useEffect(() => {
          form.resetFields();
     }, []);
     return (
          <div className="mt-2">
               <Form
                    initialValues={data}
                    scrollToFirstError
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    className=""
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{ maxWidth: 800 }}
               >
                    <Form.Item
                         label="Tên Bệnh"
                         name="diseaseName"
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Nhập Tên Bệnh!",
                              },
                         ]}
                         className="flex-1"
                    >
                         <Input />
                    </Form.Item>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Triệu Chứng"
                              name="symptom"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Triệu Chứng!",
                                   },
                              ]}
                         >
                              <TextArea />
                         </Form.Item>
                         <Form.Item
                              label="Cách Phòng Tránh"
                              name="revention"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Cách Phòng Tránh!",
                                   },
                              ]}
                         >
                              <TextArea />
                         </Form.Item>
                    </div>
                    {/* <div>
                         <Form.Item
                              label="Loại Vaccine"
                              name="type"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Loại Vaccine!",
                                   },
                              ]}
                         >
                              <Select
                                   onChange={(vl) => setTypeVaccine(vl)}
                                   options={typeVaccineOption}
                              />
                         </Form.Item>
                         {typeVaccine == "goi" && (
                              <div className="flex flex-wrap">
                                   <Form.List name="boosterNoses">
                                        {(fields, { add, remove }) => (
                                             <div className="flex-1">
                                                  {fields.map(
                                                       (
                                                            {
                                                                 key,
                                                                 name,
                                                                 ...restField
                                                            },
                                                            index
                                                       ) => (
                                                            <Space
                                                                 key={key}
                                                                 style={{
                                                                      marginBottom: 8,
                                                                 }}
                                                                 align="center"
                                                            >
                                                                 <Form.Item
                                                                      {...restField}
                                                                      name={[
                                                                           name,
                                                                           `Mũi ${
                                                                                index +
                                                                                1
                                                                           }`,
                                                                      ]}
                                                                      label={`Mũi ${
                                                                           index +
                                                                           1
                                                                      }`}
                                                                      rules={[
                                                                           {
                                                                                required:
                                                                                     true,
                                                                                message: "Vui Lòng nhập số tháng!",
                                                                           },
                                                                      ]}
                                                                      className="!ml-7"
                                                                 >
                                                                      <Input placeholder="First Name" />
                                                                 </Form.Item>
                                                                 <MinusCircleOutlined
                                                                      onClick={() =>
                                                                           remove(
                                                                                name
                                                                           )
                                                                      }
                                                                 />
                                                            </Space>
                                                       )
                                                  )}
                                                  <Form.Item>
                                                       <Button
                                                            type="dashed"
                                                            onClick={() =>
                                                                 add()
                                                            }
                                                            block
                                                            icon={
                                                                 <PlusOutlined />
                                                            }
                                                       >
                                                            Add field
                                                       </Button>
                                                  </Form.Item>
                                             </div>
                                        )}
                                   </Form.List>
                              </div>
                         )}
                    </div> */}
                    <Form.Item className="flex justify-center ">
                         <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                         >
                              OK
                         </Button>
                         <Button
                              htmlType="button"
                              onClick={onReset}
                              className="ml-3"
                         >
                              Reset
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
};
export default DiseaseForm;
