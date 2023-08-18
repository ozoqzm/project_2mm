import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

const Passwd = () => {
  const navigate = useNavigate();
  // const gotoHome = () => {
  //   navigate("/Membership4");
  // };

  //로그인하는 코드
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { phnumber } = location.state; // 이전 페이지에서 전달된 사용자명
  console.log(phnumber);
  console.log(password);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/login/`, {
        phone: phnumber,
        password: password,
      });
      const token = response.data.token; // 토큰 받기
      localStorage.setItem("token", token); // 토큰 저장
      navigate("/Membership4"); // 로그인하면 페이지 이동
    } catch (error) {
      alert("전화번호와 비밀번호를 다시 확인해주세요.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <Container>
      <Back>&nbsp;</Back>
      <Title>
        <img src={`${BACKEND_URL}/images/logintitle.svg`} />
      </Title>
      <SubTitle>
        <img src={`${BACKEND_URL}/images/passwdtitle.svg`} />
      </SubTitle>
      <InputPasswd
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></InputPasswd>
      {/* 로그인 버튼 */}
      <NextBtn onClick={handleLogin}>
        <img src={`${BACKEND_URL}/images/startbtn.svg`} />
      </NextBtn>
    </Container>
  );
};

export default Passwd;
