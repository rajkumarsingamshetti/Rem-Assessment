# Negative Test Cases – Skip Hire

| Test Case ID | Scenario                         | Steps                                                                 | Expected Result                     |
|--------------|----------------------------------|-----------------------------------------------------------------------|-------------------------------------|
| NEG01        | Website not accessible           | Open browser → Enter URL → Press Enter                                | Website should load properly         |
| NEG02        | Broken navigation links          | Open homepage → Click menu links                                      | All links should open correct pages  |
| NEG03        | Get Quote button not working     | Open homepage → Click "Get A Quote Online"                            | Should navigate to quotation page    |
| NEG04        | Skip size not selected           | Open homepage → Click Get Quote → Skip selection → Click Next         | Validation shown, cannot proceed     |
| NEG05        | Multiple skip sizes selected     | Go to Step 1 → Select multiple skip sizes                             | Only one option selectable           |
| NEG06        | Multiple waste types selected    | Go to Step 1 → Select multiple waste types                            | Only one option selectable           |
| NEG07        | No placement selected            | Go to Step 1 → Skip placement → Click Next                            | Validation message displayed         |
| NEG08        | Past date selection              | Go to Step 1 → Open date picker → Select past date                    | Past dates should be disabled        |
| NEG09        | Future date beyond limit         | Open date picker → Select date > 1 year                               | Selection should be restricted       |
| NEG10        | No date selected                 | Go to Step 1 → Skip date → Click Next                                 | Validation message displayed         |
| NEG11        | Submit empty form                | Go to Step 2 → Leave fields blank → Click Get Quote                   | Required field errors displayed      |
| NEG12        | Invalid email format             | Enter invalid email → Fill others → Submit                            | Email validation error               |
| NEG13        | Duplicate email submission       | Submit form → Submit again same email                                 | Duplicate handled properly           |
| NEG14        | Invalid phone number             | Enter invalid phone → Submit                                          | Phone validation error               |
| NEG15        | Invalid name input               | Enter numbers/special chars → Submit                                  | Input should be rejected             |
| NEG16        | Name length validation           | Enter short/long name → Submit                                        | Min/max validation                   |
| NEG17        | Address fields empty             | Leave address blank → Submit                                          | Validation errors                    |
| NEG18        | Invalid postcode                | Enter wrong postcode → Submit                                         | Postcode validation error            |
| NEG19        | Only spaces in fields            | Enter spaces → Submit                                                 | Treated as empty, validation shown   |
| NEG20        | Multiple rapid submissions       | Fill form → Click Get Quote multiple times                            | Only one submission processed        |
| NEG21        | No confirmation after submission | Submit form → Observe result                                          | Confirmation message displayed       |
| NEG22        | Return to Skips not working      | Submit form → Click Return to Skips                                   | Should navigate correctly            |
| NEG23        | Browser back button issue        | Go to Step 2 → Click back button                                      | Should return to Step 1              |