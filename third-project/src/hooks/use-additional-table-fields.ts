import { useLocale } from './use-locale';

export default function useAdditionalTableFields() {
  const translations = useLocale();

  return [
    { key: 'gdp', label: translations.tableFields.gdp },
    { key: 'cement_co2', label: translations.tableFields.cementCo2 },
    { key: 'cement_co2_per_capita', label: translations.tableFields.cementCo2PerCapita },
    { key: 'co2_growth_abs', label: translations.tableFields.co2GrowthAbs },
    { key: 'co2_growth_prct', label: translations.tableFields.co2GrowthPrct },
    { key: 'co2_including_luc', label: translations.tableFields.co2IncludingLuc },
    {
      key: 'co2_including_luc_growth_abs',
      label: translations.tableFields.co2IncludingLucGrowthAbs,
    },
    {
      key: 'co2_including_luc_growth_prct',
      label: translations.tableFields.co2IncludingLucGrowthPrct,
    },
    {
      key: 'co2_including_luc_per_capita',
      label: translations.tableFields.co2IncludingLucPerCapita,
    },
    { key: 'co2_including_luc_per_gdp', label: translations.tableFields.co2IncludingLucPerGdp },
    {
      key: 'co2_including_luc_per_unit_energy',
      label: translations.tableFields.co2IncludingLucPerUnitEnergy,
    },
    { key: 'co2_per_gdp', label: translations.tableFields.co2PerGdp },
    { key: 'co2_per_unit_energy', label: translations.tableFields.co2PerUnitEnergy },
    { key: 'coal_co2', label: translations.tableFields.coalCo2 },
    { key: 'coal_co2_per_capita', label: translations.tableFields.coalCo2PerCapita },
    { key: 'oil_co2', label: translations.tableFields.oilCo2 },
    { key: 'oil_co2_per_capita', label: translations.tableFields.oilCo2PerCapita },
    { key: 'gas_co2', label: translations.tableFields.gasCo2 },
    { key: 'gas_co2_per_capita', label: translations.tableFields.gasCo2PerCapita },
    { key: 'flaring_co2', label: translations.tableFields.flaringCo2 },
    { key: 'flaring_co2_per_capita', label: translations.tableFields.flaringCo2PerCapita },
    { key: 'other_industry_co2', label: translations.tableFields.otherIndustryCo2 },
    { key: 'other_co2_per_capita', label: translations.tableFields.otherCo2PerCapita },
    { key: 'consumption_co2', label: translations.tableFields.consumptionCo2 },
    { key: 'consumption_co2_per_capita', label: translations.tableFields.consumptionCo2PerCapita },
    { key: 'consumption_co2_per_gdp', label: translations.tableFields.consumptionCo2PerGdp },
    { key: 'cumulative_co2', label: translations.tableFields.cumulativeCo2 },
    {
      key: 'cumulative_co2_including_luc',
      label: translations.tableFields.cumulativeCo2IncludingLuc,
    },
    { key: 'cumulative_coal_co2', label: translations.tableFields.cumulativeCoalCo2 },
    { key: 'cumulative_oil_co2', label: translations.tableFields.cumulativeOilCo2 },
    { key: 'cumulative_gas_co2', label: translations.tableFields.cumulativeGasCo2 },
    { key: 'cumulative_cement_co2', label: translations.tableFields.cumulativeCementCo2 },
    { key: 'cumulative_flaring_co2', label: translations.tableFields.cumulativeFlaringCo2 },
    { key: 'cumulative_luc_co2', label: translations.tableFields.cumulativeLucCo2 },
    { key: 'cumulative_other_co2', label: translations.tableFields.cumulativeOtherCo2 },
    { key: 'land_use_change_co2', label: translations.tableFields.landUseChangeCo2 },
    {
      key: 'land_use_change_co2_per_capita',
      label: translations.tableFields.landUseChangeCo2PerCapita,
    },
    { key: 'total_ghg', label: translations.tableFields.totalGhg },
    { key: 'total_ghg_excluding_lucf', label: translations.tableFields.totalGhgExcludingLucf },
    { key: 'ghg_per_capita', label: translations.tableFields.ghgPerCapita },
    {
      key: 'ghg_excluding_lucf_per_capita',
      label: translations.tableFields.ghgExcludingLucfPerCapita,
    },
    { key: 'methane', label: translations.tableFields.methane },
    { key: 'methane_per_capita', label: translations.tableFields.methanePerCapita },
    { key: 'nitrous_oxide', label: translations.tableFields.nitrousOxide },
    { key: 'nitrous_oxide_per_capita', label: translations.tableFields.nitrousOxidePerCapita },
    { key: 'primary_energy_consumption', label: translations.tableFields.primaryEnergyConsumption },
    { key: 'energy_per_capita', label: translations.tableFields.energyPerCapita },
    { key: 'energy_per_gdp', label: translations.tableFields.energyPerGdp },
    { key: 'share_global_co2', label: translations.tableFields.shareGlobalCo2 },
    {
      key: 'share_global_co2_including_luc',
      label: translations.tableFields.shareGlobalCo2IncludingLuc,
    },
    { key: 'share_global_coal_co2', label: translations.tableFields.shareGlobalCoalCo2 },
    { key: 'share_global_oil_co2', label: translations.tableFields.shareGlobalOilCo2 },
    { key: 'share_global_gas_co2', label: translations.tableFields.shareGlobalGasCo2 },
    { key: 'share_global_cement_co2', label: translations.tableFields.shareGlobalCementCo2 },
    { key: 'share_global_flaring_co2', label: translations.tableFields.shareGlobalFlaringCo2 },
    { key: 'share_global_other_co2', label: translations.tableFields.shareGlobalOtherCo2 },
    { key: 'share_global_luc_co2', label: translations.tableFields.shareGlobalLucCo2 },
    {
      key: 'share_global_cumulative_co2',
      label: translations.tableFields.shareGlobalCumulativeCo2,
    },
    {
      key: 'share_global_cumulative_co2_including_luc',
      label: translations.tableFields.shareGlobalCumulativeCo2IncludingLuc,
    },
    {
      key: 'share_global_cumulative_coal_co2',
      label: translations.tableFields.shareGlobalCumulativeCoalCo2,
    },
    {
      key: 'share_global_cumulative_oil_co2',
      label: translations.tableFields.shareGlobalCumulativeOilCo2,
    },
    {
      key: 'share_global_cumulative_gas_co2',
      label: translations.tableFields.shareGlobalCumulativeGasCo2,
    },
    {
      key: 'share_global_cumulative_cement_co2',
      label: translations.tableFields.shareGlobalCumulativeCementCo2,
    },
    {
      key: 'share_global_cumulative_flaring_co2',
      label: translations.tableFields.shareGlobalCumulativeFlaringCo2,
    },
    {
      key: 'share_global_cumulative_other_co2',
      label: translations.tableFields.shareGlobalCumulativeOtherCo2,
    },
    {
      key: 'share_global_cumulative_luc_co2',
      label: translations.tableFields.shareGlobalCumulativeLucCo2,
    },
    {
      key: 'temperature_change_from_co2',
      label: translations.tableFields.temperatureChangeFromCo2,
    },
    {
      key: 'temperature_change_from_ch4',
      label: translations.tableFields.temperatureChangeFromCh4,
    },
    {
      key: 'temperature_change_from_n2o',
      label: translations.tableFields.temperatureChangeFromN2o,
    },
    {
      key: 'temperature_change_from_ghg',
      label: translations.tableFields.temperatureChangeFromGhg,
    },
    {
      key: 'share_of_temperature_change_from_ghg',
      label: translations.tableFields.shareOfTemperatureChangeFromGhg,
    },
    { key: 'trade_co2', label: translations.tableFields.tradeCo2 },
    { key: 'trade_co2_share', label: translations.tableFields.tradeCo2Share },
  ];
}
