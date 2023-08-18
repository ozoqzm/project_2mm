import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const BACKEND_URL =
  "https://uuju.pythonanywhere.com" || "http://127.0.0.1:8000";

const Container = styled.div`
  position: relative;
  margin: 30px auto;
  max-width: 375px;
  height: 740px;
  background: white;

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

const InputNumber = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 55px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 15px;
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

const Login = () => {
  const [phnumber, setPhnumber] = useState("");
  const navigate = useNavigate();

  const gotoPasswd = () => {
    const modifiedPhnumber = phnumber.replace("010", "+8210"); // "010"을 "+8210"으로 변경
    navigate("/Passwd", { state: { phnumber: modifiedPhnumber } }); // 변경된 전화번호로 다음 페이지로 이동
  };

  return (
    <Container>
      <Back>&nbsp;</Back>
      <Title>
        <img src={`${BACKEND_URL}/images/logintitle.svg`} />
      </Title>
      <SubTitle>
        <img src={`${BACKEND_URL}/images/numbertitle.svg`} />
      </SubTitle>
      {/* 인풋 박스 */}
      <InputNumber
        type="text"
        placeholder="전화번호를 입력해주세요"
        value={phnumber}
        onChange={(e) => setPhnumber(e.target.value)}
      ></InputNumber>
      <NextBtn onClick={gotoPasswd}>
        <img src={`${BACKEND_URL}/images/nextbtn.svg`} />
      </NextBtn>
    </Container>
  );
};

export default Login;
