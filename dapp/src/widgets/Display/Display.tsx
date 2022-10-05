import { Loader } from "../../shared/Loader/Loader";
import "./Display.css";

interface DisplayProps {
    tokens:string[],
    isLoading: Boolean,
}
export const Display = ({tokens,isLoading}: DisplayProps) => {
    console.log(tokens)
	return <div className={"Display"}>
        {!isLoading ? <span>{ tokens && tokens.map((token:string) => {return <p className="token-p" key={token}>{token}</p>}
        )}</span> : <Loader/>}
    </div>;
};