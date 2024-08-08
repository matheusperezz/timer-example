import { useCallback, useEffect, useState } from "react";

export const ScreenTimerTrack: React.FC = () => {
    const [timeOnScreen, setTimeOnScreen] = useState<number>(0);
    const [idleTime, setIdleTime] = useState<number>(0);
    const [isIdle, setIsIdle] = useState<boolean>(false);
    const idleThreshold = 15;
    const [totalIdleTime, setTotalIdleTime] = useState<number>(0);

    const resetIdleTime = useCallback(() => {
        setTotalIdleTime((prevTotalIdleTime) => prevTotalIdleTime + idleTime);
        setIdleTime(0);
        setIsIdle(false);
        setTimeOnScreen(0);
    }, [idleTime]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeOnScreen((prevTime) => {
                if (prevTime < idleThreshold) {
                    return prevTime + 1;
                } else {
                    setIdleTime((prevIdleTime) => {
                        const newIdleTime = prevIdleTime + 500;
                        if (newIdleTime >= idleThreshold) {
                            setIsIdle(true);
                        }
                        return newIdleTime;
                    });
                    return prevTime;
                }
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [resetIdleTime]);

    return (
        <div>
            <div>
                <p>Tempo na tela: {timeOnScreen} segundos</p>
                <p>Tempo de ociosidade: {idleTime / 1000} segundos</p>
                <p>Tempo total de ociosidade: {totalIdleTime / 1000} segundos</p>
                <button onClick={resetIdleTime}>Resetar tempo de ociosidade</button>
                {isIdle && <p>Usuário está ocioso</p>}
            </div>
        </div>
    );
}