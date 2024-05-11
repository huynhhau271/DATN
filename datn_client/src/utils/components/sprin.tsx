import { Spin } from "antd";

export const Loading = () => {
     return (
          <Spin
               tip="Loading..."
               size="large"
               className="!absolute !top-[50%]"
               indicator={
                    <div className="w-full">
                         <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
                         <div className="w-16 ml-[-20px]">Loading...</div>
                    </div>
               }
          />
     );
};
