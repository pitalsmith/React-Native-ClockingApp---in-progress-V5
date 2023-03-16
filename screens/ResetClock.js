
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput,ActivityIndicator,FlatList,ScrollView } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../firebase/config';

export const ResetClock = ({navigation}) => {

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idd, setIdd] = useState('');
  const [timer, setTimer] = useState('');
  const [users, setUsers] = useState('');
  const [data, setData] = useState(''); 
  const [loading, setLoading] = useState(''); 



  useEffect(() => {
     console.log('Hoo you okay')
    // change();
    // readall();  
    // allUsers();
    getDocs(collection(db, "users")).then(docSnap =>{
      let users =[];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', users);
      setUsers(users);
      console.log(users)
  });

  },[])
  

  
  console.log(timer)






  function update () {
    updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Updated....");
alert("Updated")
  }




  
 













  




 

  function log_in() {
    if (!users) {
      alert('pls WAIT Loading')
    } else {
      console.log(users);

      const pass = users.filter(d => d.password == 1234 && d.username == "Atunde");
      console.log("Passed",pass);

      if(pass == ''){
          console.log('Access denied')
      }else {
          console.log('passed')
          const user = (pass[0])
          const username = (user.username)
          navigation.push("Details", {
            username: username,
            userdata:user
          });
          console.log('username', user.username )
      }

      

    //   const myJSON = JSON.stringify(checkName)
    //   console.log(myJSON)
    }
   
  }




  //   return (
  //     <TailwindProvider>
  //       <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
  //         <View className="mt-10 flex-1  ">
  //           <View className="">
  //           <View className=" items-center">
  //             <Text className="font-bold pb-2">RESET CLOCK</Text>
  //           </View>
  //           <View>
  //           <Button title="Go Back" onPress={() => navigation.goBack()} />
  //         </View>
  //         <View className=" flex w-[90%] items center pt-20 pb-5">
  //           <Text>ENTER SECURE PASSWORD TO RESET CLOCK TO DATE</Text>
  //         </View>
  //         <View className=" flex w-[90%] items center ">
  //           <Text>NB: Ask your department admin</Text>
  //         </View>
  //         </View>
  //         </View>
  //       </View>
  //     </TailwindProvider>
  //   );
  // }
  const getData = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
      console.log(json.movies)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



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
    
        <View className="flex-1 justify-center items-center bg-[#48015c] font-bold ">
        
          <View className="mt-10 flex-1  ">
            <View className="">
              <View className=" items-center">
                <Text className="font-bold mb-5 mt-10 text-white">
                  RESET CLOCK
                </Text>
              </View>
              <View>
                <Button title="Go Back" onPress={() => navigation.goBack()} />
              </View>
              <View className=" flex w-[90%] items center pt-20 pb-5 ">
                <Text className="text-white">
                  ENTER SECURE PASSWORD TO RESET CLOCK TO DATE
                </Text>
              </View>
              <View className=" flex w-[90%] items center ">
                <Text className="text-white">
                  NB: Ask your department admin
                </Text>
              </View>
              <View className="mt-20 flex">
                <Button title="FETCH DATA FROM AN API" onPress={getData} />
                <Text className="mt-4"> Fetching the following data from </Text>
                <Text> https://reactnative.dev/movies.json</Text>
                <View className="">
                  {loading ?  <ActivityIndicator
                    size="large"
                    color="#050112"
                    className="mt-20 pt-20"
                  /> : 
                  <FlatList data={data}
                  renderItem={({item}) => 
                  <View className="flex-1 justify-center items-center font-bold">
                    <View className="mt-10 flex-row items-center ">
                     
                  <Text className="text-white">{item.id} </Text>
                  <Text className="text-white">{item.title} </Text>
                  </View>
                  
                  </View>
                  
        
                  
                
                
                }/>
          

          
        
        
       
                  
                  
                  }
                 
                </View>
              </View>
             
            </View>
          </View>
        </View>
       
      </TailwindProvider>
     
    );
  }
};






export default ResetClock