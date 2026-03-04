import { HouseData } from "@/builders/types/houses";
import Swal from "sweetalert2";

export function showHouseDetailsAlert(
  houseData: HouseData,
  onCloseAlert: () => void
) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#22c55e"; // green-500
      case "suspended":
        return "#ef4444"; // red-500
      case "inactive":
        return "#f59e0b"; // amber-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "✅";
      case "suspended":
        return "⛔";
      case "inactive":
        return "⏸️";
      default:
        return "❓";
    }
  };

  Swal.fire({
    html: `
      <div style="text-align: left;  margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px; color: white;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
              🏠
            </div>
            <div>
              <h3 style="margin: 0; font-size: 20px; font-weight: 600;"> House No: ${
                houseData.houseNumber
              }</h3>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;"> Street: ${
                houseData.streetName
              }</p>
            </div>
          </div>
        </div>
        
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">House Details</h4>
          
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="color: #6b7280; font-size: 14px;">Occupant:</span>
              <span style="color: #1f2937; font-weight: 500; font-size: 14px;"> ${
                houseData.occupantName
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="color: #6b7280; font-size: 14px;">House Type:</span>
              <span style="color: #1f2937; font-weight: 500; font-size: 14px; text-transform: capitalize;">${
                houseData.houseType.name
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="color: #6b7280; font-size: 14px;">Occupants:</span>
              <span style="color: #1f2937; font-weight: 500; font-size: 14px;">${
                houseData.noOfOccupants
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="color: #6b7280; font-size: 14px;">Validity:</span>
              <span style="color: #1f2937; font-weight: 500; font-size: 14px;">${
                houseData.validityPeriod
              }</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
              <span style="color: #6b7280; font-size: 14px;">Status:</span>
              <span style="display: flex; align-items: center; gap: 6px; color: ${getStatusColor(
                houseData.status
              )}; font-weight: 500; font-size: 14px;">
                ${getStatusIcon(houseData.status)} ${houseData.status}
              </span>
            </div>
          </div>
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 8px; padding: 12px; text-align: center;">
          <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">
            House code is valid and confirmed
          </p>
        </div>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Close & Validate Another",
    confirmButtonColor: "var(--primary-button-normal)",
    width: "500px",
    padding: "20px",
    customClass: {
      popup: "swal2-popup-custom",
      title: "swal2-title-custom",
      htmlContainer: "swal2-html-container-custom",
    },
    focusConfirm: true,
    preConfirm: () => {
      onCloseAlert();
      return true;
    },
  });
}
