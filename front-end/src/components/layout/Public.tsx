import {
  ComponentType,
  ReactNode,
  useEffect
} from 'react';
import {
  Outlet,
  useLocation,
  useNavigate
} from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { publicRoute } from '../routes';

type TypeProps = {
  children?: ReactNode;
};

const Public = ({ children }: TypeProps) => {

  const navigate = useNavigate();
  const location = useLocation();
  // console.log({ location })

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);

  useEffect(() => {

    if (isSignIn) {
      if (location.state) {
        navigate(location.state.from);
      } else {
        navigate("/dashboard");
      }
    } else if (location.pathname == "/verify-otp") {
      navigate("/login");
    }
  }, [isSignIn])

  console.log({ timeStamp: new Date().getTime() })

  return (
    <div className="content public-content">
      <Outlet />
      {/* {children} */}
    </div>
  )
};

export default Public as ComponentType<TypeProps>;
