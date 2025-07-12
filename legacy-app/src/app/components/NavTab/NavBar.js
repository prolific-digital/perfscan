import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const NavBar = ({tabName}) => {
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className="active">{tabName}</NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default NavBar;
