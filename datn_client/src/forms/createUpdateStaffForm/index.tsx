import { Button, Form, Upload, message } from "antd";
import { staffDefaultValue } from "./defaultValue";
import { RcFile, UploadFile } from "antd/es/upload";
const layout = {
     labelCol: { span: 8 },
     wrapperCol: { span: 16 },
};
const tailLayout = {
     wrapperCol: { offset: 8, span: 16 },
};
interface Props {
     idStaff?: number;
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
     const reader = new FileReader();
     reader.addEventListener("load", () => callback(reader.result as string));
     reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
     if (!isJpgOrPng) {
          message.error("You can only upload JPG/PNG file!");
     }
     const isLt2M = file.size / 1024 / 1024 < 2;
     if (!isLt2M) {
          message.error("Image must smaller than 2MB!");
     }
     return isJpgOrPng && isLt2M;
};
const CreateUpdateStaffForm = ({ idStaff }: Props) => {
     const [form] = Form.useForm();

     const onFinish = () => {};

     const onReset = () => {
          form.resetFields();
     };

     const onFill = () => {
          form.setFieldsValue(staffDefaultValue);
     };

     const onPreview = async (file: UploadFile) => {
          let src = file.url as string;
          if (!src) {
               src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj as RcFile);
                    reader.onload = () => resolve(reader.result as string);
               });
          }
          const image = new Image();
          image.src = src;
          const imgWindow = window.open(src);
          imgWindow?.document.write(image.outerHTML);
     };
     return (
          <div className="mt-2">
               <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
               >
                    <Form.Item>
                         <Upload
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                              onPreview={onPreview}
                         />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                         <Button type="primary" htmlType="submit">
                              Submit
                         </Button>
                         <Button htmlType="button" onClick={onReset}>
                              Reset
                         </Button>
                         <Button type="link" htmlType="button" onClick={onFill}>
                              Fill form
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
};
export default CreateUpdateStaffForm;
