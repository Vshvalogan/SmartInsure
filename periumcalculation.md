1. LIFE INSURANCE PREMIUM FORMULA

Final Formula:
Premium = Base Premium × (1 + AgeFactor + HealthFactor + CoverageFactor)

AgeFactor:
age / (55 – 18)

HealthFactor:
There are 4 health risk conditions.  
Each risk adds 0.25.  
HealthFactor = number_of_health_risks * 0.25  
(Max = 1.0)

CoverageFactor:
(coverage_amount / base_coverage) × 0.10

Final Formula:
Premium = Base Premium × (1 + AgeFactor + BMI_Factor + DiseaseFactor + SmokerFactor)

2. HEALTH INSURANCE PREMIUM FORMULA

AgeFactor:
age / 60

BMI_Factor:
0.0 if BMI < 25  
(BMI - 25) × 0.02 if BMI ≥ 25

DiseaseFactor:
0.20 if pre_existing_disease = "yes"  
0.00 otherwise

SmokerFactor:
0.15 if smoker = "yes"  
0.00 otherwise

3. VEHICLE INSURANCE PREMIUM FORMULA

Final Formula:
Premium = Base Premium × (1 + VehicleAgeFactor + AccidentFactor + VehicleValueFactor)

VehicleAgeFactor:
VehicleAge = CurrentYear - YearOfManufacture  
VehicleAgeFactor = VehicleAge / 20

AccidentFactor:
accident_history × 0.10

VehicleValueFactor:
vehicle_value / 200000

4. HOME INSURANCE PREMIUM FORMULA

Final Formula:
Premium = Base Premium × (1 + PropertyAgeFactor + ResidentsFactor + FireSafetyFactor + ValueFactor)

PropertyAgeFactor:
PropertyAge = CurrentYear - YearBuilt  
PropertyAgeFactor = PropertyAge / 40

ResidentsFactor:
residents × 0.05

FireSafetyFactor:
0.20 if fire_safety = "no"  
0.00 otherwise

ValueFactor:
property_value / 1,000,000

5. TRAVEL INSURANCE PREMIUM FORMULA

Risk Countries = [
  "Afghanistan",
  "Syria",
  "Iraq",
  "North Korea",
  "Somalia",
  "Yemen",
  "Ukraine",
  "Sudan",
  "Congo",
  "Russia",
  "Lebanon",
  "Iran",
]

Final Formula:
Premium = Base Premium × (1 + AgeFactor + DurationFactor + RiskCountryFactor + MedicalFactor)

AgeFactor:
age / 70

DurationFactor:
duration_days × 0.02

RiskCountryFactor:
0.50 if destination is in risk country list  
0.00 otherwise

Medical Condition:
0.25 if yes
0.00 otherwise
