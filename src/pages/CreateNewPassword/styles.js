import styled from "styled-components";
import { Form, FormHeading } from "../../Components/CommonStyles";

export const NewPassowrdForm = styled(Form)`
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Heading = styled(FormHeading)`
  margin-bottom: 0;
`;

export const Hint = styled.p`
  color: rgba(0, 0, 0, 0.6) !important;
  font-size: 20px;
  margin-bottom: 50px;
`;
