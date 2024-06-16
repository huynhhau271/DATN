import {
     Page,
     Text,
     View,
     Document,
     StyleSheet,
     Font,
} from "@react-pdf/renderer";
import robotoRegular from "/fonts/Roboto-Regular.ttf";
import robotoBold from "/fonts/Roboto-Bold.ttf";

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
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
          color: "#d9534f", // Light red color
     },
     section: {
          marginBottom: 10,
     },
     table: {
          // display: 'table',
          fontFamily: "Roboto",
          width: "auto",
          borderStyle: "solid",
          borderColor: "#d9534f",
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
          borderColor: "#d9534f",
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
          color: "#d9534f", // Light red color
     },
});

const VaccinePDF = ({ data }: { data: any }) => {
     if (!data) {
          console.log(3333)
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
                    <Text style={styles.title}>Phiếu  tiêm </Text>

                    <View style={styles.section}>
                         <Text style={styles.header}>Thông Tin Khách Hàng</Text>
                         <Text>Tên: {data.customer.customerName}</Text>
                         <Text>
                              Ngày sinh:{" "}
                              {new Date(
                                   data.customer.customerDoB
                              ).toLocaleDateString()}
                         </Text>
                         <Text>
                              Giới tính: {data.customer.gender ? "Nam" : "Nữ"}
                         </Text>
                         <Text>CMND/CCCD: {data.customer.CCCD}</Text>
                         <Text>Tên phụ huynh: {data.customer.parentsName}</Text>
                         <Text>Mối quan hệ: {data.customer.relation}</Text>
                         <Text>Số điện thoại: {data.customer.phone}</Text>
                         <Text>Email: {data.customer.email}</Text>
                         <Text>Địa chỉ: {data.customer.address}</Text>
                    </View>

                    <View style={styles.section}>
                         <Text style={styles.header}>
                              Information vaccine/ Thông Tin Vắc Xin
                         </Text>
                         <Text>Tên vắc xin: {data.vaccine.vaccineName}</Text>
                         <Text>Giá: {data.vaccine.price} VND</Text>
                         <Text>Nguồn gốc: {data.vaccine.source}</Text>
                         <Text>Đường tiêm: {data.vaccine.injectionRoute}</Text>
                         <Text>Cảnh báo: {data.vaccine.warning}</Text>
                         <Text>
                              Tác dụng phụ: {data.vaccine.unwantedEffects}
                         </Text>
                    </View>

                    <View style={styles.section}>
                         <Text style={styles.header}>Chi Tiết Hóa Đơn</Text>
                         <View style={styles.table}>
                              <View style={styles.tableRow}>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Mục
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Chi Tiết
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Số Lượng
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Giá
                                        </Text>
                                   </View>
                              </View>
                              <View style={styles.tableRow}>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Vắc Xin
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             {data.vaccine.vaccineName}
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>1</Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             {data.vaccine.price} VND
                                        </Text>
                                   </View>
                              </View>
                              <View style={styles.tableRow}>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             Tổng
                                        </Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}></Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}></Text>
                                   </View>
                                   <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                             {data.vaccine.price} VND
                                        </Text>
                                   </View>
                              </View>
                         </View>
                    </View>

                    <View style={styles.section}>
                         <Text style={styles.header}>Ghi Chú</Text>
                         <Text>
                              {data.note ? data.note : "Không có ghi chú"}
                         </Text>
                    </View>
               </Page>
          </Document>
     );
};

export default VaccinePDF;

