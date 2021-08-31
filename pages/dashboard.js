import { useContext } from "react";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContext";
import { getAPIClient } from "../services/axios";

export default function Dashboard() {
  const { user, signOutRequest } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <span>{user?.email}</span>
      <p>{JSON.stringify(user, null, 4)}</p>
      <button onClick={() => signOutRequest()}>Sair</button>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["pmp.tk"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // await apiClient.get("/users");

  return {
    props: {},
  };
};
