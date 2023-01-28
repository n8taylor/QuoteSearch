import { ReactNode } from "react";

interface QuoteBlobProps {
  quote: string;
  author: string;
}

// export function FormInput() {} also works
// export const FormInput = (props: FormInputProps) => {
export const QuoteBlob = ({quote, author}: QuoteBlobProps) => {
//   const {type, label} = props;  
  return (
    <div className="blob">
      <h4 className="quote">{ quote }</h4>
      <p className="author">-{ author }</p>
    </div>
  );
}