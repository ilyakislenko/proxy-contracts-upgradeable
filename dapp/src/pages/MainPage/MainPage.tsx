import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ContractFactory } from "../../widgets/ContractFactory/ContractFactory";
import FactoryClone_abi from "../../config/abi/FactoryClone_abi.json";
import "./MainPage.css";
import NavBar from "../../widgets/NavBar/NavBar";
import ConnectForm from "../../shared/ConnectForm/ConnectForm";
export const MainPage = () => {
	let contract_address = "0x85Be57893EE963bAB45c42E988a1FeCC62BA5513";
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);
	const [currentBalance, setCurrentBalance] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null);
	const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
		null
	);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [clones, setClones] = useState<any>([]);
	const [history,setHistory] = useState<any>();
	useEffect(() => {
		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem("isWalletConnected") === "true") {
				try {
					connect();
					localStorage.setItem("isWalletConnected", "true");
				} catch (ex) {
					console.log(ex);
				}
			}
		};
		connectWalletOnPageLoad();
	}, []);
	const connect = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				setProvider(provider);
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const userAddress = await signer.getAddress();
				if (userAddress) {
					localStorage.setItem("isWalletConnected", "true");
					setIsConnected(true);
					setCurrentAccount(userAddress);
					setSigner(signer);
					setContract(
						new ethers.Contract(
							contract_address,
							JSON.stringify(FactoryClone_abi),
							signer
						)
					);
				} else {
					setErrorMessage("Reason: Error connecting to metamask account:");
				}
			} catch (error) {
				console.log(error);
				setIsConnected(false);
			}
		} else {
			setErrorMessage(
				"Reason: Please install MetaMask browser extension to interact"
			);
		}
	};

	const disconnect = () => {
		localStorage.setItem("isWalletConnected", "false");
		setIsConnected(false);
		setCurrentAccount(null);
		setSigner(null);
		setCurrentBalance(null);
	};

	const getBalance = useCallback(async () => {
		if (signer && provider) {
			const balance = await signer.getBalance();
			setCurrentBalance(ethers.utils.formatEther(balance) + " ETH");
		} else {
			setErrorMessage(null);
		}
	}, [provider, signer]);

	const useContract = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			symbol: { value: string };
			supply: { value: number };
		};
		const name = target.name.value;
		const tokenSymbol = target.symbol.value;
		const supply = target.supply.value;
		if (name && tokenSymbol && supply && contract && provider) {
			contract.createToken(name, tokenSymbol, supply).then(async (data:any) => {
				if(data){
					const transaction = await provider.waitForTransaction(data.hash)
					if(transaction){
						setClones((clones: any) => [...clones, transaction]);
						getBalance();
					}
				}
			})
		}
	};
	const getHistory = async() => {
		const historyProvider = new ethers.providers.EtherscanProvider()
		historyProvider.getHistory(contract_address).then((data) =>{
			console.log('hist', data);
			setHistory(data);
		}).catch(err => console.log(err));
	}
	useEffect(() => {
		if (provider && signer) {
			getBalance();
		}
	}, [getBalance]);
	return (
		<div className="container">
			<NavBar currentBalance={currentBalance} currentAccount={currentAccount} />
			<ConnectForm
				connect={connect}
				disconnect={disconnect}
				isConnected={isConnected}
				errorMessage={errorMessage}
			/>
			<ContractFactory useContract={useContract} />
			<button onClick={getHistory}>get</button>
		</div>
	);
};
