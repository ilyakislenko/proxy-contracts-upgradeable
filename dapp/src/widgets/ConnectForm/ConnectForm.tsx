import "./ConnectForm.css";
import { Button } from "../../shared/Button/Button";
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
				{isConnected ? (
						<Button text="Disconnect" handleClick={disconnect} />
				) : (
					<>
						<Button text="Connect" handleClick={connect} />
						{errorMessage}
					</>
				)
				}
		</div>
	);
};

export default ConnectForm;
