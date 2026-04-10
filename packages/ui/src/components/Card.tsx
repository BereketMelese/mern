import React, { ReactNode } from "react";

export interface CardProps {
  className?: string;
  children: ReactNode;
}

export interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface CardBodyProps {
  className?: string;
  children: ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children }, ref) => (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}
    >
      {children}
    </div>
  ),
);
CardRoot.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", children }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-b border-gray-200 bg-gray-50 ${className}`}
    >
      {children}
    </div>
  ),
);
CardHeader.displayName = "Card.Header";

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  ),
);
CardBody.displayName = "Card.Body";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", children }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
