import "./ConnectForm.css";
import { Button } from "../Button/Button";
interface ConnectFormProps {
	connect: () => Promise<void>;
	disconnect: () => void;
	isConnected: Boolean;
	errorMessage: string | null;
}
export const ConnectForm = (props: ConnectFormProps) => {
	const { connect, disconnect, isConnected, errorMessage } =
		props;
	return (
		<div className="ConnectForm">
			<div className="container-functional">
				{isConnected ? (
						<Button text="Disconnect" handleClick={disconnect} />
				) : (
					<>
						<Button text="Connect Metamask" handleClick={connect} />
					</>
				)}
			</div>
		</div>
	);
};

export default ConnectForm;
