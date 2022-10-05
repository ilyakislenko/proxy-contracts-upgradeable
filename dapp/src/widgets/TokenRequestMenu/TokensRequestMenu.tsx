import { Button } from "../../shared/Button/Button";
import { Input } from "../../shared/Input/Input";
import "./TokensRequestMenu.css";
interface TokensRequestMenuProps {
	handleClick: (e: React.SyntheticEvent<HTMLFormElement>) => void;
	isLoading: Boolean;
}
export const TokensRequestMenu = ({
	handleClick,
	isLoading,
}: TokensRequestMenuProps) => {
	return (
		<form className="TokensRequestMenu" onSubmit={handleClick}>
			<Input text={"startIndex"} placeholder={"Start index"} />
			<Input text={"endIndex"} placeholder={"EndIndex"} />
			<Button text={"Send"} isDisabled={isLoading} />
		</form>
	);
};
