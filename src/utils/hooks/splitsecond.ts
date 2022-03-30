import useTimeout from "./timeout";
import {useState} from "react";

export default function useSplitSecond() {
    const [splitSecond, setSplitSecond] = useState(true);
    useTimeout(() => setSplitSecond(false), 500);

    return splitSecond;
}
