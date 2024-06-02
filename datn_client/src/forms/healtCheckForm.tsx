import { Button, Form, Radio, Typography } from "antd";
import { useEffect, useState } from "react";
import { healtSheetService } from "../services/healtSheetService";
import { toast } from "react-toastify";
import { StatusBooking } from "../utils/statusBooking";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     refetch: () => void;
     bookingId: number;
}
const HealtCheckForm = ({ setOpen, refetch, bookingId }: Props) => {
     const [form] = Form.useForm();
     const onFinish = (value: any) => {
          let status: string;
          if (Object.values(value).includes(false))
               status = StatusBooking.NO_INJECTIONS;
          else status = StatusBooking.BE_INJECTED;
          healtSheetService
               .physicalExamination({
                    ...value,
                    bookingId: bookingId,
                    status: status,
               })
               .then(() => {
                    setOpen(false);
                    refetch();
                    toast.success(
                         status === StatusBooking.BE_INJECTED
                              ? "Trẻ Đủ Điều Kiện Tiêm Chủng"
                              : "Trẻ Không Đủ Sức Khỏe Tiêm Chủng"
                    );
               })
               .catch(() => {
                    toast.error("Cập Nhật Thông Tin Sức Khỏe Thất Bại");
               });
     };

     useEffect(() => {
          form.resetFields();
     }, []);
     return (
          <div className="mt-2">
               <Form
                    scrollToFirstError
                    layout="horizontal"
                    labelCol={{ flex: "550px" }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    form={form}
                    name="control-hooks"
                    className="w-full"
                    onFinish={onFinish}
                    autoComplete="off"
               >
                    <Form.Item
                         name="anaphylaxisLevel3"
                         label="Phản vệ độ III trở lên sau lần tiêm chủng trước (vắc xin có cùng thành phần)"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="anaphylaxisLevel2"
                         label="Phản vệ độ II trở lên sau lần tiêm chủng trước (vắc xin có cùng thành phần)"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="acuteOrChronicIllness"
                         label="Đang mắc bệnh cấp tính hoặc bệnh mãn tính tiến triển"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="feverOrHypothermia"
                         label="Sốt/Hạ thân nhiệt(sốt:nhiệt độ >= 38 độ C,Hạ thân nhiệt: nhiệt độ <= 35.5 độ C"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="immunodeficiency"
                         label="Suy giảm miễn dịch chưa xác định mức độ hoặc mức độ nặng,bỏ biểu hiện lâm sàng  nghi nhiễm HIV "
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="corticoid"
                         label="Đang hoặc mới kết thúc đợt điều trị corticoid liều cao (tương đương prednison >2mg/kg/ngày ), hóa trị, xạ trị gammaglobulin"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="responseIncreasesGradually"
                         label="Phản ứng tăng dần sau các lần tiêm chủng trước (vắc xin có cùng thành phần)"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="abnormalHeart"
                         label="Nghe tim bất thường "
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="abnormalLungs"
                         label="Nhịp thở nghe phổi bất thường"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="unusualSenses"
                         label="Tri giác bất thường "
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="weight"
                         label="Cân nặng <2000g"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item
                         name="other"
                         label="Các chống chỉ định khác, nếu có ghi rõ"
                         required
                         rules={[
                              {
                                   required: true,
                                   message: "Vui Lòng Cập Nhật Thông Tin Sức Khỏe!",
                              },
                         ]}
                    >
                         <Radio.Group>
                              <Radio value={false}>Không</Radio>
                              <Radio value={true}>Có</Radio>
                         </Radio.Group>
                    </Form.Item>
                    <Form.Item className="flex justify-center mt-4">
                         <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                         >
                              OK
                         </Button>
                         <Button
                              type="default"
                              htmlType="button"
                              className="ml-3"
                              onClick={() => form.resetFields()}
                         >
                              reset
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
};
export default HealtCheckForm;
