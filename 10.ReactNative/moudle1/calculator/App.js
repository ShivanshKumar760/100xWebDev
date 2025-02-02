import { StatusBar } from 'expo-status-bar';
import react,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  display: {
    width: "90%",
    minHeight: 120,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 32,
    color: "white",
  },
  resultText: {
    fontSize: 40,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#444",
    flex: 1,
    margin: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  equalsButton: {
    backgroundColor: "#FF9800",
  },
  clearButton: {
    backgroundColor: "#F44336",
  },
});


export default function App()
{
  const [result,setResult]=useState("");
  const [input,setInput]=useState("");

  const handlePress=(value)=>{
    if(value==="c")
    {
      setInput(" ");
      setResult(" ");
    }

    else if(value==="=")
    {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult("Error");
      }
    }
    else{
      setInput((prev)=>prev+value);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.inputText}>{input||"0"}</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>

        <View style={styles.buttonContainer}>
        {[
          ["7", "8", "9", "/"],
          ["4", "5", "6", "*"],
          ["1", "2", "3", "-"],
          ["C", "0", "=", "+"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity key={btn} style={[styles.button,
                  btn === "=" ? styles.equalsButton : null,
                  btn === "C" ? styles.clearButton : null,
                ]}
                onPress={() => handlePress(btn)}
              >
              <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        </View>
      </View>
    </>
  )
};