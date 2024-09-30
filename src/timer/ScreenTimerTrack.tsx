import { useCallback, useEffect, useState } from "react";

export const ScreenTimerTrack: React.FC = () => {
    const [startTime, setStartTime] = useState(new Date())

    const [currentTotalTime, setCurrentTotalTime] = useState<number>(0);

    // Acumulador do Idle
    const [totalIdleTime, setTotalIdleTime] = useState<number>(0); 
    // marcador do idle
    const [idleTime, setIdleTime] = useState<number>(0); 

    const [isIdle, setIsIdle] = useState<boolean>(false);

    const idleThreshold = 10;

    const resetIdleTime = useCallback(() => {
        setTotalIdleTime((prevTotalIdleTime) => prevTotalIdleTime + idleTime);
        setIdleTime(0);
        setCurrentTotalTime(0);
        setIsIdle(false);
    }, [idleTime]);

    const handleClick = () => {
        console.log("Não Está Ocioso");
        setIdleTime(0);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTotalTime(() => 
                Math.floor((Number(new Date()) - Number(new Date(startTime))) / 1000) + 1 
                )

            if (isIdle) setTotalIdleTime((prev)=> prev+1)
            setIsIdle((idleTime >= idleThreshold));
            setIdleTime((prevIdleTime) => prevIdleTime + 1);

        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentTotalTime]);

    useEffect(()=>{
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleClick);
    },[])


    return (
        <div>
            <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'start'}}>
                    <span>Tempo Total : </span>               
                    <span>Tempo total de ociosidade : </span> 
                    <span>Tempo diff : </span> 
                    <span>Atual Tempo de ociosidade : </span> 
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'start'}}>
                    <span>{currentTotalTime} segundos</span>
                    <span>{totalIdleTime} segundos</span>
                    <span>{currentTotalTime - totalIdleTime} segundos</span>
                    <span>{idleTime} segundos</span>
                </div>
            </div>
            <p/>
            <button onClick={resetIdleTime}>Resetar tempo de ociosidade</button>
            {isIdle && <p>Usuário está ocioso</p>}
        </div>
    );
}
