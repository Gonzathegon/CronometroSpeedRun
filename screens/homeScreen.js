import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useState, useEffect} from "react";
import { obtenerRuns, eliminarRun } from "../storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const HomeScreen = ({ navigation }) => {
    const [runs, setRuns]=useState([]);

//VA AL ASYNCSTORAGE, LEE LAS RUNS Y LAS GUARDA EN EL ESTADO RUNS
const cargarRuns = async () => {
    const data = await obtenerRuns();
    setRuns(data);
};
//FORMATO DE TIEMPO
const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2,"0")}:${seconds
        .toString()
        .padStart(2,"0")}.${ms.toString().padStart(3,"0")}`;
};
//HACE QUE CUANDO SE ABRA HOME SE CARGUEN AUTOMATICAMENTE LAS PARTIDAS
useFocusEffect(
    useCallback(() => {
        cargarRuns();
    }, [])
);

return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>SPEEDRUN TIMER</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Timer")}
      >
        <Text style={styles.buttonText}>Nueva Run</Text>
      </TouchableOpacity>

      <FlatList
        data={runs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.game}</Text>

            <View>
              <Text style={styles.cardText}>
                Tiempo: {formatTime(item.totalTime)}
              </Text>

              <Text style={styles.cardText}>{item.date}</Text>

              {item.checkpointNames?.map((checkpoint, index) => (
                <Text key={index} style={styles.cardText}>
                  {checkpoint}: {formatTime(item.checkpointTimes[index])}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={async () => {
                await eliminarRun(item.id);
                cargarRuns();
              }}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay partidas guardadas
          </Text>
        }
      />
    </View>
  </SafeAreaView>
);}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,},

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,},

  button: {
    backgroundColor: "#E6AF4A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,},

  buttonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 18,},

    emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,},
    card: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  cardTitle: {
    color: "#E6AF4A",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cardText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },

  deleteButton: {
    backgroundColor: "#B22222",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
