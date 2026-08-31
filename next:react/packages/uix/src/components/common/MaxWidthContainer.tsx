import { cn } from "../../utils";
import React, { type ReactNode } from "react";

type MaxWidthWrapperProps = {
    children: ReactNode;
    className?: string;
};

const MaxwidthContainer: React.FC<MaxWidthWrapperProps> = ({ children, className }) => {
    return (
        <div className={cn("mx-auto  px-4 2xl:px-4 max-w-7xl", className)}>
            {children}
        </div>
    );
};

export default MaxwidthContainer;
