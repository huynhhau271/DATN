import { Button, Form, Input } from "antd";
// import { toast } from "react-toastify";
import { IVaccine } from "../models/vaccine.model";
import TextArea from "antd/es/input/TextArea";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     data?: IVaccine;
     refetch: () => void;
}
const VaccineForm = ({ setOpen, refetch, data }: Props) => {
     const isEdit = data !== undefined;

     const [form] = Form.useForm<IVaccine>();
     const onFinish = (value: IVaccine) => {
          console.log({ value });
     };
     const onReset = () => {
          form.resetFields();
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
                    <Form.Item className="flex justify-center">
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
