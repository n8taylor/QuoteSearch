import { ReactNode } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  children?: ReactNode;
}

// export function FormInput() {} also works
// export const FormInput = (props: FormInputProps) => {
export const QuoteBlob = ({label, type = "text", children = ""}: FormInputProps) => {
//   const {type, label} = props;  
  return (
    <div className="flex-input">
      <label>
        {children}
        {label}
      </label>
      <input type={type} />
    </div>
  );
}