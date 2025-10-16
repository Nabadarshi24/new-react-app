import { useParams } from "react-router";

export const Details = () => {
  const params = useParams();

  return (
    <div>Details About User {params.userId}</div>
  )
};
