import { Outlet, NavLink } from "react-router-dom";

export default function Root() {

  return (
    <div className="p-8 text-center">
      <br />
      <h1 className="text-4xl font-bold text-center">BigFoot SQL</h1>
      <br />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
