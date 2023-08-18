import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const BACKEND_URL =
  "https://uuju.pythonanywhere.com" || "http://127.0.0.1:8000";

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  max-width: 375px;
  height: 740px;
  background: white;
  margin: 30px auto;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;

const Back = styled.div`
  position: relative;
  margin-top: 17px;
  margin-left: 15px;
`;

const Title = styled.div`
  position: relative;
  top: -23px;
  left: 150px;
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const InputPhone = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 55px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 17px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
`;

const NextBtn = styled.div`
  position: relative;
  top: 470px;
  left: 22px;
`;

const Membership2 = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  console.log(localStorage.getItem("token"));

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // 전화번호가 010으로 시작하는 경우 +8210으로 변환
      const processedPhone = phone.startsWith("010")
        ? `+8210${phone.substring(3)}`
        : phone;

      const response = await axios.patch(
        `${BACKEND_URL}/signup/`,
        { phone: processedPhone },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Data:", response.data);

      navigate("/Membership3");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <Container>
      <Back>&nbsp;</Back>
      <Title>
        <img src={`${BACKEND_URL}/images/title_text.svg`} alt="title" />
      </Title>
      <SubTitle>
        <img src={`${BACKEND_URL}/images/phone_text.svg`} alt="subtitle" />
      </SubTitle>
      <InputPhone
        placeholder="전화번호를 입력해주세요"
        value={phone}
        onChange={handlePhoneChange}
      />
      <NextBtn onClick={onSubmit}>
        <img src={`${BACKEND_URL}/images/next_btn.svg`} alt="btn" />
      </NextBtn>
    </Container>
  );
};

export default Membership2;
