import { createSlice } from '@reduxjs/toolkit';
import type { CountriesState } from '@/types/interfaces';
import { COUNTRIES } from '@/constants';

const initialState: CountriesState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
