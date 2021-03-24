import React from "react";
import firebase from "../others/firebase";
import { useRouter } from "next/router";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const [userName, setUserName] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((usuario) => {
      setUser(usuario);
      if (usuario) {
        firebase
          .firestore()
          .collection("users")
          .doc(usuario.uid)
          .get()
          .then((resp) => {
            setUserName(resp.data().apelido);
          });
      }
    });
  }, []);

  const [erro, setErro] = React.useState(null);

  async function signIn(email, senha, apelido) {
    try {
      const createResponse = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha);
      firebase
        .firestore()
        .collection("users")
        .doc(createResponse.user.uid)
        .set({ apelido });
      setErro(null);
      router.push("");
    } catch (err) {
      setErro(err.message);
    }
  }

  function logOut() {
    firebase.auth().signOut();
  }

  async function logIn(email, senha) {
    try {
      const login = await firebase
        .auth()
        .signInWithEmailAndPassword(email, senha);
      setErro(null);
      router.push("/");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, userName, signIn, logOut, logIn, erro, setErro }}
    >
      {children}
    </UserContext.Provider>
  );
};
