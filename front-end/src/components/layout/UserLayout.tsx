// layout/UserLayout.tsx
import { Outlet } from "react-router";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";

const UserLayout = () => {
  return (
    <div className="tw:container tw:mx-auto tw:px-4 tw:py-4 content">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;