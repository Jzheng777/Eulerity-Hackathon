import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import jason from '../pic/jason-z.jpg';

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.h1`
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 20px;
`;

const LeftContent = styled.div`
  text-align: left;
  width: 100%;
  max-width: 400px;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const RightContent = styled.div`
  text-align: right;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const IconLink = styled.a`
  margin-top: 10px;
  color: #000;
  font-size: 50px;
  margin-right: 20px;
`;

const PortfolioLink = styled.a`
  margin-top: 10px;
  color: #000;
  font-size: 30px;
  margin-left: 10px;
`;

const ProfileImage = styled.img`
  width: 400px;
  border-radius: 10%;
  margin-top: 20px;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <Header>About</Header>
      <ContentWrapper>
        <LeftContent>
          <p>Hi, my name is Jason Zheng. I am a recent graduate of the University of Buffalo with my BS in Computer Science.</p>
        </LeftContent>
        <ProfileImage src={jason} alt="Jason Zheng" />
        <RightContent>
          <IconContainer>
            <IconLink href="https://www.linkedin.com/in/jason-zheng-b65b05266/" target="_blank">
              <FaLinkedin />
            </IconLink>
            <IconLink href="https://github.com/Jzheng777" target="_blank">
              <FaGithub />
            </IconLink>
            <PortfolioLink href="https://jason-zheng-portfolio.com/" target="_blank">
              Portfolio
            </PortfolioLink>
          </IconContainer>
        </RightContent>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
