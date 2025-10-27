import { ComponentType } from "react";
import { useParams } from "react-router";

const Details = () => {
  const params = useParams();

  return (
    <div>Details About User {params.userId}</div>
  )
};

export default Details as ComponentType;

