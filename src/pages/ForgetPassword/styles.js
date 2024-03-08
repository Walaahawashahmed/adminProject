import styled from "styled-components";
import { Form, FormHeading } from "../../Components/CommonStyles";

export const ForgetPasswordForm = styled(Form)`
  p:nth-of-type(1) {
  }
  & > .email {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Heading = styled(FormHeading)`
  margin-bottom: 0;
`;

export const Hint = styled.p`
  color: rgba(0, 0, 0, 0.4) !important;
  font-size: 20px;
  margin-bottom: 50px;
`;
