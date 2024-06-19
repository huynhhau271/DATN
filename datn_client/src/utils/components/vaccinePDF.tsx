import {
     Page,
     Text,
     View,
     Document,
     StyleSheet,
     Image,
     Font,
} from "@react-pdf/renderer";
import robotoRegular from "/fonts/Roboto-Regular.ttf";
import robotoBold from "/fonts/Roboto-Bold.ttf";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

import { formatDate } from "../formatDate";
import logo from "../../assets/logo.png";
import signature from "../../assets/chu-ky.png";
import { Booking } from "../../models/IBooking";
import { convertNumberToWords } from "../converNumberToText";
Font.register({
     family: "Roboto",
     fonts: [
          { src: robotoRegular, fontWeight: "normal" },
          { src: robotoBold, fontWeight: "bold" },
     ],
});

const styles = StyleSheet.create({
     doc: {
          fontFamily: "Roboto",
     },
     page: {
          fontFamily: "Roboto",
          backgroundColor: "#FFFFFF",
          padding: 20,
     },
     title: {
          fontFamily: "Roboto",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 5,
          marginTop: 5,
          textAlign: "center",
          color: "#000", // Light red color
     },
     section: {
          marginBottom: 10,
          marginTop: 10,
     },
     table: {
          // display: 'table',
          fontFamily: "Roboto",
          width: "auto",
          borderStyle: "solid",
          borderColor: "#4B70F5",
          borderWidth: 1,
          borderRightWidth: 0,
          borderBottomWidth: 0,
     },
     tableRow: {
          fontFamily: "Roboto",
          flexDirection: "row",
     },
     tableCol: {
          fontFamily: "Roboto",
          width: "25%",
          borderStyle: "solid",
          borderColor: "#4B70F5",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderTopWidth: 0,
     },
     tableCell: {
          fontFamily: "Roboto",
          margin: 5,
          fontSize: 10,
     },
     image: {
          width: 100,
          height: 100,
          marginBottom: 10,
     },
     header: {
          fontFamily: "Roboto",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#000", // Light red color
     },
});

const VaccinePDF = ({ data }: { data: Booking }) => {
     console.log({ data });
     if (!data) {
          console.log(3333);
          return (
               <Document>
                    <Page size="A4" style={styles.page}>
                         <Text style={styles.title}>
                              Dữ liệu vaccin không đúng
                         </Text>
                    </Page>
               </Document>
          );
     }
     return (
          <Document>
               <Page size="A4" style={styles.page}>
                    <View
                         style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              borderBottom: "#000",
                              borderBottomWidth: 1,
                         }}
                    >
                         <Image
                              src={logo}
                              style={{
                                   width: 100,
                              }}
                         />
                         <View
                              style={{
                                   marginLeft: 10,
                              }}
                         >
                              <Text
                                   style={{
                                        fontWeight: "bold",
                                        fontSize: "18",
                                   }}
                              >
                                   PHÒNG TIÊM CHỦNG VẮC-XIN HUYỆN ĐẠI LỘC
                              </Text>
                              <View
                                   style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        fontSize: 16,
                                   }}
                              >
                                   <Text
                                        style={{
                                             fontWeight: "bold",
                                        }}
                                   >
                                        Địa chỉ:
                                   </Text>
                                   <Text>
                                        18 Phạm Văn Đồng - TT. Ái Nghĩa - Đại
                                        Lộc - Quảng Nam
                                   </Text>
                              </View>
                              <View
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                   }}
                              >
                                   <View
                                        style={{
                                             display: "flex",
                                             flexDirection: "row",
                                             fontSize: 16,
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  fontWeight: "bold",
                                             }}
                                        >
                                             Số điện thoại:{" "}
                                        </Text>
                                        <Text>0905.470.207</Text>
                                   </View>
                                   <View
                                        style={{
                                             display: "flex",
                                             flexDirection: "row",
                                             fontSize: 16,
                                        }}
                                   >
                                        <Text
                                             style={{
                                                  fontWeight: "bold",
                                             }}
                                        >
                                             Mã số thuế:{" "}
                                        </Text>
                                        <Text>8341024573-001</Text>
                                   </View>
                              </View>
                         </View>
                    </View>
                    <Text style={styles.title}>HÓA ĐƠN THANH TOÁN </Text>
                    <Text
                         style={{
                              textAlign: "center",
                              fontSize: "12",
                         }}
                    >
                         (Ngày {formatDate(new Date()).split("-")[0]} Tháng{" "}
                         {formatDate(new Date()).split("-")[1]} Năm{" "}
                         {formatDate(new Date()).split("-")[2]})
                    </Text>
                    <View style={styles.section}>
                         <Text style={styles.header}>Thông Tin Khách Hàng</Text>
                         <Text>
                              Họ và tên khách hàng: {data.customer.parentsName}
                         </Text>
                         <Text>
                              Địa chỉ:{" "}
                              {`${data.customer.address} - ${data.customer.ward.name} - ${data.customer.ward.district.name} -  ${data.customer.ward.district.province.name}  `}
                         </Text>

                         <View
                              style={{
                                   flexDirection: "row",
                                   gap: 40,
                              }}
                         >
                              <Text>Số điện thoại: {data.customer.phone}</Text>
                              <Text>Email: {data.customer.email}</Text>
                         </View>
                    </View>
                    <Table>
                         <TH>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   Loại vắc xin
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   Đơn vị tính
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   Số lượng
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   Đơn giá
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   Thành tiền
                              </TD>
                         </TH>
                         <TR>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   {data.vaccine.vaccineName}
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   lọ
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                   }}
                              >
                                   1
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   {data.vaccine.price.toLocaleString("vi-VN", {
                                        currency: "VND",
                                   })}
                              </TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   {data.vaccine.price.toLocaleString("vi-VN", {
                                        currency: "VND",
                                   })}
                              </TD>
                         </TR>
                         <TR style={{ height: 30 }}>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                         </TR>
                         <TR style={{ height: 30 }}>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                         </TR>
                         <TR>
                              <TD>Cộng tiền hàng</TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   {data.vaccine.price.toLocaleString("vi-VN", {
                                        currency: "VND",
                                   })}
                              </TD>
                         </TR>
                         <TR>
                              <TD>Tiền thuế GTGT (VAT)</TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   0
                              </TD>
                         </TR>
                         <TR style={{}}>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        height: 40,
                                   }}
                              >
                                   Tổng tiền
                              </TD>
                              <TD></TD>
                              <TD></TD>
                              <TD></TD>
                              <TD
                                   style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   {data.vaccine.price.toLocaleString("vi-VN", {
                                        currency: "VND",
                                   })}
                              </TD>
                         </TR>
                    </Table>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                         <Text style={{ fontWeight: "bold" }}>
                              Số tiền bằng chữ:{" "}
                         </Text>
                         <Text>{convertNumberToWords(data.vaccine.price)}</Text>
                    </View>
                    <View
                         style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginLeft: 40,
                         }}
                    >
                         <View
                              style={{
                                   marginTop: 25,
                                   flexDirection: "column",
                                   alignItems: "center",
                              }}
                         >
                              <View
                                   style={{
                                        alignItems: "center",
                                        marginTop: 10,
                                   }}
                              >
                                   <Text
                                        style={{
                                             fontWeight: "bold",
                                        }}
                                   >
                                        Người Mua Hàng
                                   </Text>
                                   <Text
                                        style={{
                                             fontSize: "12",
                                        }}
                                   >
                                        (Ký ghi rõ họ tên)
                                   </Text>
                                   {data.customer && (
                                        <>
                                             <Text
                                                  style={{
                                                       fontWeight: "bold",
                                                       marginTop: 91,
                                                  }}
                                             >
                                                  {data.customer.parentsName}
                                             </Text>
                                        </>
                                   )}
                              </View>
                         </View>
                         <View
                              style={{
                                   marginTop: 5,
                                   flexDirection: "column",
                                   alignItems: "center",
                              }}
                         >
                              <Text>
                                   Đại Lộc , Ngày{" "}
                                   {formatDate(new Date()).split("-")[0]} Tháng{" "}
                                   {formatDate(new Date()).split("-")[1]} Năm{" "}
                                   {formatDate(new Date()).split("-")[2]}
                              </Text>
                              <View
                                   style={{
                                        alignItems: "center",
                                        marginTop: 10,
                                   }}
                              >
                                   <Text
                                        style={{
                                             fontWeight: "bold",
                                        }}
                                   >
                                        Người Bán Hàng
                                   </Text>
                                   <Text
                                        style={{
                                             fontSize: "12",
                                        }}
                                   >
                                        (Ký ghi rõ họ tên)
                                   </Text>
                                   {data.nurseStaff && (
                                        <>
                                             <Image
                                                  src={signature}
                                                  style={{
                                                       width: 160,
                                                  }}
                                             />
                                             <Text
                                                  style={{
                                                       fontWeight: "bold",
                                                  }}
                                             >
                                                  {data.nurseStaff.fullName}
                                             </Text>
                                        </>
                                   )}
                              </View>
                         </View>
                    </View>
               </Page>
          </Document>
     );
};

export default VaccinePDF;
