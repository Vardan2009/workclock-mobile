import { useRef, useState } from "react";
import TimeSelectModal from "./timeSelectModal";

export function usePromptDuration() {
    const [visible, setVisible] = useState(false);
    const resolverRef = useRef(null);

    const promptDuration = () => {
        setVisible(true);

        return new Promise((resolve) => {
            resolverRef.current = resolve;
        });
    };

    const handleAccept = (seconds) => {
        setVisible(false);
        resolverRef.current?.(seconds);
        resolverRef.current = null;
    };

    const handleCancel = () => {
        setVisible(false);
        resolverRef.current?.(null);
        resolverRef.current = null;
    };

    const modal = (
        <TimeSelectModal
            visible={visible}
            setVisible={setVisible}
            onAccept={handleAccept}
            onCancel={handleCancel}
        />
    );

    return { promptDuration, modal };
}
