import { ReactNode } from "react";

interface QuoteBlobProps {
  quote: string;
  author: string;
}

export const QuoteBlob = ({quote, author}: QuoteBlobProps) => {
  return (
    <div className="blob">
      <h4 className="quote">{ quote }</h4>
      <p className="author">-{ author }</p>
    </div>
  );
}