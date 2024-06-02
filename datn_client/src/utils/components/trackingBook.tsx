import {
     Document,
     Page,
     Text,
     View,
     StyleSheet,
     PDFViewer,
     Font,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { ICustomer } from "../../models/ICustomer";
import { formatDate } from "../formatDate";
import { useMemo } from "react";
// Register Font
Font.register({
     family: "Roboto",
     format: "truetype",
     src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
// Create styles
const styles = StyleSheet.create({
     doc: {
          fontFamily: "Roboto",
     },
     page: {
          flexDirection: "column",
          backgroundColor: "#fff",
     },
     section: {
          margin: 10,
          padding: 10,
          flexDirection: "column",
     },
});
interface Props {
     tracking: ICustomer;
}
// Create Document Component
export const TrackingBook = ({ tracking }: Props) => {
     const bookings = useMemo(() => {
          const vacines = new Map();
          tracking.bookings?.forEach((bk) =>
               vacines.set(bk.vaccine.vaccineName, bk.vaccine.vaccineName)
          );
          const bookings = [];
          let iterator = vacines.entries();
          for (let [key, value] of iterator) {
               const booking = {
                    vaccine: value,
                    bookings: tracking.bookings?.filter(
                         (bk) => bk.vaccine.vaccineName === value
                    ),
               };
               bookings.push(booking);
          }
          return bookings;
     }, [tracking]);

     return (
          <PDFViewer className="w-3/4 h-screen">
               <Document language="vn" style={styles.doc}>
                    <Page size="A5" style={styles.page}>
                         <View
                              style={{
                                   border: "2",
                                   height: "90%",
                                   marginTop: 20,
                                   width: "95%",
                                   marginLeft: 10,
                              }}
                         >
                              <View style={styles.section}>
                                   <Text
                                        style={{
                                             fontWeight: "bold",
                                             textAlign: "center",
                                        }}
                                   >
                                        PHÒNG TIÊM CHỦNG VẮC XIN
                                   </Text>
                                   <Text
                                        style={{
                                             fontWeight: "demibold",
                                             textAlign: "center",
                                             marginTop: 2,
                                        }}
                                   >
                                        DỊCH VỤ ĐẠI LỘC
                                   </Text>
                              </View>
                              <View>
                                   <Text
                                        style={{
                                             fontSize: 12,
                                             textAlign: "center",
                                             fontWeight: "bold",
                                        }}
                                   >
                                        Địa chỉ: 18 Phạm Văn Đồng TT Ái Nghĩa,
                                        Đại Lộc, Quảng Nam
                                   </Text>
                                   <Text
                                        style={{
                                             fontSize: 12,
                                             textAlign: "center",
                                        }}
                                   >
                                        ĐT: 02356.257768 - 02356.257768
                                   </Text>
                              </View>
                              <View>
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginTop: 140,
                                             fontSize: 25,
                                        }}
                                   >
                                        SỔ TIÊM CHỦNG CÁ NHÂN
                                   </Text>
                              </View>
                              <View
                                   style={{
                                        position: "relative",
                                   }}
                              >
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginLeft: -65,
                                             marginTop: 30,
                                             fontSize: 14,
                                             position: "absolute",
                                             left: 150,
                                             top: -10,
                                        }}
                                   >
                                        Họ Và tên: {tracking.customerName}
                                   </Text>
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginLeft: 15,
                                             fontSize: 14,
                                             position: "absolute",
                                             left: 70,
                                             top: 50,
                                        }}
                                   >
                                        Mã định danh: {tracking.CCCD}
                                   </Text>
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginLeft: -40,
                                             fontSize: 14,
                                             position: "absolute",
                                             left: 125,
                                             top: 80,
                                        }}
                                   >
                                        Ngày sinh:
                                        {formatDate(tracking.customerDoB)}
                                   </Text>
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginLeft: -65,
                                             fontSize: 14,
                                             position: "absolute",
                                             left: 150,
                                             top: 110,
                                        }}
                                   >
                                        Địa chỉ: {tracking.ward.name}
                                   </Text>
                                   <Text
                                        style={{
                                             textAlign: "center",
                                             marginLeft: -30,
                                             fontSize: 14,
                                             position: "absolute",
                                             left: 115,
                                             top: 140,
                                        }}
                                   >
                                        Điện thoại: {tracking.phone}
                                   </Text>
                              </View>
                         </View>
                    </Page>
                    {bookings.map((bk) => (
                         <Page size="A5" style={styles.page}>
                              <View>
                                   <Text>{bk.vaccine}</Text>
                              </View>
                              <View style={styles.section}>
                                   <Table
                                        style={{
                                             textAlign: "center",
                                        }}
                                   >
                                        <TH>
                                             <TD>Lần Tiêm </TD>
                                             <TD>Ngày Tiêm</TD>
                                             <TD>Người Tiêm</TD>
                                        </TH>
                                        {bk.bookings?.map((b, index) => (
                                             <TR
                                                  style={{
                                                       textAlign: "center",
                                                  }}
                                             >
                                                  <TD
                                                       style={{
                                                            textAlign: "center",
                                                       }}
                                                  >
                                                       {index}
                                                  </TD>
                                                  <TD
                                                       style={{
                                                            textAlign: "center",
                                                       }}
                                                  >
                                                       {formatDate(
                                                            b.expectedDate
                                                       )}
                                                  </TD>
                                                  <TD
                                                       style={{
                                                            textAlign: "center",
                                                       }}
                                                  >
                                                       Hau
                                                  </TD>
                                             </TR>
                                        ))}
                                   </Table>
                              </View>
                         </Page>
                    ))}
               </Document>
          </PDFViewer>
     );
};
