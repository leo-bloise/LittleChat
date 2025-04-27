import { useEffect } from "react";

export default function useRunOnce(action: () => void) {
    useEffect(action, []);
}