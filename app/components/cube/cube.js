/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 25vh;
`;

const CubeWrapper = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) translateX(50%);
`;

const Face = styled.div`
  width: 90px;
  height: 90px;
  position: absolute;
  box-shadow: inset 0px 0 1px 2px black;
  border: 0.0001px solid black;
`;

const Cube = ({ frontColor, topColor, rightColor }) => {
  return (
    <Container>
      <CubeWrapper>
        <Face style={{ background: frontColor, transform: 'translateZ(45px)', filter: 'brightness(0.9)' }} />
        <Face style={{ background: topColor, transform: 'rotateX(90deg) translateZ(45px)', filter: 'brightness(1.36)' }} />
        <Face style={{ background: rightColor, transform: 'rotateY(90deg) translateZ(45px)', filter: 'brightness(0.9)' }} />
      </CubeWrapper>
    </Container>
  );
};

export default Cube;
