import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext, UserUpdated } from "./_app";
import MessageView from "../components/MessageView";
import axios from "axios";
import { CONSTS } from "../contst";
import Loading from './../components/Loading';
import Dynamic from "../components/skeleton/Dynamic";
import MainContent from "../components/skeleton/MainContent";
import Header from "../components/skeleton/Header";

export default function Logout() {
  const router = useRouter();
  const user = useContext(UserContext);
  const { setUserUpdated } = useContext(UserUpdated);

  useEffect(() => {
    if (user !== "pending" && user !== null) {
      axios.post(CONSTS.apiName + "logout").then(() => {
        setUserUpdated((pre) => pre + 1);
        router.push("/");
        MessageView("success", "با موفقیت خارج شدید");
      });
    } else if (user === null) {
      router.push("/");
    }
  }, [user]);
  return (
    <>
      <Dynamic>
        <MainContent>
          <div className="auth">
            <div className="main-container">
              <Header />
              <div className="container">
                <div className="left" />
                <div className="right" />
                <div className="form-container">
                  <div className="form">
                    <form>
                      <div className="input-container">
                        <Loading />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainContent>
      </Dynamic>
    </>
  );
}
