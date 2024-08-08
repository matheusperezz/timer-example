import { useCallback, useEffect, useState } from "react";

export const ScreenTimerTrack: React.FC = () => {
    const [timeOnScreen, setTimeOnScreen] = useState<number>(0);
    const [currentTotalTime, setCurrentTotalTime] = useState<number>(0);
    const [idleTime, setIdleTime] = useState<number>(0);
    const [isIdle, setIsIdle] = useState<boolean>(false);
    const idleThreshold = 15;
    const [totalIdleTime, setTotalIdleTime] = useState<number>(0);

    const resetIdleTime = useCallback(() => {
        setTotalIdleTime((prevTotalIdleTime) => prevTotalIdleTime + idleTime);
        setIdleTime(0);
        setCurrentTotalTime(0);
        setIsIdle(false);
    }, [idleTime]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTotalTime((prevTime) => prevTime + 1);

            if (currentTotalTime >= idleThreshold) {
                setIdleTime((prevIdleTime) => prevIdleTime + 1);
                setIsIdle(true);
            } else {
                setTimeOnScreen((prev) => prev + 1);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentTotalTime, idleThreshold]);

    return (
        <div>
            <div>
                <p>Tempo na tela: {timeOnScreen} segundos</p>
                <p>Tempo de ociosidade: {idleTime} segundos</p>
                <p>Tempo total de ociosidade: {totalIdleTime} segundos</p>
                <button onClick={resetIdleTime}>Resetar tempo de ociosidade</button>
                {isIdle && <p>Usuário está ocioso</p>}
            </div>
        </div>
    );
}
