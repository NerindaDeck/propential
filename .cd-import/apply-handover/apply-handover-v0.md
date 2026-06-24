# Propential Apply — backend handover (v0 wiring) prompt

Generated from `apply-schema.js` (the live form’s single source of truth). Map every input’s `name` → `data-fs-id` into `lib/apply-mapping.ts` `FIELD_IDS` for Formstack form **4653616** ("LIVE APP FORM - Reno Now"). Do NOT invent field IDs — use only those below.

**Front-end only — posts NOWHERE.** On submit the form collects every field into one JS object keyed by `name`, `console.log`s it, and shows a success screen. Every input carries its `data-fs-id`. Conditional fields are excluded from validation and cleared while hidden.

## Field map (156 data fields)

| Step | Label | Control type | name (variable) | data-fs-id | Options (verbatim) | Required? | Conditional rule |
|---|---|---|---|---|---|---|---|
| 1. Purpose | What is the purpose of the funds you would like to borrow? | radio | purpose | 119531975 | Home renovation \| Investment property renovation | Yes | — |
| 1. Purpose | What's the project? | multi-checkbox | project | 119531976 | Kitchen \| Bathroom \| Pool \| Interiors \| Fencing \| Landscaping \| Roofing \| Other | No | — |
| 1. Purpose | Amount you'd like to borrow $ | number ($) min 5000 max 175000 | amount | 119531977 | — | Yes | — |
| 1. Purpose | Preferred term | single-select (dynamic 1-7 / up to 10 if amount>50000) | term | 122580887 | 1 Year \| 2 Years \| 3 Years \| 4 Years \| 5 Years \| 6 Years \| 7 Years | Yes | — |
| 2. Your details | Title | single-select | title | 119531978 | Ms. \| Mrs. \| Mr. \| Dr. \| Prefer not to say | Yes | — |
| 2. Your details | First name | text | firstName | 119531979 | — | Yes | — |
| 2. Your details | Middle name | text | middleName | 119531980 | — | No | — |
| 2. Your details | Last name | text | lastName | 119531981 | — | Yes | — |
| 2. Your details | Date of birth | date (dobAdult) | dob | 119532165 | — | Yes | — |
| 2. Your details | Email | email (email) | email | 119531982 | — | Yes | — |
| 2. Your details | Mobile | tel (auMobile) | phone | 119531983 | — | Yes | — |
| 2. Your details | Is this a joint application? | radio | joint | 119531988 | No \| Yes | Yes | — |
| 2. Your details | What's their name? | text | jointName | 119531989 | — | Yes | joint = "Yes" |
| 2. Your details | Enter their email | email (email) | jointEmail | 119531990 | — | Yes | joint = "Yes" |
| 3. Employment | Employment status | radio | employment | 119531993 | Full time \| Part time \| Casual/Temp \| Contractor \| Self-employed \| Stay-at-home partner \| Retired \| Unemployed | Yes | — |
| 3. Employment | Industry sector related to your main employment | single-select | industry | 119531995 | Agriculture \| Apparel \| Banking \| Biotechnology \| Chemicals \| Communications \| Construction \| Education \| Electronics \| Energy \| Engineering \| Entertainment \| Environmental \| Finance \| Food & Beverage \| Government \| Hair & Beauty \| Healthcare \| Hospitality \| Insurance \| Machinery \| Manufacturing \| Media \| Mining \| Not For Profit \| Other \| Recreation \| Retail \| Shipping \| Technology \| Telecommunications \| Transportation \| Utilities | Yes | employment not in {Unemployed, Retired, Stay-at-home partner} |
| 3. Employment | Job title | type-ahead | jobTitle | 119531997 | — | Yes | employment not in {Unemployed, Retired, Stay-at-home partner} |
| 3. Employment | How long have you worked here? | radio | jobTenure | 119531998 | 2 years or more \| Between 1 and 2 years \| Between 3 and 12 months \| Less than 3 months | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} |
| 3. Employment | Employer business name | text | employerName | 119531999 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} |
| 3. Employment | Previous employment job title | type-ahead | prevJobTitle | 119532001 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} AND jobTenure in {Between 1 and 2 years, Between 3 and 12 months, Less than 3 months} |
| 3. Employment | Previous employer business name | text | prevEmployerName | 119532002 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} AND jobTenure in {Between 1 and 2 years, Between 3 and 12 months, Less than 3 months} |
| 3. Employment | How long have you been self employed? | radio | selfEmployedTenure | 119532004 | 2 years or more \| Between 1 and 2 years \| Between 3 and 12 months \| Less than 3 months | Yes | employment = "Self-employed" |
| 3. Employment | Business name | text | businessName | 119532005 | — | Yes | employment = "Self-employed" |
| 3. Employment | Business ABN | text 11 digits | businessAbn | 119532006 | — | Yes | employment = "Self-employed" |
| 4. Home address | Home address | address | resAddress | 119532010 | 5 sub-inputs: resAddress_address, _address2, _city, _state, _zip | Yes | — |
| 4. Home address | How long have you lived at this address? | radio | addressTenure | 119532012 | 2 years or longer \| Less than 2 years | Yes | — |
| 4. Home address | Previous address | address | prevAddress | 119532014 | 5 sub-inputs: prevAddress_address, _address2, _city, _state, _zip | Yes | addressTenure = "Less than 2 years" |
| 4. Home address | What is your home ownership status? | radio | ownership | 119532015 | Renting \| I own it - paying off mortgage \| I own it - mortgage already paid \| Not paying rent- living with family \| Other | Yes | — |
| 4. Home address | Explain your home ownership status | text | ownershipOther | 119532016 | — | Yes | ownership = "Other" |
| 4. Home address | What is the estimated value of your home? | number ($) | homeValue | 119532017 | — | Yes | — |
| 4. Home address | What is the amount owing on your mortgage? | number ($) | mortBalance | 119532060 | — | Yes | — |
| 4. Home address | Relationship status | radio | relationship | 119532018 | Single \| De facto \| Married \| Divorced or separated \| Widowed | Yes | — |
| 5. Your property | Is your home address the property these funds are for? | radio | renoIsHome | 119532011 | No \| Yes | Yes | — |
| 5. Your property | What is the address of the property? | address | propAddress | 119533819 | 5 sub-inputs: propAddress_address, _address2, _city, _state, _zip | Yes | renoIsHome = "No" |
| 5. Your property | Are you on title of the property these funds are for? | radio | onTitle | 119534299 | No \| Yes | Yes | — |
| 5. Your property | Please explain who owns the property (i.e. who is on title) | text | titleOwner | 119534366 | — | Yes | onTitle = "No" |
| 5. Your property | What is your monthly rental income from this property? | number ($) | propRentalIncome | 119534508 | — | Yes | — |
| 5. Your property | Do you have a loan (mortgage) on the property? | radio | propHasLoan | 119535325 | No \| Yes | Yes | — |
| 5. Your property | Amount owing on the loan | number ($) | propLoanOwing | 119535527 | — | Yes | propHasLoan = "Yes" |
| 5. Your property | Monthly loan repayments | number ($) | propLoanRepayment | 119535791 | — | Yes | propHasLoan = "Yes" |
| 5. Your property | Estimated value of this property | number ($) | propValue | 119633192 | — | Yes | — |
| 6. Income | What is your gross annual salary (before tax or super)? | number ($) min 25000 | income | 119532022 | — | Yes | — |
| 6. Income | How often do you get paid? | radio | payFrequency | 119532023 | Weekly \| Fortnightly \| Monthly | Yes | — |
| 6. Income | Do you receive a payment from Centrelink? | radio | centrelink | 119532024 | No \| Yes | Yes | — |
| 6. Income | Centrelink payment 1 type | single-select | cl1Type | 119532026 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | centrelink = "Yes" |
| 6. Income | Centrelink payment 1 fortnightly amount | number ($) | cl1Amount | 119532027 | — | Yes | centrelink = "Yes" |
| 6. Income | Add another Centrelink payment | checkbox (repeat toggle) | addCl2 | 119532028 | value: "Add another Centrelink payment" | No | centrelink = "Yes" |
| 6. Income | Centrelink payment 2 type | single-select | cl2Type | 119532030 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | centrelink = "Yes" AND addCl2 checked |
| 6. Income | Centrelink payment 2 fortnightly amount | number ($) | cl2Amount | 119532031 | — | Yes | centrelink = "Yes" AND addCl2 checked |
| 6. Income | Add another Centrelink payment | checkbox (repeat toggle) | addCl3 | 119532032 | value: "Add another Centrelink payment" | No | centrelink = "Yes" AND addCl2 checked |
| 6. Income | Centrelink payment 3 type | single-select | cl3Type | 119532034 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | addCl3 checked |
| 6. Income | Centrelink payment 3 fortnightly amount | number ($) | cl3Amount | 119532035 | — | Yes | addCl3 checked |
| 6. Income | Do you have any other source of income? | radio | otherIncome | 119532037 | No \| Yes | Yes | — |
| 6. Income | Source 1 type | single-select | src1Type | 119532039 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | otherIncome = "Yes" |
| 6. Income | Source 1 monthly amount | number ($) | src1Amount | 119532040 | — | Yes | otherIncome = "Yes" |
| 6. Income | Add another source of income | checkbox (repeat toggle) | addSrc2 | 119532041 | value: "Add another source of income" | No | otherIncome = "Yes" |
| 6. Income | Source 2 type | single-select | src2Type | 119532043 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | otherIncome = "Yes" AND addSrc2 checked |
| 6. Income | Source 2 monthly amount | number ($) | src2Amount | 119532044 | — | Yes | otherIncome = "Yes" AND addSrc2 checked |
| 6. Income | Add another source of income | checkbox (repeat toggle) | addSrc3 | 119532045 | value: "Add another source of income" | No | otherIncome = "Yes" AND addSrc2 checked |
| 6. Income | Source 3 type | single-select | src3Type | 119532047 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | addSrc3 checked |
| 6. Income | Source 3 monthly amount | number ($) | src3Amount | 119532048 | — | Yes | addSrc3 checked |
| 7. Expenses & commitments | General household monthly living expenses | number ($) | generalExpenses | 119532050 | — | Yes | — |
| 7. Expenses & commitments | Total household monthly living expenses | number ($) >= generalExpenses | expenses | 119532052 | — | Yes | — |
| 7. Expenses & commitments | % of total expenses your spouse/partner pays each month | radio | spouseExpensePct | 119532053 | From 0% - 19% \| From 20% - 49% \| 50% or more | Yes | — |
| 7. Expenses & commitments | How often do you pay rent or mortgage on your home? | radio | rentFrequency | 119532056 | Weekly \| Fortnightly \| Monthly | Yes | — |
| 7. Expenses & commitments | How much rent or mortgage do you pay each time? Include your partner or spouse contribution (if any). | number ($) | rentAmount | 119532057 | — | Yes | — |
| 7. Expenses & commitments | % of rent/mortgage your spouse/partner pays each time | radio | spouseRentPct | 119532058 | From 0% - 19% \| From 20% - 49% \| 50% or more | No | — |
| 7. Expenses & commitments | Do you expect any significant change to your financial situation over the next 6 to 12 months that would ADVERSELY impact your ability to meet loan repayments? | radio | adverseChange | 119532062 | No \| Yes | Yes | — |
| 8. Assets & liabilities | Do you own any other investment property? | radio | investmentProperty | 119532064 | No \| Yes | Yes | — |
| 8. Assets & liabilities | Property 1: monthly rental income | number ($) | ip1Rental | 119532066 | — | Yes | investmentProperty = "Yes" |
| 8. Assets & liabilities | Property 1: making mortgage repayments? | radio | ip1HasMortgage | 119532067 | No \| Yes | No | investmentProperty = "Yes" |
| 8. Assets & liabilities | Property 1: monthly mortgage repayment | number ($) | ip1Repayment | 119532068 | — | Yes | investmentProperty = "Yes" AND ip1HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 1: amount owing on mortgage | number ($) | ip1Owing | 119532069 | — | Yes | investmentProperty = "Yes" AND ip1HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 1: estimated value | number ($) | ip1Value | 119532070 | — | Yes | investmentProperty = "Yes" |
| 8. Assets & liabilities | Add another property | checkbox (repeat toggle) | addIp2 | 119532074 | value: "Add another property" | No | investmentProperty = "Yes" |
| 8. Assets & liabilities | Property 2: monthly rental income | number ($) | ip2Rental | 119532076 | — | Yes | addIp2 checked |
| 8. Assets & liabilities | Property 2: making mortgage repayments? | radio | ip2HasMortgage | 119532077 | No \| Yes | No | addIp2 checked |
| 8. Assets & liabilities | Property 2: monthly mortgage repayment | number ($) | ip2Repayment | 119532078 | — | Yes | addIp2 checked AND ip2HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 2: amount owing | number ($) | ip2Owing | 119532079 | — | Yes | addIp2 checked AND ip2HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 2: estimated value | number ($) | ip2Value | 119532080 | — | Yes | addIp2 checked |
| 8. Assets & liabilities | Add another property | checkbox (repeat toggle) | addIp3 | 119532084 | value: "Add another property" | No | addIp2 checked |
| 8. Assets & liabilities | Property 3: monthly rental income | number ($) | ip3Rental | 119532086 | — | Yes | addIp3 checked |
| 8. Assets & liabilities | Property 3: making mortgage repayments? | radio | ip3HasMortgage | 119532087 | No \| Yes | No | addIp3 checked |
| 8. Assets & liabilities | Property 3: monthly mortgage repayment | number ($) | ip3Repayment | 119532088 | — | Yes | addIp3 checked AND ip3HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 3: amount owing | number ($) | ip3Owing | 119532089 | — | Yes | addIp3 checked AND ip3HasMortgage = "Yes" |
| 8. Assets & liabilities | Property 3: estimated value | number ($) | ip3Value | 119532090 | — | Yes | addIp3 checked |
| 8. Assets & liabilities | Do you own any other non-property assets? | radio | otherAssets | 119532095 | No \| Yes | Yes | — |
| 8. Assets & liabilities | Asset 1: type | single-select | asset1Type | 119532097 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | otherAssets = "Yes" |
| 8. Assets & liabilities | Asset 1: estimated value | number ($) | asset1Value | 119532098 | — | Yes | otherAssets = "Yes" |
| 8. Assets & liabilities | Add other asset | checkbox (repeat toggle) | addAsset2 | 119532099 | value: "Add other asset" | No | otherAssets = "Yes" |
| 8. Assets & liabilities | Asset 2: type | single-select | asset2Type | 119532101 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset2 checked |
| 8. Assets & liabilities | Asset 2: estimated value | number ($) | asset2Value | 119532102 | — | Yes | addAsset2 checked |
| 8. Assets & liabilities | Add other asset | checkbox (repeat toggle) | addAsset3 | 119532103 | value: "Add other asset" | No | addAsset2 checked |
| 8. Assets & liabilities | Asset 3: type | single-select | asset3Type | 119532105 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset3 checked |
| 8. Assets & liabilities | Asset 3: estimated value | number ($) | asset3Value | 119532106 | — | Yes | addAsset3 checked |
| 8. Assets & liabilities | Add other asset | checkbox (repeat toggle) | addAsset4 | 119532107 | value: "Add other asset" | No | addAsset3 checked |
| 8. Assets & liabilities | Asset 4: type | single-select | asset4Type | 119532109 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset4 checked |
| 8. Assets & liabilities | Asset 4: estimated value | number ($) | asset4Value | 119532110 | — | Yes | addAsset4 checked |
| 8. Assets & liabilities | Do you have credit cards? | radio | creditCards | 119532112 | No \| Yes | Yes | — |
| 8. Assets & liabilities | Card 1: provider | single-select | card1Provider | 119532114 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | creditCards = "Yes" |
| 8. Assets & liabilities | Card 1: credit limit | number ($) | card1Limit | 119532115 | — | Yes | creditCards = "Yes" |
| 8. Assets & liabilities | Card 1: amount owing | number ($) | card1Owing | 119532116 | — | Yes | creditCards = "Yes" |
| 8. Assets & liabilities | Add another credit card | checkbox (repeat toggle) | addCard2 | 119532117 | value: "Add another credit card" | No | creditCards = "Yes" |
| 8. Assets & liabilities | Card 2: provider | single-select | card2Provider | 119532119 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard2 checked |
| 8. Assets & liabilities | Card 2: credit limit | number ($) | card2Limit | 119532120 | — | Yes | addCard2 checked |
| 8. Assets & liabilities | Card 2: amount owing | number ($) | card2Owing | 119532121 | — | Yes | addCard2 checked |
| 8. Assets & liabilities | Add another credit card | checkbox (repeat toggle) | addCard3 | 119532122 | value: "Add another credit card" | No | addCard2 checked |
| 8. Assets & liabilities | Card 3: provider | single-select | card3Provider | 119532124 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard3 checked |
| 8. Assets & liabilities | Card 3: credit limit | number ($) | card3Limit | 119532125 | — | Yes | addCard3 checked |
| 8. Assets & liabilities | Card 3: amount owing | number ($) | card3Owing | 119532126 | — | Yes | addCard3 checked |
| 8. Assets & liabilities | Add another credit card | checkbox (repeat toggle) | addCard4 | 119532127 | value: "Add another credit card" | No | addCard3 checked |
| 8. Assets & liabilities | Card 4: provider | single-select | card4Provider | 119532129 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard4 checked |
| 8. Assets & liabilities | Card 4: credit limit | number ($) | card4Limit | 119532130 | — | Yes | addCard4 checked |
| 8. Assets & liabilities | Card 4: amount owing | number ($) | card4Owing | 119532131 | — | Yes | addCard4 checked |
| 8. Assets & liabilities | Add another credit card | checkbox (repeat toggle) | addCard5 | 119532132 | value: "Add another credit card" | No | addCard4 checked |
| 8. Assets & liabilities | Card 5: provider | single-select | card5Provider | 119532134 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard5 checked |
| 8. Assets & liabilities | Card 5: credit limit | number ($) | card5Limit | 119532135 | — | Yes | addCard5 checked |
| 8. Assets & liabilities | Card 5: amount owing | number ($) | card5Owing | 119532136 | — | Yes | addCard5 checked |
| 8. Assets & liabilities | Do you have any other debt? | radio | otherDebt | 119532138 | No \| Yes | Yes | — |
| 8. Assets & liabilities | Debt 1: type | single-select | debt1Type | 119532140 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | otherDebt = "Yes" |
| 8. Assets & liabilities | Debt 1: amount still owing | number ($) | debt1Owing | 119532141 | — | Yes | otherDebt = "Yes" |
| 8. Assets & liabilities | Debt 1: monthly repayment | number ($) | debt1Repayment | 119532142 | — | Yes | otherDebt = "Yes" |
| 8. Assets & liabilities | Add another debt | checkbox (repeat toggle) | addDebt2 | 119532143 | value: "Add another debt" | No | otherDebt = "Yes" |
| 8. Assets & liabilities | Debt 2: type | single-select | debt2Type | 119532145 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt2 checked |
| 8. Assets & liabilities | Debt 2: amount owing | number ($) | debt2Owing | 119532146 | — | Yes | addDebt2 checked |
| 8. Assets & liabilities | Debt 2: monthly repayment | number ($) | debt2Repayment | 119532147 | — | Yes | addDebt2 checked |
| 8. Assets & liabilities | Add another debt | checkbox (repeat toggle) | addDebt3 | 119532148 | value: "Add another debt" | No | addDebt2 checked |
| 8. Assets & liabilities | Debt 3: type | single-select | debt3Type | 119532150 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt3 checked |
| 8. Assets & liabilities | Debt 3: amount owing | number ($) | debt3Owing | 119532151 | — | Yes | addDebt3 checked |
| 8. Assets & liabilities | Debt 3: monthly repayment | number ($) | debt3Repayment | 119532152 | — | Yes | addDebt3 checked |
| 8. Assets & liabilities | Add another debt | checkbox (repeat toggle) | addDebt4 | 119532153 | value: "Add another debt" | No | addDebt3 checked |
| 8. Assets & liabilities | Debt 4: type | single-select | debt4Type | 119532155 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt4 checked |
| 8. Assets & liabilities | Debt 4: amount owing | number ($) | debt4Owing | 119532156 | — | Yes | addDebt4 checked |
| 8. Assets & liabilities | Debt 4: monthly repayment | number ($) | debt4Repayment | 119532157 | — | Yes | addDebt4 checked |
| 8. Assets & liabilities | Add another debt | checkbox (repeat toggle) | addDebt5 | 119532158 | value: "Add another debt" | No | addDebt4 checked |
| 8. Assets & liabilities | Debt 5: type | single-select | debt5Type | 119532160 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt5 checked |
| 8. Assets & liabilities | Debt 5: amount owing | number ($) | debt5Owing | 119532161 | — | Yes | addDebt5 checked |
| 8. Assets & liabilities | Debt 5: monthly repayment | number ($) | debt5Repayment | 119532162 | — | Yes | addDebt5 checked |
| 9. Identity & verification | Do you have an Australian driver's license? | radio | hasLicense | 119532166 | No \| Yes | Yes | — |
| 9. Identity & verification | Driver's license state | radio | idIssuedState | 119532167 | NSW \| ACT \| QLD \| VIC \| SA \| NT \| TAS \| WA | Yes | hasLicense = "Yes" |
| 9. Identity & verification | Driver's license number | text | idNumber | 119532168 | — | Yes | hasLicense = "Yes" |
| 9. Identity & verification | Medicare card number | number 10-11 digits | medicareNumber | 119532169 | — | Yes | — |
| 9. Identity & verification | What colour is your Medicare card? | radio | medicareColour | 119532171 | Green \| Blue \| Yellow | Yes | — |
| 9. Identity & verification | Medicare card expiry (valid to) date | date (futureDate) | medicareExpiry | 119532172 | — | Yes | — |
| 9. Identity & verification | How many dependants do you have? | radio | dependants | 119532173 | 0 \| 1 \| 2 \| 3 \| 4 or more | Yes | — |
| 9. Identity & verification | Dependant 1: age | number | dep1Age | 119532175 | — | Yes | dependants in {1, 2, 3, 4 or more} |
| 9. Identity & verification | Dependant 2: age | number | dep2Age | 119532176 | — | Yes | dependants in {2, 3, 4 or more} |
| 9. Identity & verification | Dependant 3: age | number | dep3Age | 119532177 | — | Yes | dependants in {3, 4 or more} |
| 9. Identity & verification | Dependant 4: age | number | dep4Age | 119532178 | — | Yes | dependants in {4 or more} |
| 10. Declarations & consents | You must review and agree to our Privacy & Credit Reporting Policy and Credit Guide before proceeding. | consent-checkbox | consentPrivacy | 119531985 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | I confirm that: | consent-checkbox | consentConfirm | 142285711 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | Are you an Australian citizen or permanent resident? | consent-checkbox | consentCitizen | 119532181 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | Do you declare all the information that you have provided in this application to be true and correct? | consent-checkbox | consentAccuracy | 119532182 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | Do you give us consent to check your credit history and verify your identity? | consent-checkbox | consentCredit | 119532183 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | Do you give us consent to send you notices and documents electronically and signing documents electronically? | consent-checkbox | consentElectronic | 119532184 | value (verbatim) — see consent list | Yes | — |
| 10. Declarations & consents | Biometric information | consent-checkbox | consentBiometric | 125695752 | value (verbatim) — see consent list | Yes | — |

## Hidden tracking inputs

| name | data-fs-id | source |
|---|---|---|
| utmSource | 119532186 | URL param ?utm_source |
| utmMedium | 119532187 | URL param ?utm_medium |
| utmContent | 119532188 | URL param ?utm_content |
| utmCampaign | 119532189 | URL param ?utm_campaign |
| gclid | 119532190 | URL param ?gclid |
| productName | 119531974 | fixed value "Reno Now" |

## Address fields — sub-inputs

Each `address` renders 5 inputs; the parent `data-fs-id` sits on the wrapping `<fieldset>`. Names: `X_address` (street, required), `X_address2` (optional), `X_city` (required), `X_state` (single-select NSW/ACT/QLD/VIC/SA/NT/TAS/WA, required), `X_zip` (4-digit, required). Fields: resAddress (119532010), prevAddress (119532014), propAddress (119533819). The street line carries `data-address-ac` for Google Places (fills all 5 when a key is set; plain text otherwise). When `renoIsHome = "Yes"`, resAddress_* is copied into propAddress_* at submit.

## Consent checkboxes — verbatim `value` strings

Each consent input `value` equals the EXACT Formstack string (curly apostrophes and "RenoNow" intact). The visible text shows Propential / MediPay; the submitted `value` is untouched. All required.

- **consentPrivacy** (data-fs-id 119531985): `Privacy Consent: By checking this box, I confirm that I have accessed RenoNow’s Privacy Policy and Credit Reporting Policy by clicking on the link shown above and reviewed, understand and consent to RenoNow, its related bodies corporate, affiliates and agents, and other nominated entities collecting, using, holding and disclosing personal information and credit-related information about me as set out in the privacy policy. If you do not consent, we may not be able to proceed with your application.`
- **consentConfirm** (data-fs-id 142285711): `I confirm that:` — displayed with bullets: “The property being renovated is located in Australia”; “Improvements being done are for residential dwellings (not commercial purposes)”; “The property is not vacant land”; “The property is substantially free of material damage and from material contamination by toxic or hazardous substances.”
- **consentCitizen** (data-fs-id 119532181): `Yes`
- **consentAccuracy** (data-fs-id 119532182): `Yes, I declare all information that I have provided in this application is true and correct.`
- **consentCredit** (data-fs-id 119532183): `Yes, I give RenoNow consent to give my personal and credit information to credit reporting agencies, including Equifax, for the purpose of obtaining a consumer and commercial credit eligibility report about me to assess my creditworthiness, and to otherwise deal with any information I provide in accordance with your Privacy Policy and Credit Reporting Policy. I understand that obtaining of the credit eligibility report may impact my credit score. I also consent to my personal details being checked with the document issuer or official record holder (e.g. Government agency) via a third party (e.g. an identity checking service) for RenoNow to verify my identity.`
- **consentElectronic** (data-fs-id 119532184): `You consent to be given notices and other documents in connection with our dealings with you electronically (including by email to your address provided). By consenting, you warrant that you have an ability to save and print the documents, and you understand that: (a) paper documents may no longer be given; and (b) electronic communications must be regularly checked for documents; and (c) consent to the giving of documents by electronic communication may be withdrawn at any time.`
- **consentBiometric** (data-fs-id 125695752): `I acknowledge and consent to the collection and use of my biometric information by you or your agent for authentication/ verification purposes and that my biometric information will be collected and stored in accordance with your Privacy and Credit Reporting Policy and your obligations under Privacy Act 1988 and Privacy Principles and any other applicable law. I understand that this information will not be used or disclosed for any other purpose.`

## Deviations from the original spec (intentional, per client review)

- **employmentDetail (119531994)** is now a SECTION HEADING ("Provide more detail about your employment status"), not a text input — it submits no value. Shown only when employment is an employed/self-employed type.
- **project (119531976)** options extended to: Kitchen, Bathroom, Pool, Interiors, Fencing, Landscaping, Roofing, Other. The four non-original values (Interiors/Fencing/Landscaping/Roofing) must be added to the Formstack field to map.
- **term (122580887)** now offers up to **10 Years** when amount > $50,000 (1–7 Years at or below $50,000). 8/9/10 Years are new option values that must be added to the Formstack field.
- **consentConfirm (142285711)** is shown as "I confirm that:" followed by four property declarations (Australia / residential / not vacant land / free of material damage). Submitted `value` stays "I confirm that:".
- **Employment show/hide:** job tenure + employer name show only for Full time / Part time / Casual/Temp / Contractor; the self-employed tenure/business/ABN fields show only for Self-employed; industry + job title show for any employed or self-employed type.
- **Validation added:** amount min $5,000 / max $175,000; income min $25,000.

Everything else (names/ids, option text, FS IDs) matches the build spec verbatim. The form posts nowhere and every input carries its `data-fs-id`.
