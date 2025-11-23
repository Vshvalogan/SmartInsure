// src/components/premiumCalculators.js

// 1. LIFE INSURANCE
// Premium = Base × (1 + AgeFactor + HealthFactor + CoverageFactor)
// AgeFactor = age / (55 - 18) = age / 37
// HealthFactor = healthRiskCount * 0.25  (max 1.0)
// CoverageFactor = (coverageAmount / baseCoverage) * 0.10

export function calcLifePremium({ basePremium, age, healthRiskCount, coverageAmount, baseCoverage }) {
  if (!basePremium) return 0;

  const ageFactor = age > 0 ? age / 37 : 0;

  let healthFactor = (healthRiskCount || 0) * 0.25;
  if (healthFactor > 1) healthFactor = 1;

  const usedBaseCoverage = baseCoverage || 100000;
  const coverageFactor =
    coverageAmount && usedBaseCoverage
      ? (coverageAmount / usedBaseCoverage) * 0.1
      : 0;

  const factor = 1 + ageFactor + healthFactor + coverageFactor;
  return Math.round(basePremium * factor);
}

// 2. HEALTH INSURANCE
// Premium = Base × (1 + AgeFactor + BMI_Factor + DiseaseFactor + SmokerFactor)
// AgeFactor = age / 60
// BMI_Factor = 0 if BMI < 25, (BMI - 25)*0.02 if BMI >= 25
// DiseaseFactor = 0.20 if "yes"
// SmokerFactor  = 0.15 if "yes"

export function calcHealthPremium({ basePremium, age, bmi, preExisting, smoker }) {
  if (!basePremium) return 0;

  const ageFactor = age > 0 ? age / 60 : 0;

  let bmiFactor = 0;
  if (bmi >= 25) {
    bmiFactor = (bmi - 25) * 0.02;
  }

  const diseaseFactor =
    typeof preExisting === "string" && preExisting.toLowerCase() === "yes"
      ? 0.2
      : 0;

  const smokerFactor =
    typeof smoker === "string" && smoker.toLowerCase() === "yes" ? 0.15 : 0;

  const factor = 1 + ageFactor + bmiFactor + diseaseFactor + smokerFactor;
  return Math.round(basePremium * factor);
}

// 3. VEHICLE INSURANCE
// Premium = Base × (1 + VehicleAgeFactor + AccidentFactor + VehicleValueFactor)
// VehicleAgeFactor = (currentYear - year) / 20
// AccidentFactor = accident_history * 0.10
// VehicleValueFactor = vehicle_value / 200000

export function calcVehiclePremium({ basePremium, year, accidentCount, vehicleValue }) {
  if (!basePremium) return 0;

  const currentYear = new Date().getFullYear();
  const vehicleAge = year ? currentYear - year : 0;
  const ageFactor = vehicleAge > 0 ? vehicleAge / 20 : 0;

  const accidentFactor = (accidentCount || 0) * 0.1;
  const valueFactor = vehicleValue ? vehicleValue / 200000 : 0;

  const factor = 1 + ageFactor + accidentFactor + valueFactor;
  return Math.round(basePremium * factor);
}

// 4. HOME INSURANCE
// Premium = Base × (1 + PropertyAgeFactor + ResidentsFactor + FireSafetyFactor + ValueFactor)
// PropertyAgeFactor = (currentYear - yearBuilt) / 40
// ResidentsFactor = residents * 0.05
// FireSafetyFactor = 0.20 if fire_safety = "no"
// ValueFactor = property_value / 1_000_000

export function calcHomePremium({ basePremium, yearBuilt, residents, fireSafety, propertyValue }) {
  if (!basePremium) return 0;

  const currentYear = new Date().getFullYear();
  const propertyAge = yearBuilt ? currentYear - yearBuilt : 0;
  const propertyAgeFactor = propertyAge > 0 ? propertyAge / 40 : 0;

  const residentsFactor = (residents || 0) * 0.05;

  const fireSafetyFactor =
    typeof fireSafety === "string" && fireSafety.toLowerCase() === "no"
      ? 0.2
      : 0;

  const valueFactor = propertyValue ? propertyValue / 1000000 : 0;

  const factor =
    1 + propertyAgeFactor + residentsFactor + fireSafetyFactor + valueFactor;
  return Math.round(basePremium * factor);
}

// 5. TRAVEL INSURANCE
// Premium = Base × (1 + AgeFactor + DurationFactor + RiskCountryFactor + MedicalFactor)
// AgeFactor = age / 70
// DurationFactor = duration_days * 0.02
// RiskCountryFactor = 0.50 if in list
// MedicalFactor = 0.25 if yes

const RISK_COUNTRIES = [
  "afghanistan",
  "syria",
  "iraq",
  "north korea",
  "somalia",
  "yemen",
  "ukraine",
  "sudan",
  "congo",
  "russia",
  "lebanon",
  "iran",
];

export function calcTravelPremium({ basePremium, age, durationDays, destination, medicalHistory }) {
  if (!basePremium) return 0;

  const ageFactor = age > 0 ? age / 70 : 0;
  const durationFactor = (durationDays || 0) * 0.02;

  const isRiskCountry = destination
    ? RISK_COUNTRIES.includes(destination.toLowerCase())
    : false;
  const riskCountryFactor = isRiskCountry ? 0.5 : 0;

  const medicalFactor =
    typeof medicalHistory === "string" &&
    medicalHistory.toLowerCase() === "yes"
      ? 0.25
      : 0;

  const factor =
    1 + ageFactor + durationFactor + riskCountryFactor + medicalFactor;
  return Math.round(basePremium * factor);
}
