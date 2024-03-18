import { createSlice } from "@reduxjs/toolkit";
import { db } from "../auth/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      if (
        state.favourites.some(
          (favourite) => favourite.name.common === action.payload.name.common
        )
      )
        return;

      state.favourites = [...state.favourites, action.payload];

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setDoc(
          doc(db, "users", user.uid, "favourites", action.payload.name.common),
          action.payload
        )
          .then(() => {})
          .catch(() => {});
      }
    },
    clearFavourites(state) {
      state.favourites = [];
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const favsRef = collection(db, "users", user.uid, "favourites");
        getDocs(favsRef)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              deleteDoc(doc.ref);
            });
          })
          .catch(() => {});
      }
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.name.common !== action.payload.name.common
      );
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "favourites",
          action.payload.name.common
        );
        deleteDoc(docRef)
          .then(() => {})
          .catch(() => {});
      }
    },
    updateFromFirebase(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const {
  addFavourite,
  clearFavourites,
  removeFavourite,
  updateFromFirebase,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
