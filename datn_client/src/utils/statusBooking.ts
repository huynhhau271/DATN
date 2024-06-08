export const statusBooking = [
     { key: "UNCONFIMRED", value: "Chưa Xác Nhận" },
     { key: "CONFIRMED", value: "Đã Xác Nhận" },
     { key: "NOTIFICATION_SENT", value: "Đã Gửi Thông Báo" },
     { key: "NO_INJECTIONS", value: "Không Đạt Sức Khỏe" },
     { key: "BE_INJECTED", value: "Được Phép Tiêm" },
     { key: "INJECTED", value: "Đã Tiêm" },
];
export enum StatusBooking {
     UNCONFIMRED = "Chưa Xác Nhận",
     CONFIRMED = "Đã Xác Nhận",
     NOTIFICATION_SENT = "Đã Gửi Thông Báo",
     NO_INJECTIONS = "Không Đạt Sức Khỏe",
     BE_INJECTED = "Được Phép Tiêm",
     INJECTED = "Đã Tiêm",
}