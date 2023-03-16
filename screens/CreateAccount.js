import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput,ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
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

export const CreateAccount = ({ navigation }) => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idd, setIdd] = useState("");
  const [timer, setTimer] = useState("");
  const [users, setUsers] = useState("");
  const [nextDayClockIn, setNextDayClockIn] = useState("");
  const [nextDayClockOut, setNextDayClockOut] = useState("");
  const [today, setToday] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [clockOutId, setClockOutId] = useState("");
  const [clockinTime, setClockInTime] = useState("");

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

    //Check Time And Date

    //Original
    let iDate = new Date();
    let cDay = iDate.getDate();
    let cMonth = iDate.getMonth() + 1;
    let cYear = iDate.getFullYear();
    let AllDate = cDay + ":" + cMonth + ":" + cYear;
    setCurrentDate(AllDate);
    console.log("All Date", AllDate);

    setCurrentDay(cDay);
    setCurrentMonth(cMonth);
    setCurrentYear(cYear);
    console.log("Date", cDay, cMonth, cYear);

    // Original WEEK DAYS
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dd = new Date();
    let today = weekday[dd.getUTCDay()];
    setToday(today);
    console.log("Day of the Week", today);

    //Original Hour, Time and Minutes
    const dddd = new Date();
    let hh = dddd.getHours();
    let mm = dddd.getMinutes();
    let ss = dddd.getSeconds();
    let Time = hh + ":" + mm + ":" + ss;
    setCurrentTime(Time);
    console.log("Time", currentTime);
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

  function create() {
    //SETTING CURRENT TIME

    if (email=='' || password =='' || username == '') {
      console.log('empty')
    }else{
      const dddd = new Date();
      let hh = dddd.getHours();
      let mm = dddd.getMinutes();
      let ss = dddd.getSeconds();
      let Time = hh + ":" + mm + ":" + ss;
      setCurrentTime(Time);
      console.log("Time", currentTime);
  
      addDoc(collection(db, "users"), {
        username: username,
        email: email,
        LatestClockIns: currentTime,
        nextDayClockIn: today,
        nextDayClockOut: today,
        password: password,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Added....");
      alert("Complete");
      //Set Clock
      addDoc(collection(db, "Clocks"), {
        username: username,
        ClockIn: currentTime,
        ClockOut: currentTime,
        Date: currentDate,
        Day_Of_Week: today,
      })
        .then(() => {
          console.log("data submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Added....");
      setPassword("");
      alert("Registration Successful, Kindly SignIn");
      navigation.push("HomeScreen");
    }
    
  }

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
      alert("Login Succesful! ");

      if (pass == "") {
        console.log("Access denied");
        alert("Access Denied You dont have an account yet ");
      } else {
        console.log("passed");
        const user = pass[0];
        const username = user.username;
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

  if (!users) {
    return (
      <TailwindProvider>
        <View className="flex-1 justify-center items-center bg-[#48015c] font-bold ">
          <View className="mt-[-10] flex-1 mt-20">
            <View className="mt-20 pb-10">
           
              <ActivityIndicator size="large" color="#050112" className="mt-20 pt-20"/>
            </View>
          </View>
        </View>
      </TailwindProvider>
    );
  } else {
    return (
      <TailwindProvider>
        <View className="flex-1 justify-center items-center bg-[#040012] font-bold h-[100%]">
          <View className="mt-10 flex space-y- mb-10">
            <View className="items-center mt-20">
              <Text className=" font-extrabold text-lg text-[#8842b3]">Create An Account</Text>
            </View>
          </View>
         
          <View className=" flex-1 w-[90%] ">
          
            <View className="mt-10">
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
            <View className=" mt-10">
            <Text className="pb-1 text-[#8842b3]"> Enter Email </Text>
              <TextInput
                value={email}
                onChangeText={(email) => {
                  setEmail(email);
                }}
                placeholder="Email"
                className=" h-[60px] rounded border border-indigo-500/50 text-white"
              ></TextInput>
            </View>
            <View style={styles.foot} >
           
            <Text className="pb-1 text-[#8842b3] mt-10"> Enter Password </Text>
              <TextInput
                value={password}
                onChangeText={(password) => {
                  setPassword(password);
                }}
                placeholder="Password"
                className=" h-[60px] rounded border border-indigo-500/50 text-white"
              ></TextInput>
               
            </View>
          
            <View className="pt-10">
              <Button title="SIGNUP NOW" onPress={create} />
            </View>
            
          </View>
          
        </View>
      </TailwindProvider>
    );
  }
};

const styles = StyleSheet.create({
  foot: {

  },
});

export default CreateAccount;
