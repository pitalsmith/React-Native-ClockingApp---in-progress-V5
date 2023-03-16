import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, Button, TextInput ,ActivityIndicator} from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { ScrollView } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [idd, setIdd] = useState("");
  const [timer, setTimer] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    console.log("Hoo you okay");
    // change();
    // readall();
    // allUsers();
    getDocs(collection(db, "users")).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data", users);
      setUsers(users);
      console.log(users);
    });
  }, []);

  // componentWillMount(){
  //   change();
  // }

  console.log(timer);

  // function change() {
  //   setTimeout(() => {
  //     setTimer('Yes')
  //     console.log(timer)
  //   }, "1000");
  // }

  // function create() {
  //   addDoc(collection(db, "users"), {
  //     username: username,
  //     email: email,
  //   })
  //     .then(() => {
  //       console.log("data submitted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log("Added....");
  //   alert("Added");
  // }

  // function update() {
  //   updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  //     username: username,
  //     email: email,
  //   })
  //     .then(() => {
  //       console.log("data submitted");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log("Updated....");
  //   alert("Updated");
  // }

  // function Delete() {
  //   deleteDoc(doc(db, "users", idd));
  //   console.log("Deleted....", idd);
  //   alert("Deleted", idd);
  // }

  function read() {
    getDoc(doc(db, "users", idd), {})
      .then((docData) => {
        if (docData.exists()) {
          console.log(docData.data().Clocks);
          setName(docData.data().username);
          setEmail(docData.data().email);
        } else {
          console.log("No such data");
          alert("No such data");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function readall() {
    getDocs(collection(db, "Clocks")).then((docSnap) => {
      let Clocks = [];
      docSnap.forEach((doc) => {
        Clocks.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data", Clocks);
    });
  }

  // function allUsers () {
  //   getDocs(collection(db, "users")).then(docSnap =>{
  //     let users =[];
  //     docSnap.forEach((doc) => {
  //       users.push({ ...doc.data(), id:doc.id})
  //     });
  //     console.log('Document data', users);
  //     setUsers(users);
  //     console.log(users)
  // });
  // }

  function readByQuery() {
    getDocs(
      query(collection(db, "users"), where("email", "==", "solomon@gmail.com"))
    ).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data", users);
    });
  }

  function login() {
    console.log(users);

    const checkData = users.filter((d) => d.email >= "atundepeter");
    console.log("email Output", checkData);

    const checkName = users.filter((d) => d.username == "Solomon");
    console.log("Fetch by username", checkName);
    const email = checkName[0];
    console.log("User Email", email.email);
  }

  function log_in() {
    if (!users) {
      alert("pls WAIT Loading");
    } else {
      console.log(users);

      const pass = users.filter(
        (d) => d.password == password && d.username == username
      );
      console.log("Passed", pass);
      

      if (pass == "") {
        console.log("Access denied");
        alert('Access Denied You dont have an account yet ')
      } else {
        console.log("passed");
        const user = pass[0];
        const username = user.username;
        setPassword('')
        navigation.push("Details", {
          username: username,
          userdata: user,
        });
        console.log("username", user.username);
      }

      //   const myJSON = JSON.stringify(checkName)
      //   console.log(myJSON)
    }
  }

  function Proceed() {
    console.log("ok");
    setTimer("Okay");
  }

  if (users=='') {
    return (
      <TailwindProvider>
        <View className="flex-1 justify-center items-center bg-[#48015c] font-bold ">
          <View className="mt-[-10] flex-1 mt-20">
            <View className="mt-20">
           <Text className="text-lg mt-20 text-[#8842b3]"> SEMISH CLOCKING APP.</Text>
           
              <ActivityIndicator size="large" color="#050112" className="mt-20"/>
            </View>
          </View>
        </View>
      </TailwindProvider>
    );
  } else {
    return (
   
        <TailwindProvider>
        
            <View className="flex-1 justify-center items-center bg-[#040012] font-bold h-[100%]">
           
              <View className="mt-10 flex space-y-4 mb-20">
                <View>
                  <Text className="font-bold mt-5 text-[#8842b3]">SEMISH STAFF CLOCKING APP</Text>
                </View>
                
               
                
              </View>
              <View className="font-bold items-center">
                  <Text className="font-bold items-center mb-10 text-[#8842b3]">LOGIN TO YOUR ACCOUNT</Text>
                </View>
              <View className=" flex-1 w-[90%] ">
               
                <View className="mb-10">
                  <Text className="pb-1 text-[#8842b3]"> Enter Username </Text>
                  <TextInput
                    value={username}
                    onChangeText={(username) => {
                      setName(username);
                    }}
                    placeholder="Username"
                    className=" h-[60px] rounded border border-indigo-500/50 text-white"
                  ></TextInput>
                </View>
                <View className="">
                <Text className="pb-1 text-[#8842b3]"> Enter Password </Text>
                  <TextInput
                  secureTextEntry
                    value={password}
                    onChangeText={(password) => {
                      setPassword(password);
                    }}
                    placeholder="Password"
                    className=" h-[60px] rounded border border-indigo-500/50 text-white"
                  ></TextInput>
                </View>
                <View className="pt-10">
                  <Button title="Login" onPress={log_in} />
                </View>
                <Text className="mt-20">Don't have an account?</Text>
                <View className="mt-2">
                  <Button
                    title="Create an Account"
                    onPress={() => navigation.push("CreateAccount")}
                  />
                </View>

                
                
              </View>
          
            </View>
           
        </TailwindProvider>

    );
  }
};

export default HomeScreen;
