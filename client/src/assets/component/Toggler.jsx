import React, {useState} from 'react';
import {Drawer, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom'; 
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CallIcon from '@material-ui/icons/Call';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LinkIcon from '@material-ui/icons/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = { 
sideNav: { 
	zIndex: 3, 
	margin: '20px 25px', 
	position: 'absolute', 
  right: "0",
  top: "0"
}, 
link: { 
	color: 'Black', 
	textDecoration: 'none',
} 
}; 

 const Toggler = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      {[""].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} style={styles.sideNav}></MenuIcon>
          <Drawer open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div onClick={toggleDrawer(anchor, false)}>
				<p className="sidenav-title" >User Name</p>
				<p className="sidenav-subtitle">User Id</p>
				<Menu menuNameAddress = "/dashboard" menuIcon = {<DashboardIcon />} menuName = "dashboard" />
        <Menu menuNameAddress = "/freelink" menuIcon = {<LinkIcon />} menuName = "send free link" />
        <span className="act btn"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Activate Now</span>
				<Menu menuNameAddress = "/team" menuIcon = {<GroupIcon />} menuName = "team" />
				<Menu menuNameAddress = "/income" menuIcon = {<CreditCardIcon />} menuName = "income" />
				<Menu menuNameAddress = "/paymenthistory" menuIcon = {<AssignmentIcon />} menuName = "payment history" />
				<Menu menuNameAddress = "/contactus" menuIcon = {<CallIcon />} menuName = "contact us" />
        <Menu menuNameAddress = "/" menuIcon = {<ExitToAppIcon />} menuName = "Logout" />
			</div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}




//////////////////////////////////// *   menu link component start  *//////////////////////////////////////
const Menu = (props) =>{
	return(
		<>
			<NavLink to={props.menuNameAddress} style={styles.link}> 
        <List> 
          <ListItem button key={props.menuName}>
            <ListItemIcon>{props.menuIcon}</ListItemIcon>
            <ListItemText primary={props.menuName} /> 
          </ListItem> 
        </List> 
		  </NavLink>
		</>
	);
}
//////////////////////////////////// *   menu link component End  *//////////////////////////////////////

export default Toggler;