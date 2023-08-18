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

const InputPasswd = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 55px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 18px;
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

const Membership3 = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  console.log(localStorage.getItem("token"));

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${BACKEND_URL}/update-password/`,
        { password: password },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Data:", response.data);

      navigate("/Passwd2");
    } catch (error) {
      alert("이미 있는 유저입니다.");
      console.error("Error fetching data:", error);
    }
  };

  const handlePasswdChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Back>&nbsp;</Back>
      <Title>
        <img src={`${BACKEND_URL}/images/title_text.svg`} alt="title" />
      </Title>
      <SubTitle>
        <img src={`${BACKEND_URL}/images/pwd_text.svg`} alt="subtitle" />
      </SubTitle>
      <InputPasswd
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={handlePasswdChange}
      />
      <NextBtn onClick={onSubmit}>
        <img src={`${BACKEND_URL}/images/next_btn.svg`} alt="btn" />
      </NextBtn>
    </Container>
  );
};

export default Membership3;
