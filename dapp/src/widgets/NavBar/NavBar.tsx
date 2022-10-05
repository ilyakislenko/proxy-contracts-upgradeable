import React, { useState } from "react";
import "./NavBar.css";

interface NavBarProps {
	currentBalance: string | null;
	currentAccount: string | null;
}
export const NavBar = ({ currentBalance, currentAccount }: NavBarProps) => {
	const [isActive, setisActive] = useState(false);
	const onToggle = () => {
		setisActive(!isActive);
	};
	return (
		<div className="navbar">
			<span onClick={onToggle}>
                {currentAccount ? (isActive && currentAccount ? (
					<b>{currentAccount}</b>
				) : (
					<b>Authorized</b>
				)) : <b>Not Authorized</b>}
				
			</span>
			<span onClick={onToggle}>
				{isActive && currentBalance ? (
					<b>{currentBalance + " "}</b>
				) : (
					<b>Balance</b>
				)}
			</span>
		</div>
	);
};

export default NavBar;
