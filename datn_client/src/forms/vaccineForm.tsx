import { Button, Form, Input, InputNumber, Space } from "antd";
import { toast } from "react-toastify";
import { IVaccine } from "../models/vaccine.model";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { vaccineService } from "../services/vaccineService";
import Uploader from "../utils/components/uploadImage/Uploader";
import { useForm } from "antd/es/form/Form";
import useGetAllDisease from "../hook/useDisease";
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
     const [form] = useForm<IVaccine>();
     const onReset = () => {
          form.resetFields();
          setFileName(undefined);
          setUploadedImage(undefined);
     };
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
                         onReset();
                         toast.success("Cập Nhật Thông Tin Vaccine Thành Công");
                    })
                    .catch((error) => {
                         if (error.response) {
                              toast.error(error.response.data.message);
                         } else
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
                         onReset();
                         toast.success("Thêm Mới Vaccine Thành Công");
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Thêm Mới Vaccine Thất Bại");
                    });
          }
     };
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
                    <div className="flex justify-between gap-10 items-center">
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
                         <Form.Item
                              label="Số lượng"
                              name="quantity"
                              required
                              // defaultValue={0}
                              rules={[
                                   {
                                        validator: (_, value) => {
                                             if (value < 0)
                                                  return Promise.reject(
                                                       "Số lượng không phù hợp"
                                                  );
                                             else return Promise.resolve();
                                        },
                                   },
                              ]}
                              className="flex-1"
                         >
                              <InputNumber<number>
                                   defaultValue={0}
                                   parser={(value) => (value ? +value : 0)}
                                   className="!w-full"
                              />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Giá Tiền (Đồng)"
                              name="price"
                              initialValue={1000}
                              required
                              className="flex-1"
                         >
                              <InputNumber<number>
                                   defaultValue={1000}
                                   formatter={(value) =>
                                        ` ${value}`.replace(
                                             /\B(?=(\d{3})+(?!\d))/g,
                                             ","
                                        )
                                   }
                                   parser={(value) =>
                                        value?.replace(
                                             /\$\s?|(,*)/g,
                                             ""
                                        ) as unknown as number
                                   }
                                   className="!w-full"
                              />
                         </Form.Item>
                         <Form.Item
                              label="Độ Tuổi (Tháng)"
                              name="mothOld"
                              required
                              initialValue={0}
                              rules={[
                                   {
                                        validator: (_, value) => {
                                             if (value < 0)
                                                  return Promise.reject(
                                                       "Độ Tuổi Không Phù Hợp"
                                                  );
                                             else return Promise.resolve();
                                        },
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input type="number" min={0} defaultValue={0} />
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
                    <div>
                         <Form.Item
                              label="Mũi Tăng Cường"
                              name="boosterNoses"
                              initialValue={
                                   data?.boosterNoses
                                        ? data.boosterNoses
                                        : undefined
                              }
                              className="flex-1"
                         >
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
                                                                 name={[
                                                                      name,
                                                                      `noseNumber`,
                                                                 ]}
                                                                 hidden
                                                                 initialValue={
                                                                      index + 2
                                                                 }
                                                                 {...restField}
                                                            >
                                                                 <InputNumber
                                                                      value={
                                                                           index +
                                                                           2
                                                                      }
                                                                      defaultValue={
                                                                           index +
                                                                           2
                                                                      }
                                                                 />
                                                            </Form.Item>
                                                            <Form.Item
                                                                 {...restField}
                                                                 name={[
                                                                      name,
                                                                      `distance`,
                                                                 ]}
                                                                 initialValue={
                                                                      1
                                                                 }
                                                                 label={`Khoảng Thời Gian Sau Mũi ${
                                                                      index + 1
                                                                 }`}
                                                                 className="!ml-7"
                                                            >
                                                                 <InputNumber
                                                                      className="!w-full"
                                                                      placeholder="Nhập Số Tháng"
                                                                      min={1}
                                                                      defaultValue={
                                                                           1
                                                                      }
                                                                 />
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
                                                       onClick={() => add()}
                                                       block
                                                       icon={<PlusOutlined />}
                                                  >
                                                       Add field
                                                  </Button>
                                             </Form.Item>
                                        </div>
                                   )}
                              </Form.List>
                         </Form.Item>
                    </div>
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

