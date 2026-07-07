import { Text, TextInput, View, TouchableOpacity, StyleSheet} from "react-native";
import {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { guardarRun } from "../storage";

export const TimerScreen=()=>{

const [gameName, setGameName] = useState("");
const [checkpointCount, setCheckpointCount] = useState(1);
const [checkpoints, setCheckpoints] = useState([]);
const [runStarted, setRunStarted] = useState(false);
const [time, setTime] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
const [checkpointTimes, setCheckpointTimes] = useState([]);

//FUNCION PARA INCREMENTAR LOS CHECKPOINTS
const increaseCheckpoint =()=>{
    setCheckpointCount(checkpointCount+1);
};
//FUNCION PARA DECREMENTAR LOS CHECKPOINTS
const decreaseCheckpoint =()=>{
     if (checkpointCount > 1){
        setCheckpointCount(checkpointCount - 1);
     }
};
//ACTUALIZA LOS CHECKPOINTS SETEANDO LOS NUEVOS ESTADOS
const updateCheckpoint = (index, text) =>{
    const nuevosCheckpoints = [...checkpoints];
    nuevosCheckpoints[index]= text;
    setCheckpoints(nuevosCheckpoints);
};
//UNA FORMA DE MOSTRAR EL FORMATO DE TIEMPO HACIENDO UN STRING CON EL TIEMPO Y SACANDO LOS MINUTOS, SEGUNDOS Y MILISEGUNDOS DEL TIEMPO TOTAL
const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2,"0")}:${seconds
        .toString()
        .padStart(2,"0")}.${ms.toString().padStart(3,"0")}`;
};
//CREA UN ARRAY DE OBJETOS CON TODOS LOS DATOS OBTENIDOS DEL CRONOMETRO Y LO GUARDA EN UNA MEMORIA INTERNA LOCAL
const finishRun = async () => {
    const nuevaRun = {
        id: Date.now(),

        game: gameName,

        totalTime: time,

        checkpointNames: checkpoints,

        checkpointTimes: [...checkpointTimes],

        date: new Date().toLocaleDateString(),
    };
    await guardarRun(nuevaRun);

    alert("Run guardada correctamente");

    setRunStarted(false);
    setTime(0);
    setIsRunning(false);
    setCurrentCheckpoint(0);
    setCheckpointTimes([]);
    setCheckpointCount(1);
    setGameName("");
    setCheckpoints([]);
};

useEffect(() => {
    let interval;

    if (isRunning) {

        interval = setInterval(() => {

            setTime((prev) => prev + 10);

        }, 10);
    }
    return () => clearInterval(interval);

}, [isRunning]);


//PANTALLA POR DONDE VA EL USUARIO UNA VEZ PRESIONA EL BOTON DE NUEVA RUN
if (runStarted) {
return(
<SafeAreaView style={styles.container}>

<Text style={styles.title}> {gameName} </Text>

<Text style={styles.timer}>{formatTime(time)}</Text>

<Text style={styles.label}>Checkpoint actual: </Text>
{//MUESTRA EL CHECKPOINT ACTUAL
}
<Text style={styles.counterText}>{checkpoints[currentCheckpoint] || "Run finalizada"}</Text>

<Text style={styles.label}>{Math.min(currentCheckpoint + 1, checkpointCount)} / {checkpointCount}</Text>
{//SETEA A SETISRUNNING A TRUE PARA ACTIVAR EL CRONOMETRO
}
<TouchableOpacity style={styles.button} onPress={() => setIsRunning(true)}><Text style={styles.buttonText}>START</Text></TouchableOpacity>
{//SETEA A SETISRUNNING A FALSE PARA DESACTIVAR EL CRONOMETRO
}
<TouchableOpacity style={styles.button} onPress={() => setIsRunning(false)}><Text style={styles.buttonText}>STOP</Text></TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={() => {
    if (currentCheckpoint >= checkpointCount) return;

    const nuevosTiempos = [...checkpointTimes, time];
    setCheckpointTimes(nuevosTiempos);

    if (currentCheckpoint + 1 >= checkpointCount) {
        setCurrentCheckpoint(checkpointCount);
        setIsRunning(false);
    } else {
      setCurrentCheckpoint(currentCheckpoint + 1);
    }}}>

<Text style={styles.buttonText}>CHECKPOINT</Text></TouchableOpacity>
{//SETEA TODO AL INICIO DE SUS ESTADISTICAS PARA EMPEZAR DE NUEVO
}
<TouchableOpacity style={styles.button} onPress={() => {
setTime(0);
setIsRunning(false);
setCurrentCheckpoint(0);
setCheckpointTimes([]);
setRunStarted(false);
setCheckpointCount(1);
setGameName("");
setCheckpoints([]);
    }}><Text style={styles.buttonText}>RESET</Text></TouchableOpacity>
{//VERIFICACION SI EL CHECKPOINT ACTUAL ES IGUAL AL INGRESADO Y ACCION DEL BOTON DE FINALIZAR
}
{currentCheckpoint >= checkpointCount && (
<TouchableOpacity style={styles.button} onPress={finishRun}>
    <Text style={styles.buttonText}>FINALIZAR RUN</Text>
</TouchableOpacity>)}

</SafeAreaView>
);
};

//PRIMERA PANTALLA POR DONDE PASA EL USUARIO ANTES DE APRETAR EL BOTON DE CREAR RUN
return(
 <SafeAreaView style={styles.container}>  

    <Text style={styles.title}>Nueva Run</Text>

    <Text style={styles.label}>Nombre del juego</Text>

    <TextInput style={styles.input} placeholder="Nombre del juego" placeholderTextColor="#888" value={gameName} onChangeText={setGameName}/>

    <Text style={styles.label}>Cantidad de checkpoints</Text>

    <View style={styles.counterContainer}>

    <TouchableOpacity style={styles.counterButton} onPress={decreaseCheckpoint}><Text style={styles.counterButtonText}>-</Text></TouchableOpacity>

    <Text style={styles.counterText}>{checkpointCount}</Text>

    <TouchableOpacity style={styles.counterButton} onPress={increaseCheckpoint}><Text style={styles.counterButtonText}>+</Text></TouchableOpacity>

    </View>
    {//CREA UN ARRAY DE OBJETOS TOMANDO EL LARGO DE CHECKPOINTCOUNT Y LO MAPEA PARA RECORRERLO E INGRESAR LOS DATOS POR CADA OBJETO DEL ARRAY
    }

    {           Array.from({ length: checkpointCount }).map((item, index) => (

                    <View key={index} style={styles.checkpointContainer}>

                        <Text style={styles.label}> Checkpoint {index + 1} </Text>

                        <TextInput style={styles.input} placeholder={`Nombre del checkpoint ${index + 1}`} placeholderTextColor="#888"
                            value={checkpoints[index] || ""} onChangeText={(text) => updateCheckpoint(index, text)}/>

                    </View>
                ))
            }
{//EL BOTON DE CREAR RUN MAS UNA VERIFICACION SI EL NOMBRE DEL JUEGO ESTA VACIO
}
<TouchableOpacity style={styles.button} onPress={() => {
        if (gameName.trim() === "") {
        alert("Ingresá un nombre para el juego");
        return;}
 setRunStarted(true)}}><Text style={styles.buttonText}> Crear Nueva Run </Text></TouchableOpacity>

</SafeAreaView> 
);
}

//ESTILOS
const styles = StyleSheet.create({

   container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    timer: {
    color: "#E6AF4A",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 25,
},
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
    },
    label: {
        color: "white",
        marginBottom: 8,
        marginTop: 15,
        fontSize: 16,
    },
    input: {
        backgroundColor: "#1E1E1E",
        color: "white",
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 8,
        padding: 12,
    },
    counterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    counterButton: {
        backgroundColor: "#E6AF4A",
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    counterButtonText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#121212",
    },
    counterText: {
        color: "white",
        fontSize: 22,
        marginHorizontal: 25,
    },
    checkpointContainer: {
        marginTop: 10,
    },
    button: {
        backgroundColor: "#E6AF4A",
        padding: 15,
        marginTop: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#121212",
        fontSize: 18,
        fontWeight: "bold",
    },  
});