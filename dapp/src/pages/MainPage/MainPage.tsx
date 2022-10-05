import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { ContractFactory } from "../../widgets/ContractFactory/ContractFactory";
import FactoryClone_abi from "../../config/abi/FactoryClone_abi.json";
import "./MainPage.css";
import NavBar from "../../widgets/NavBar/NavBar";
import ConnectForm from "../../widgets/ConnectForm/ConnectForm";
import { TokensRequestMenu } from "../../widgets/TokenRequestMenu/TokensRequestMenu";
import { Display } from "../../widgets/Display/Display";
export const MainPage = () => {
	const contract_address = "0x99C95179740C21b314f80FCff26b438333990Cb9";
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);
	const [currentBalance, setCurrentBalance] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null);
	const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
		null
	);
	const [contract, setContract] = useState<ethers.Contract | null>(null);
	const [tokens, setTokens] = useState<string[]>([]);
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
				await provider
					.send("eth_requestAccounts", [])
					.catch((err: any) => console.warn("err", err));
				const signer = provider.getSigner();
				const userAddress = await signer.getAddress();
				if (userAddress) {
					localStorage.setItem("isWalletConnected", "true");
					setErrorMessage("");
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
					setErrorMessage("Reason: Cannot get user address");
					localStorage.setItem("isWalletConnected", "false");
				}
			} catch {
				setErrorMessage("Reason: Error connecting to metamask account");
				localStorage.setItem("isWalletConnected", "false");
			}
		} else {
			setErrorMessage(
				"Reason: Please install MetaMask browser extension to interact"
			);
			localStorage.setItem("isWalletConnected", "false");
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
		setIsLoading(true);
		const target = e.target as typeof e.target & {
			name: { value: string };
			symbol: { value: string };
			supply: { value: number };
		};
		const name = target.name.value;
		const tokenSymbol = target.symbol.value;
		const supply = target.supply.value;
		if (name && tokenSymbol && supply && contract && provider) {
			const data = await contract
				.createToken(name, tokenSymbol, supply)
				.catch(() => setIsLoading(false));
			if (data) {
				if (data.hash) {
					console.warn(data);
					const transaction = await provider.waitForTransaction(data.hash);
					if (transaction) {
						getBalance();
					}
				}
				setIsLoading(false);
			}
		}
	};
	const getTokens = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			startIndex: { value: number };
			endIndex: { value: number };
		};
		const startIndex = target.startIndex.value;
		const endIndex = target.endIndex.value;
		if (contract) {
			const data = await contract
				.getTokens(startIndex, endIndex)
				.catch((err: { errorSignature: string }) => {
					console.warn(err);
					if (err.errorSignature === "Panic(uint256)") {
						setTokens([
							"The contract does not contain the requested number of tokens",
						]);
					}
				});
			if (data) {
				setTokens(data);
			}
		} else {
			console.log("Not connected to metamask");
		}
	};
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
			<h3>You can create contract and get tokens here </h3>

			{isConnected && (
				<div className="container-menus">
					<ContractFactory useContract={useContract} isLoading={isLoading} />
					<TokensRequestMenu handleClick={getTokens} isLoading={isLoading} />
					<Display tokens={tokens} isLoading={isLoading} />
				</div>
			)}
		</div>
	);
};
