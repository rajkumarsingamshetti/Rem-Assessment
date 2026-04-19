#  Edge Test Cases

| Test Case ID | Test Scenario                         | Test Steps                                                                 | Expected Result                                      |
|--------------|--------------------------------------|---------------------------------------------------------------------------|------------------------------------------------------|
| EDGE01       | Minimum name boundary                | 1. Enter 1 character in First/Last Name 2. Submit                          | Accepted only if minimum rule is valid                |
| EDGE02       | Maximum name boundary                | 1. Enter max allowed characters 2. Submit                                  | Accepted without truncation                           |
| EDGE03       | Maximum email length                | 1. Enter email at 254 character limit 2. Submit                            | Accepted without error                                |
| EDGE04       | Phone number boundary length         | 1. Enter min/max allowed digits 2. Submit                                  | Accepted within valid range                           |
| EDGE05       | Valid postcode boundary              | 1. Enter shortest/longest valid postcode 2. Submit                         | Accepted if format is valid                           |
| EDGE06       | Current date selection               | 1. Select today’s date 2. Click Next                                       | Allowed if within valid date range                    |
| EDGE07       | Maximum future date boundary         | 1. Select date at max limit (+1 year) 2. Click Next                        | Accepted if within allowed range                      |
| EDGE08       | All fields at maximum capacity       | 1. Fill all fields with max allowed input 2. Submit                        | No crash, data handled correctly                      |
| EDGE09       | Data persistence on navigation       | 1. Fill Step 1 2. Go to Step 2 3. Navigate back 4. Return to Step 2         | Data should persist correctly                         |
| EDGE10       | Slow network submission              | 1. Fill valid data 2. Submit under slow network                            | Only one submission processed without duplication     |