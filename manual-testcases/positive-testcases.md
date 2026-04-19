# Positive Test Cases – Skip Hire

| Test Case ID | Scenario                             | Steps                                                             | Expected Result                     |
|--------------|--------------------------------------|-------------------------------------------------------------------|-------------------------------------|
| TC01         | Website is accessible                | Open browser → Enter URL → Press Enter                            | Website should load properly        |
| TC02         | Homepage shows Call Us / Quote       | Open homepage → Check Call Us → Check Get Online Quote            | Both options should be visible      |
| TC03         | Learn More for skip cost works       | Open homepage → Locate skip cost → Click Learn More               | Link should be clickable            |
| TC04         | Learn More for skip sizes works      | Open homepage → Locate skip sizes → Click Learn More              | Link should be clickable            |
| TC05         | Learn More for areas covered works   | Open homepage → Locate areas → Click Learn More                   | Link should be clickable            |
| TC06         | Get Quote redirects correctly        | Open homepage → Click Get Online Quote                            | Should navigate to quotation page   |
| TC07         | Quotation options displayed          | Navigate to quotation page → Observe options                      | Domestic & Commercial visible       |
| TC08         | Domestic option selectable           | Navigate to quotation page → Select Domestic                      | Option should be selectable         |
| TC09         | Step 1 validations triggered         | Select Domestic → Leave fields empty → Click Next                 | Validation messages displayed       |
| TC10         | Validation clears after correction   | Trigger validation → Enter valid data                             | Validation messages disappear       |
| TC11         | Step 1 navigates to Step 2           | Fill Step 1 → Click Next                                          | User navigates to Step 2            |
| TC12         | Step 2 validations triggered         | Go to Step 2 → Leave fields empty → Click Get Quote               | Validation messages displayed       |
| TC13         | Step 2 validation clears             | Trigger validation → Enter valid data                             | Validation messages disappear       |
| TC14         | Successful quote submission          | Complete Step 1 & Step 2 → Click Get Quote                        | Quote submitted, confirmation shown |
| TC15         | Return to Skips works                | Submit quote → Click Return to Skips                              | Navigates back correctly            |