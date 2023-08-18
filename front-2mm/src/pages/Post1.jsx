import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ModalBasic_date.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL =
  "https://uuju.pythonanywhere.com" || "http://127.0.0.1:8000";

function ModalBasic({ setModalOpen, planID, postList, setPostList }) {
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
      const code = localStorage.getItem("code");
      const response = await axios.delete(
        `${BACKEND_URL}/group/${code}/plans/${planID}`,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        // 직접 상태 배열 업데이트
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== planID)
        );
        setModalOpen(false);
        navigate("/Date_List"); // 삭제 후 홈으로
      } else {
        console.error(
          "Failed to delete group. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting group:", error);
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
  postList: PropTypes.array.isRequired,
  setPostList: PropTypes.func.isRequired,
};

export default ModalBasic;
