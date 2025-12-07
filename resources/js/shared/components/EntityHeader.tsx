import React from "react";

interface EntityHeaderProps {
  title: string;
  subtitle: string;
  span?:string;
}

const EntityHeader: React.FC<EntityHeaderProps> = ({ title, subtitle,span }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm mt-1">
        {subtitle} <span className="font-semibold">{span}</span>
      </p>
    </div>
  );
};

export default EntityHeader;