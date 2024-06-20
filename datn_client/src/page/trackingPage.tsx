import { TrackingBook } from "../utils/components/trackingBook";
import { useAuthContext } from "../contexts/authContext";
import { Navigate } from "react-router";
import useTrackingUser from "../hook/useTrackingUser";
import { Loading } from "../utils/components/sprin";
import { Empty } from "antd";

export const TrackingPage = () => {
     const { userLogin } = useAuthContext();
     if (!userLogin) return <Navigate to="/dang-nhap" />;

     const { tracking, isLoading } = useTrackingUser();
     console.log({ tracking });

     return (
          <>
               {isLoading ? (
                    <Loading />
               ) : (
                    <div className="w-full flex justify-center mt-6 flex-col items-center h-full">
                         <div className="h-full w-full flex justify-center">
                              {tracking ? (
                                   <TrackingBook tracking={tracking} />
                              ) : (
                                  <div className="h-full">
                                    <Empty
                                        className="flex justify-between flex-col items-center"
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                             height: 60,
                                        }}
                                        description={
                                             <span className="text-center">
                                                  Quý Khách Hàng Chưa Thực Hiện
                                                  Tiêm Chủng Tại Trung Tâm
                                             </span>
                                        }
                                   ></Empty>
                                  </div>
                              )}
                         </div>
                    </div>
               )}
          </>
     );
};
