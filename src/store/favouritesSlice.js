import { createSlice } from "@reduxjs/toolkit";
import { db } from "../auth/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
        addDoc(collection(db, "users", user.uid, "favourites"), action.payload)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        console.error("No user is signed in");
      }
    },
    clearFavourites(state) {
      state.favourites = [];
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.name.common !== action.payload.name.common
      );
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
