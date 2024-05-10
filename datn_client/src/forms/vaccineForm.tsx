import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { IVaccine } from "../models/vaccine.model";
import TextArea from "antd/es/input/TextArea";
import Uploader from "../utils/uploadImage/Uploader";
import { useEffect, useState } from "react";
import { vaccineService } from "../services/vaccineService";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     data?: IVaccine;
     refetch: () => void;
}
const VaccineForm = ({ setOpen, refetch, data }: Props) => {
     const isEdit = data !== undefined;
     const [uploadedImage, setUploadedImage] = useState<string | undefined>(
          undefined
     );
     const [fileName, setFileName] = useState<string | undefined>(undefined);
     const [form] = Form.useForm<IVaccine>();
     const onFinish = async (value: IVaccine) => {
          if (isEdit) {
               await vaccineService
                    .saveVaccine(
                         {
                              ...value,
                              id: data.id,
                         },
                         uploadedImage,
                         fileName
                    )
                    .then(() => {
                         setOpen(false);
                         refetch();
                         setUploadedImage(undefined);
                         toast.success("Cập Nhật Thông Tin Vaccine Thành Công");
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else
                              toast.error(
                                   "Cập Nhật Thông Tin Vaccine Thất Bại"
                              );
                    });
          } else {
               await vaccineService
                    .saveVaccine(value, uploadedImage, fileName)
                    .then(() => {
                         setOpen(false);
                         refetch();
                         toast.success("Thêm Mới Vaccine Thành Công");
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Thêm Mới Vaccine Thất Bại");
                    });
          }
     };
     const onReset = () => {
          form.resetFields();
     };
     useEffect(() => {
          form.resetFields();
     }, [data, setOpen]);
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
                         label="Tên Vaccine"
                         name="vaccineName"
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Nhập Tên Vaccine!",
                              },
                         ]}
                         className="flex-1"
                    >
                         <Input />
                    </Form.Item>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Giá Tiền (Đồng)"
                              name="price"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Giá Tiền !",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input type="number" />
                         </Form.Item>
                         <Form.Item
                              label="Độ Tuổi (Tháng)"
                              name="mothOld"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Độ Tuổi !",
                                   },
                                   {
                                        validator: (_, value) => {
                                             if (value < 0 || value > 216)
                                                  return Promise.reject(
                                                       "Độ Tuổi Không Phù Hợp"
                                                  );
                                             else return Promise.resolve();
                                        },
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input type="number" />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Nguồn gốc"
                              name="source"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Nguồn Gốc!",
                                   },
                              ]}
                         >
                              <TextArea />
                         </Form.Item>
                         <Form.Item
                              label="Đường Tiêm"
                              name="injectionRoute"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Đường Tiêm!",
                                   },
                              ]}
                         >
                              <TextArea />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Cảnh Báo"
                              name="warning"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Cảnh Báo!",
                                   },
                              ]}
                         >
                              <TextArea />
                         </Form.Item>
                         <Form.Item
                              label="Tác Dụng Không Mong Muốn"
                              name="unwantedEffects"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Tác Dụng Không Mong Muốn!",
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
                    <div className="flex justify-center mb-5">
                         <Uploader
                              setFileName={setFileName}
                              defaultValue={data?.picture || undefined}
                              setUploadedImage={setUploadedImage}
                              uploadedImage={uploadedImage}
                         />
                    </div>
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
export default VaccineForm;
