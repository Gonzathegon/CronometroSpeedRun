import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "speedrun_runs";
//OBTIENE LOS DATOS DE LAS RUNS BASANDOSE EN LA STORAGE KEY Y LA GUARDA EN LA VARIABLE DATA PARA LUEGO PARSEARLA A TEXTO LA CLAVE Y VALOR OBTENIDAS
export const obtenerRuns = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];

    } catch (error) {

        console.log(error);

        return [];
    }
};
//FUNCION DE GUARDAR LA RUN EN MEMORIA LOCAL SEGUN LO QUE LE PASO LA FUNCION DE OBTENER RUNS
export const guardarRun = async (run) => {
    try {
        const runs = await obtenerRuns();

        runs.push(run);

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(runs)
        );

    } catch (error) {

        console.log(error);
    }
};
//TOMA LA IDE DEL ARRAY DE OBJETOS GUARDADA, BUSCA EL OBJETO SEGUN SU ID Y LA BORRA
export const eliminarRun = async (id) => {
    try {
        const runs = await obtenerRuns();

        const nuevasRuns = runs.filter(run => run.id !== id);

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(nuevasRuns)
        );

    } catch (error) {

        console.log(error);
    }
};