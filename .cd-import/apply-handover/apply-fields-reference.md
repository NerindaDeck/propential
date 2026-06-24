# Propential Apply — complete field reference

Every field as built, generated from `apply-schema.js`. Columns: label, control, `name`, `data-fs-id`, options, required, conditional visibility, formatting/validation, placeholder, helper text. Edit fields in `apply-schema.js` (single source of truth), not the HTML.

## Global formatting & input rules

- **Money fields** show a gold `$` prefix and a `0` placeholder, format with thousands separators live as the user types, and submit digits only (commas/spaces stripped before validation).
- **Digit-capped fields** (ABN = 11, Medicare = 10–11, postcode = 4) reject non-digit characters and hard-stop at the maximum length.
- **Dropdowns** open with a disabled, hidden “Select…” placeholder — it is never a selectable option and keeps the field empty until a real choice is made.
- **Type-ahead** (job title / previous job title) only accepts an exact match from the 358-item list; free text that doesn’t match is rejected on submit.
- **Addresses** reveal progressively: the street line shows first; line 2, suburb, state and postcode appear once the street has content. With a Google Places key the street line fills all five.
- **Required fields** validate on blur and on Continue; conditional fields are only validated while visible and are cleared when hidden.
- **Errors** appear in burnt-orange beneath the field; static helper text is muted grey.

## Step 1 — Purpose

_Tell us what you have in mind and how you’d like to pay it back._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| What is the purpose of the funds you would like to borrow? | Radio | `purpose` | 119531975 | Home renovation \| Investment property renovation | Yes | — | Single choice (chip buttons) | — | — |
| What's the project? | Multi-checkbox | `project` | 119531976 | Kitchen \| Bathroom \| Pool \| Interiors \| Fencing \| Landscaping \| Roofing \| Other | No | — | Checkbox group; select any number | — | Select all that apply. |
| Amount you'd like to borrow $ | Money ($) | `amount` | 119531977 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped); min 5000; max 175000 | 25,000 | $5,000 – $175,000. |
| Preferred term | Dropdown | `term` | 122580887 | 1 Year \| 2 Years \| 3 Years \| 4 Years \| 5 Years \| 6 Years \| 7 Years | Yes | — | Dropdown; first option “Select…” is a disabled/hidden placeholder; options rebuild: 1–7 Years if amount ≤ $50,000, up to 10 Years above | Select… | 1–7 years up to $50k; up to 10 years above $50k. |

## Step 2 — Your details

_The basics about you, the primary applicant._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| Title | Dropdown | `title` | 119531978 | Ms. \| Mrs. \| Mr. \| Dr. \| Prefer not to say | Yes | — | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| First name | Text | `firstName` | 119531979 | — | Yes | — | — | e.g. Jordan | — |
| Middle name | Text | `middleName` | 119531980 | — | No | — | — | e.g. Alex | — |
| Last name | Text | `lastName` | 119531981 | — | Yes | — | — | e.g. Smith | — |
| Date of birth | Date | `dob` | 119532165 | — | Yes | — | Native date picker (dark themed); Must be 18+ | — | You must be 18 or older. |
| Email | Email | `email` | 119531982 | — | Yes | — | Valid email format | you@example.com | We will use this for all official communication with you. |
| Mobile | Tel | `phone` | 119531983 | — | Yes | — | AU mobile 04xxxxxxxx | 04xx xxx xxx | We’ll send you important notifications via SMS. |
| Is this a joint application? | Radio | `joint` | 119531988 | No \| Yes | Yes | — | Single choice (chip buttons) | — | The co-borrower must derive substantial benefit from the use of the loan funds. In most cases, the co-borrower will be your spouse or de facto partner, living with you at the property and/or being co-owner of the property. |
| What's their name? | Text | `jointName` | 119531989 | — | Yes | joint = "Yes" | — | Their full name | Enter their full name here. |
| Enter their email | Email | `jointEmail` | 119531990 | — | Yes | joint = "Yes" | Valid email format | their@email.com | You are required to insert their email to complete the application. We'll send them an email with a link to complete the application once you submit this form. If your co-applicant has already completed an application please insert their email address so we can attach your application to theirs as a joint application. |

## Step 3 — Employment

_How you earn your income._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| Employment status | Radio | `employment` | 119531993 | Full time \| Part time \| Casual/Temp \| Contractor \| Self-employed \| Stay-at-home partner \| Retired \| Unemployed | Yes | — | Single choice (chip buttons) | — | — |
| **Provide more detail about your employment status** _(section heading)_ | — | — | — | — | — | employment not in {Unemployed, Retired, Stay-at-home partner} | — | — | — |
| Industry sector related to your main employment | Dropdown | `industry` | 119531995 | Agriculture \| Apparel \| Banking \| Biotechnology \| Chemicals \| Communications \| Construction \| Education \| Electronics \| Energy \| Engineering \| Entertainment \| Environmental \| Finance \| Food & Beverage \| Government \| Hair & Beauty \| Healthcare \| Hospitality \| Insurance \| Machinery \| Manufacturing \| Media \| Mining \| Not For Profit \| Other \| Recreation \| Retail \| Shipping \| Technology \| Telecommunications \| Transportation \| Utilities | Yes | employment not in {Unemployed, Retired, Stay-at-home partner} | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Job title | Type-ahead | `jobTitle` | 119531997 | — | Yes | employment not in {Unemployed, Retired, Stay-at-home partner} | Combobox over 358-item list; must resolve to an exact list value | Type to search… | Start typing and pick from the list. |
| How long have you worked here? | Radio | `jobTenure` | 119531998 | 2 years or more \| Between 1 and 2 years \| Between 3 and 12 months \| Less than 3 months | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} | Single choice (chip buttons) | — | — |
| Employer business name | Text | `employerName` | 119531999 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} | — | e.g. Acme Pty Ltd | — |
| Previous employment job title | Type-ahead | `prevJobTitle` | 119532001 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} AND jobTenure in {Between 1 and 2 years, Between 3 and 12 months, Less than 3 months} | Combobox over 358-item list; must resolve to an exact list value | Type to search… | — |
| Previous employer business name | Text | `prevEmployerName` | 119532002 | — | Yes | employment in {Full time, Part time, Casual/Temp, Contractor} AND jobTenure in {Between 1 and 2 years, Between 3 and 12 months, Less than 3 months} | — | e.g. Previous Co Pty Ltd | — |
| How long have you been self employed? | Radio | `selfEmployedTenure` | 119532004 | 2 years or more \| Between 1 and 2 years \| Between 3 and 12 months \| Less than 3 months | Yes | employment = "Self-employed" | Single choice (chip buttons) | — | — |
| Business name | Text | `businessName` | 119532005 | — | Yes | employment = "Self-employed" | — | e.g. Acme Pty Ltd | — |
| Business ABN | Text | `businessAbn` | 119532006 | — | Yes | employment = "Self-employed" | exactly 11 digits; non-digits blocked, hard max-length 11 | e.g. 12345678901 | 11 digits. |

## Step 4 — Home address

_Where you live and your living situation._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| Home address | Address | `resAddress` | 119532010 | resAddress_address/_address2/_city/_state/_zip | Yes | — | 5 sub-inputs (street/line2/suburb/state/postcode); street shows first, rest reveal on input; postcode 4 digits | — | — |
| How long have you lived at this address? | Radio | `addressTenure` | 119532012 | 2 years or longer \| Less than 2 years | Yes | — | Single choice (chip buttons) | — | — |
| Previous address | Address | `prevAddress` | 119532014 | prevAddress_address/_address2/_city/_state/_zip | Yes | addressTenure = "Less than 2 years" | 5 sub-inputs (street/line2/suburb/state/postcode); street shows first, rest reveal on input; postcode 4 digits | — | — |
| What is your home ownership status? | Radio | `ownership` | 119532015 | Renting \| I own it - paying off mortgage \| I own it - mortgage already paid \| Not paying rent- living with family \| Other | Yes | — | Single choice (chip buttons) | — | — |
| Explain your home ownership status | Text | `ownershipOther` | 119532016 | — | Yes | ownership = "Other" | — | Tell us a bit more about your situation | — |
| What is the estimated value of your home? | Money ($) | `homeValue` | 119532017 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| What is the amount owing on your mortgage? | Money ($) | `mortBalance` | 119532060 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Relationship status | Radio | `relationship` | 119532018 | Single \| De facto \| Married \| Divorced or separated \| Widowed | Yes | — | Single choice (chip buttons) | — | — |

## Step 5 — Your property

_The property these funds are for._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| Is your home address the property these funds are for? | Radio | `renoIsHome` | 119532011 | No \| Yes | Yes | — | Single choice (chip buttons) | — | — |
| What is the address of the property? | Address | `propAddress` | 119533819 | propAddress_address/_address2/_city/_state/_zip | Yes | renoIsHome = "No" | 5 sub-inputs (street/line2/suburb/state/postcode); street shows first, rest reveal on input; postcode 4 digits | — | Only needed if it’s not your home address. Otherwise we’ll use the address you entered earlier. |
| Are you on title of the property these funds are for? | Radio | `onTitle` | 119534299 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Borrowers are required to be on title of the property. |
| Please explain who owns the property (i.e. who is on title) | Text | `titleOwner` | 119534366 | — | Yes | onTitle = "No" | — | e.g. the property is owned by my parents | — |
| What is your monthly rental income from this property? | Money ($) | `propRentalIncome` | 119534508 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | Enter 0 if none. |
| Do you have a loan (mortgage) on the property? | Radio | `propHasLoan` | 119535325 | No \| Yes | Yes | — | Single choice (chip buttons) | — | — |
| Amount owing on the loan | Money ($) | `propLoanOwing` | 119535527 | — | Yes | propHasLoan = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Monthly loan repayments | Money ($) | `propLoanRepayment` | 119535791 | — | Yes | propHasLoan = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Estimated value of this property | Money ($) | `propValue` | 119633192 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |

## Step 6 — Income

_Your salary and any other income._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| What is your gross annual salary (before tax or super)? | Money ($) | `income` | 119532022 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped); min 25000 | 0 | Check your payslip or employment contract if you’re unsure. Don’t include commissions, super or bonuses, just your fixed base salary. Minimum gross annual salary is $25,000. |
| How often do you get paid? | Radio | `payFrequency` | 119532023 | Weekly \| Fortnightly \| Monthly | Yes | — | Single choice (chip buttons) | — | — |
| Do you receive a payment from Centrelink? | Radio | `centrelink` | 119532024 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Including Age Pension, Disability Support Pension and Family Tax Benefit, or any other Centrelink payment. |
| Centrelink payment 1 type | Dropdown | `cl1Type` | 119532026 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | centrelink = "Yes" | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Centrelink payment 1 fortnightly amount | Money ($) | `cl1Amount` | 119532027 | — | Yes | centrelink = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another Centrelink payment | Add-toggle | `addCl2` | 119532028 | value: “Add another Centrelink payment” | No | centrelink = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Centrelink payment 2 type | Dropdown | `cl2Type` | 119532030 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | centrelink = "Yes" AND addCl2 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Centrelink payment 2 fortnightly amount | Money ($) | `cl2Amount` | 119532031 | — | Yes | centrelink = "Yes" AND addCl2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another Centrelink payment | Add-toggle | `addCl3` | 119532032 | value: “Add another Centrelink payment” | No | centrelink = "Yes" AND addCl2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Centrelink payment 3 type | Dropdown | `cl3Type` | 119532034 | Family Tax Benefit Part A or B \| Carers Payment \| Age Pension \| Disability Support Pension \| Other | Yes | addCl3 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Centrelink payment 3 fortnightly amount | Money ($) | `cl3Amount` | 119532035 | — | Yes | addCl3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Do you have any other source of income? | Radio | `otherIncome` | 119532037 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Like bonuses, commission, interest, dividends or a second job. Don’t include rental income from investment property; that’s asked for separately. |
| Source 1 type | Dropdown | `src1Type` | 119532039 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | otherIncome = "Yes" | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Source 1 monthly amount | Money ($) | `src1Amount` | 119532040 | — | Yes | otherIncome = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another source of income | Add-toggle | `addSrc2` | 119532041 | value: “Add another source of income” | No | otherIncome = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Source 2 type | Dropdown | `src2Type` | 119532043 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | otherIncome = "Yes" AND addSrc2 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Source 2 monthly amount | Money ($) | `src2Amount` | 119532044 | — | Yes | otherIncome = "Yes" AND addSrc2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another source of income | Add-toggle | `addSrc3` | 119532045 | value: “Add another source of income” | No | otherIncome = "Yes" AND addSrc2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Source 3 type | Dropdown | `src3Type` | 119532047 | Bonus, commission or overtime \| Second job \| Interest or dividends \| Other | Yes | addSrc3 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Source 3 monthly amount | Money ($) | `src3Amount` | 119532048 | — | Yes | addSrc3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |

## Step 7 — Expenses & commitments

_Your household spending and rent or mortgage. This is only about the home you live in, not investment properties._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| General household monthly living expenses | Money ($) | `generalExpenses` | 119532050 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Total household monthly living expenses | Money ($) | `expenses` | 119532052 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped); must be ≥ generalExpenses | 0 | — |
| % of total expenses your spouse/partner pays each month | Radio | `spouseExpensePct` | 119532053 | From 0% - 19% \| From 20% - 49% \| 50% or more | Yes | — | Single choice (chip buttons) | — | — |
| How often do you pay rent or mortgage on your home? | Radio | `rentFrequency` | 119532056 | Weekly \| Fortnightly \| Monthly | Yes | — | Single choice (chip buttons) | — | — |
| How much rent or mortgage do you pay each time? Include your partner or spouse contribution (if any). | Money ($) | `rentAmount` | 119532057 | — | Yes | — | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| % of rent/mortgage your spouse/partner pays each time | Radio | `spouseRentPct` | 119532058 | From 0% - 19% \| From 20% - 49% \| 50% or more | No | — | Single choice (chip buttons) | — | — |
| Do you expect any significant change to your financial situation over the next 6 to 12 months that would ADVERSELY impact your ability to meet loan repayments? | Radio | `adverseChange` | 119532062 | No \| Yes | Yes | — | Single choice (chip buttons) | — | — |

## Step 8 — Assets & liabilities

_Other property, assets, credit cards and debts._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| **Investment property** _(section heading)_ | — | — | — | — | — | — | — | — | — |
| Do you own any other investment property? | Radio | `investmentProperty` | 119532064 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Other than the property these funds are for or the home you live in. |
| Property 1: monthly rental income | Money ($) | `ip1Rental` | 119532066 | — | Yes | investmentProperty = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 1: making mortgage repayments? | Radio | `ip1HasMortgage` | 119532067 | No \| Yes | No | investmentProperty = "Yes" | Single choice (chip buttons) | — | — |
| Property 1: monthly mortgage repayment | Money ($) | `ip1Repayment` | 119532068 | — | Yes | investmentProperty = "Yes" AND ip1HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 1: amount owing on mortgage | Money ($) | `ip1Owing` | 119532069 | — | Yes | investmentProperty = "Yes" AND ip1HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 1: estimated value | Money ($) | `ip1Value` | 119532070 | — | Yes | investmentProperty = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another property | Add-toggle | `addIp2` | 119532074 | value: “Add another property” | No | investmentProperty = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Property 2: monthly rental income | Money ($) | `ip2Rental` | 119532076 | — | Yes | addIp2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 2: making mortgage repayments? | Radio | `ip2HasMortgage` | 119532077 | No \| Yes | No | addIp2 checked | Single choice (chip buttons) | — | — |
| Property 2: monthly mortgage repayment | Money ($) | `ip2Repayment` | 119532078 | — | Yes | addIp2 checked AND ip2HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 2: amount owing | Money ($) | `ip2Owing` | 119532079 | — | Yes | addIp2 checked AND ip2HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 2: estimated value | Money ($) | `ip2Value` | 119532080 | — | Yes | addIp2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another property | Add-toggle | `addIp3` | 119532084 | value: “Add another property” | No | addIp2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Property 3: monthly rental income | Money ($) | `ip3Rental` | 119532086 | — | Yes | addIp3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 3: making mortgage repayments? | Radio | `ip3HasMortgage` | 119532087 | No \| Yes | No | addIp3 checked | Single choice (chip buttons) | — | — |
| Property 3: monthly mortgage repayment | Money ($) | `ip3Repayment` | 119532088 | — | Yes | addIp3 checked AND ip3HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 3: amount owing | Money ($) | `ip3Owing` | 119532089 | — | Yes | addIp3 checked AND ip3HasMortgage = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Property 3: estimated value | Money ($) | `ip3Value` | 119532090 | — | Yes | addIp3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| **Non-property assets** _(section heading)_ | — | — | — | — | — | — | — | — | — |
| Do you own any other non-property assets? | Radio | `otherAssets` | 119532095 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Like a car, shares or any other major items. |
| Asset 1: type | Dropdown | `asset1Type` | 119532097 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | otherAssets = "Yes" | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Asset 1: estimated value | Money ($) | `asset1Value` | 119532098 | — | Yes | otherAssets = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add other asset | Add-toggle | `addAsset2` | 119532099 | value: “Add other asset” | No | otherAssets = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Asset 2: type | Dropdown | `asset2Type` | 119532101 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset2 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Asset 2: estimated value | Money ($) | `asset2Value` | 119532102 | — | Yes | addAsset2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add other asset | Add-toggle | `addAsset3` | 119532103 | value: “Add other asset” | No | addAsset2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Asset 3: type | Dropdown | `asset3Type` | 119532105 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset3 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Asset 3: estimated value | Money ($) | `asset3Value` | 119532106 | — | Yes | addAsset3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add other asset | Add-toggle | `addAsset4` | 119532107 | value: “Add other asset” | No | addAsset3 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Asset 4: type | Dropdown | `asset4Type` | 119532109 | Car \| Motorbike \| Boat \| Caravan \| Savings \| Other | Yes | addAsset4 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Asset 4: estimated value | Money ($) | `asset4Value` | 119532110 | — | Yes | addAsset4 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| **Credit cards** _(section heading)_ | — | — | — | — | — | — | — | — | — |
| Do you have credit cards? | Radio | `creditCards` | 119532112 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Please include storecards e.g. MYER, DJs, Gem Visa, GO MasterCard. |
| Card 1: provider | Dropdown | `card1Provider` | 119532114 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | creditCards = "Yes" | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Card 1: credit limit | Money ($) | `card1Limit` | 119532115 | — | Yes | creditCards = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Card 1: amount owing | Money ($) | `card1Owing` | 119532116 | — | Yes | creditCards = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another credit card | Add-toggle | `addCard2` | 119532117 | value: “Add another credit card” | No | creditCards = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Card 2: provider | Dropdown | `card2Provider` | 119532119 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard2 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Card 2: credit limit | Money ($) | `card2Limit` | 119532120 | — | Yes | addCard2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Card 2: amount owing | Money ($) | `card2Owing` | 119532121 | — | Yes | addCard2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another credit card | Add-toggle | `addCard3` | 119532122 | value: “Add another credit card” | No | addCard2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Card 3: provider | Dropdown | `card3Provider` | 119532124 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard3 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Card 3: credit limit | Money ($) | `card3Limit` | 119532125 | — | Yes | addCard3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Card 3: amount owing | Money ($) | `card3Owing` | 119532126 | — | Yes | addCard3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another credit card | Add-toggle | `addCard4` | 119532127 | value: “Add another credit card” | No | addCard3 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Card 4: provider | Dropdown | `card4Provider` | 119532129 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard4 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Card 4: credit limit | Money ($) | `card4Limit` | 119532130 | — | Yes | addCard4 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Card 4: amount owing | Money ($) | `card4Owing` | 119532131 | — | Yes | addCard4 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another credit card | Add-toggle | `addCard5` | 119532132 | value: “Add another credit card” | No | addCard4 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Card 5: provider | Dropdown | `card5Provider` | 119532134 | CBA \| Westpac \| ANZ \| NAB \| American Express \| Citi Bank \| Bank of Queensland \| Bank of Melbourne \| ING \| Bankwest \| BankSA \| Bendigo Bank \| Macquarie Bank \| St. George \| Suncorp Bank \| Coles \| Woolworths \| ME \| Latitude Financial Services \| Lombard Finance \| Virgin Money \| ZIPMoney \| Other | No | addCard5 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Card 5: credit limit | Money ($) | `card5Limit` | 119532135 | — | Yes | addCard5 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Card 5: amount owing | Money ($) | `card5Owing` | 119532136 | — | Yes | addCard5 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| **Other debt** _(section heading)_ | — | — | — | — | — | — | — | — | — |
| Do you have any other debt? | Radio | `otherDebt` | 119532138 | No \| Yes | Yes | — | Single choice (chip buttons) | — | Like unpaid overdrafts, car loans, personal loans, etc. |
| Debt 1: type | Dropdown | `debt1Type` | 119532140 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | otherDebt = "Yes" | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Debt 1: amount still owing | Money ($) | `debt1Owing` | 119532141 | — | Yes | otherDebt = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Debt 1: monthly repayment | Money ($) | `debt1Repayment` | 119532142 | — | Yes | otherDebt = "Yes" | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another debt | Add-toggle | `addDebt2` | 119532143 | value: “Add another debt” | No | otherDebt = "Yes" | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Debt 2: type | Dropdown | `debt2Type` | 119532145 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt2 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Debt 2: amount owing | Money ($) | `debt2Owing` | 119532146 | — | Yes | addDebt2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Debt 2: monthly repayment | Money ($) | `debt2Repayment` | 119532147 | — | Yes | addDebt2 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another debt | Add-toggle | `addDebt3` | 119532148 | value: “Add another debt” | No | addDebt2 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Debt 3: type | Dropdown | `debt3Type` | 119532150 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt3 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Debt 3: amount owing | Money ($) | `debt3Owing` | 119532151 | — | Yes | addDebt3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Debt 3: monthly repayment | Money ($) | `debt3Repayment` | 119532152 | — | Yes | addDebt3 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another debt | Add-toggle | `addDebt4` | 119532153 | value: “Add another debt” | No | addDebt3 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Debt 4: type | Dropdown | `debt4Type` | 119532155 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt4 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Debt 4: amount owing | Money ($) | `debt4Owing` | 119532156 | — | Yes | addDebt4 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Debt 4: monthly repayment | Money ($) | `debt4Repayment` | 119532157 | — | Yes | addDebt4 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Add another debt | Add-toggle | `addDebt5` | 119532158 | value: “Add another debt” | No | addDebt4 checked | Checkbox that reveals the next repeat block; value submitted when checked | — | — |
| Debt 5: type | Dropdown | `debt5Type` | 119532160 | Overdrafts \| Car Loans \| Personal Loans \| Other | Yes | addDebt5 checked | Dropdown; first option “Select…” is a disabled/hidden placeholder | Select… | — |
| Debt 5: amount owing | Money ($) | `debt5Owing` | 119532161 | — | Yes | addDebt5 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |
| Debt 5: monthly repayment | Money ($) | `debt5Repayment` | 119532162 | — | Yes | addDebt5 checked | Currency: “$” prefix, live thousands separators as typed; submitted as digits only (commas stripped) | 0 | — |

## Step 9 — Identity & verification

_Identity documents and dependants._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| Do you have an Australian driver's license? | Radio | `hasLicense` | 119532166 | No \| Yes | Yes | — | Single choice (chip buttons) | — | — |
| Driver's license state | Radio | `idIssuedState` | 119532167 | NSW \| ACT \| QLD \| VIC \| SA \| NT \| TAS \| WA | Yes | hasLicense = "Yes" | Single choice (chip buttons) | — | — |
| Driver's license number | Text | `idNumber` | 119532168 | — | Yes | hasLicense = "Yes" | — | e.g. 12 345 678 | — |
| Medicare card number | Number | `medicareNumber` | 119532169 | — | Yes | — | Numeric input mode; 10–11 digits; non-digits blocked, hard max-length 11 | e.g. 1234567890 | 10–11 digits. |
| What colour is your Medicare card? | Radio | `medicareColour` | 119532171 | Green \| Blue \| Yellow | Yes | — | Single choice (chip buttons) | — | — |
| Medicare card expiry (valid to) date | Date | `medicareExpiry` | 119532172 | — | Yes | — | Native date picker (dark themed); Must be a future date | — | — |
| How many dependants do you have? | Radio | `dependants` | 119532173 | 0 \| 1 \| 2 \| 3 \| 4 or more | Yes | — | Single choice (chip buttons) | — | — |
| Dependant 1: age | Number | `dep1Age` | 119532175 | — | Yes | dependants in {1, 2, 3, 4 or more} | Numeric input mode | Age in years | — |
| Dependant 2: age | Number | `dep2Age` | 119532176 | — | Yes | dependants in {2, 3, 4 or more} | Numeric input mode | Age in years | — |
| Dependant 3: age | Number | `dep3Age` | 119532177 | — | Yes | dependants in {3, 4 or more} | Numeric input mode | Age in years | — |
| Dependant 4: age | Number | `dep4Age` | 119532178 | — | Yes | dependants in {4 or more} | Numeric input mode | Age in years | — |

## Step 10 — Declarations & consents

_Please read and confirm each declaration to submit your application._

| Label | Control | name | data-fs-id | Options | Req | Conditional | Formatting / validation | Placeholder | Helper text |
|---|---|---|---|---|---|---|---|---|---|
| You must review and agree to our Privacy & Credit Reporting Policy and Credit Guide before proceeding. | Consent | `consentPrivacy` | 119531985 | value: “Privacy Consent: By checking this box, I confirm that I have…” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| I confirm that: | Consent | `consentConfirm` | 142285711 | value: “I confirm that:” + bullets: The property being renovated is located in Australia / Improvements being done are for residential dwellings (not commercial purposes) / The property is not vacant land / The property is substantially free of material damage and from material contamination by toxic or hazardous substances. | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| Are you an Australian citizen or permanent resident? | Consent | `consentCitizen` | 119532181 | value: “Yes” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| Do you declare all the information that you have provided in this application to be true and correct? | Consent | `consentAccuracy` | 119532182 | value: “Yes, I declare all information that I have provided in this …” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| Do you give us consent to check your credit history and verify your identity? | Consent | `consentCredit` | 119532183 | value: “Yes, I give RenoNow consent to give my personal and credit i…” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| Do you give us consent to send you notices and documents electronically and signing documents electronically? | Consent | `consentElectronic` | 119532184 | value: “You consent to be given notices and other documents in conne…” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |
| Biometric information | Consent | `consentBiometric` | 125695752 | value: “I acknowledge and consent to the collection and use of my bi…” | No | — | Required checkbox; submitted value is the verbatim Formstack string | — | — |

## Hidden tracking inputs

| name | data-fs-id | source |
|---|---|---|
| `utmSource` | 119532186 | URL param ?utm_source |
| `utmMedium` | 119532187 | URL param ?utm_medium |
| `utmContent` | 119532188 | URL param ?utm_content |
| `utmCampaign` | 119532189 | URL param ?utm_campaign |
| `gclid` | 119532190 | URL param ?gclid |
| `productName` | 119531974 | fixed “Reno Now” |

## Consent checkboxes — full verbatim values

The submitted `value` is the exact Formstack string (kept verbatim incl. “RenoNow” and curly apostrophes); the on-screen text shows Propential / MediPay. All required.

### consentPrivacy — data-fs-id 119531985
**Heading:** You must review and agree to our Privacy & Credit Reporting Policy and Credit Guide before proceeding.

**Submitted value:** `Privacy Consent: By checking this box, I confirm that I have accessed RenoNow’s Privacy Policy and Credit Reporting Policy by clicking on the link shown above and reviewed, understand and consent to RenoNow, its related bodies corporate, affiliates and agents, and other nominated entities collecting, using, holding and disclosing personal information and credit-related information about me as set out in the privacy policy. If you do not consent, we may not be able to proceed with your application.`

**Displayed text:** By submitting this application you agree that MediPay Holdings Pty Limited (trading as Propential) may collect, use and disclose your personal and credit information to assess your application, verify your identity and manage your loan, as described in our Privacy & Credit Reporting Policy and Credit Guide. This may include obtaining a credit report. This application is not a quote or approval and is subject to credit assessment.

### consentConfirm — data-fs-id 142285711
**Heading:** I confirm that:

**Submitted value:** `I confirm that:`

**Displayed bullets:**
- The property being renovated is located in Australia
- Improvements being done are for residential dwellings (not commercial purposes)
- The property is not vacant land
- The property is substantially free of material damage and from material contamination by toxic or hazardous substances.

### consentCitizen — data-fs-id 119532181
**Heading:** Are you an Australian citizen or permanent resident?

**Submitted value:** `Yes`

### consentAccuracy — data-fs-id 119532182
**Heading:** Do you declare all the information that you have provided in this application to be true and correct?

**Submitted value:** `Yes, I declare all information that I have provided in this application is true and correct.`

### consentCredit — data-fs-id 119532183
**Heading:** Do you give us consent to check your credit history and verify your identity?

**Submitted value:** `Yes, I give RenoNow consent to give my personal and credit information to credit reporting agencies, including Equifax, for the purpose of obtaining a consumer and commercial credit eligibility report about me to assess my creditworthiness, and to otherwise deal with any information I provide in accordance with your Privacy Policy and Credit Reporting Policy. I understand that obtaining of the credit eligibility report may impact my credit score. I also consent to my personal details being checked with the document issuer or official record holder (e.g. Government agency) via a third party (e.g. an identity checking service) for RenoNow to verify my identity.`

### consentElectronic — data-fs-id 119532184
**Heading:** Do you give us consent to send you notices and documents electronically and signing documents electronically?

**Submitted value:** `You consent to be given notices and other documents in connection with our dealings with you electronically (including by email to your address provided). By consenting, you warrant that you have an ability to save and print the documents, and you understand that: (a) paper documents may no longer be given; and (b) electronic communications must be regularly checked for documents; and (c) consent to the giving of documents by electronic communication may be withdrawn at any time.`

### consentBiometric — data-fs-id 125695752
**Heading:** Biometric information

**Submitted value:** `I acknowledge and consent to the collection and use of my biometric information by you or your agent for authentication/ verification purposes and that my biometric information will be collected and stored in accordance with your Privacy and Credit Reporting Policy and your obligations under Privacy Act 1988 and Privacy Principles and any other applicable law. I understand that this information will not be used or disclosed for any other purpose.`

## Placeholder text (quick list)

| Field | Placeholder |
|---|---|
| `amount` | 25,000 |
| `term` | Select… |
| `title` | Select… |
| `firstName` | e.g. Jordan |
| `middleName` | e.g. Alex |
| `lastName` | e.g. Smith |
| `dob` | — |
| `email` | you@example.com |
| `phone` | 04xx xxx xxx |
| `jointName` | Their full name |
| `jointEmail` | their@email.com |
| `industry` | Select… |
| `jobTitle` | Type to search… |
| `employerName` | e.g. Acme Pty Ltd |
| `prevJobTitle` | Type to search… |
| `prevEmployerName` | e.g. Previous Co Pty Ltd |
| `businessName` | e.g. Acme Pty Ltd |
| `businessAbn` | e.g. 12345678901 |
| `ownershipOther` | Tell us a bit more about your situation |
| `homeValue` | 0 |
| `mortBalance` | 0 |
| `titleOwner` | e.g. the property is owned by my parents |
| `propRentalIncome` | 0 |
| `propLoanOwing` | 0 |
| `propLoanRepayment` | 0 |
| `propValue` | 0 |
| `income` | 0 |
| `cl1Type` | Select… |
| `cl1Amount` | 0 |
| `cl2Type` | Select… |
| `cl2Amount` | 0 |
| `cl3Type` | Select… |
| `cl3Amount` | 0 |
| `src1Type` | Select… |
| `src1Amount` | 0 |
| `src2Type` | Select… |
| `src2Amount` | 0 |
| `src3Type` | Select… |
| `src3Amount` | 0 |
| `generalExpenses` | 0 |
| `expenses` | 0 |
| `rentAmount` | 0 |
| `ip1Rental` | 0 |
| `ip1Repayment` | 0 |
| `ip1Owing` | 0 |
| `ip1Value` | 0 |
| `ip2Rental` | 0 |
| `ip2Repayment` | 0 |
| `ip2Owing` | 0 |
| `ip2Value` | 0 |
| `ip3Rental` | 0 |
| `ip3Repayment` | 0 |
| `ip3Owing` | 0 |
| `ip3Value` | 0 |
| `asset1Type` | Select… |
| `asset1Value` | 0 |
| `asset2Type` | Select… |
| `asset2Value` | 0 |
| `asset3Type` | Select… |
| `asset3Value` | 0 |
| `asset4Type` | Select… |
| `asset4Value` | 0 |
| `card1Provider` | Select… |
| `card1Limit` | 0 |
| `card1Owing` | 0 |
| `card2Provider` | Select… |
| `card2Limit` | 0 |
| `card2Owing` | 0 |
| `card3Provider` | Select… |
| `card3Limit` | 0 |
| `card3Owing` | 0 |
| `card4Provider` | Select… |
| `card4Limit` | 0 |
| `card4Owing` | 0 |
| `card5Provider` | Select… |
| `card5Limit` | 0 |
| `card5Owing` | 0 |
| `debt1Type` | Select… |
| `debt1Owing` | 0 |
| `debt1Repayment` | 0 |
| `debt2Type` | Select… |
| `debt2Owing` | 0 |
| `debt2Repayment` | 0 |
| `debt3Type` | Select… |
| `debt3Owing` | 0 |
| `debt3Repayment` | 0 |
| `debt4Type` | Select… |
| `debt4Owing` | 0 |
| `debt4Repayment` | 0 |
| `debt5Type` | Select… |
| `debt5Owing` | 0 |
| `debt5Repayment` | 0 |
| `idNumber` | e.g. 12 345 678 |
| `medicareNumber` | e.g. 1234567890 |
| `medicareExpiry` | — |
| `dep1Age` | Age in years |
| `dep2Age` | Age in years |
| `dep3Age` | Age in years |
| `dep4Age` | Age in years |
