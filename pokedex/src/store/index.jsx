import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./slices/name.slice"; //importante no importar con llaves

export default configureStore({
  reducer: {
    name: nameSlice
  }
});
//  Colocamos la estructura básica de la store