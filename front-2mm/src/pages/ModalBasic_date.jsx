import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ModalBasic_date.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  "https://uuju.pythonanywhere.com" || "http://127.0.0.1:8000";

function ModalBasic({ setModalOpen, planID }) {
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const deletePlan = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Token ${token}` };
      const code = localStorage.getItem("code");

      // 삭제 요청 보내고 응답 처리
      const response = await axios.delete(
        `${BACKEND_URL}/group/${code}/plans/${planID}`,
        { headers }
      );

      if (response.status === 204) {
        // 삭제된 항목을 제외한 나머지를 업데이트
        setPlan((prevPlan) => prevPlan.filter((e) => e.code !== planID));

        setModalOpen(false);
        window.location.reload(); // 페이지 새로고침
      } else {
        console.error(
          "Failed to delete plan. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container} onClick={handleModalClick}>
        <img
          className={styles.delete}
          src={`${BACKEND_URL}/images/delete (3).svg`}
          alt="delete"
          onClick={deletePlan}
        />
        <img
          className={styles.cancel}
          src={`${BACKEND_URL}/images/cancel (2).svg`}
          alt="cancel"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

ModalBasic.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};

export default ModalBasic;
