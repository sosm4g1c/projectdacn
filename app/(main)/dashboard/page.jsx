import React from "react";
import WelcomeContainer from "../_components/WelcomeContainer";
import CreateOptions from "../_components/CreateOptions";
import LatestInterViewList from "../_components/LatestInterviewList";

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer/> */}
      <h2 className="my-3 font-bold text-2xl">Trang Chủ</h2>
      <CreateOptions/>
      <LatestInterViewList/>
    </div>
  );
}

export default Dashboard;
