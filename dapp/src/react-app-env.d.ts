import { ethers } from "ethers";
/// <reference types="react-scripts" />
declare global {
	interface Window {
		ethereum?: ethers.providers.ExternalProvider
	}
}
