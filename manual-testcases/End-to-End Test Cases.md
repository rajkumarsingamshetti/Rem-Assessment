 #End-to-End Test Cases 


| Test Case ID | Scenario                                   | Steps                                                                                                      | Expected Result                                  |
|--------------|--------------------------------------------|------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| E2E01        | Complete Domestic flow with valid data     | 1. Open site 2. Click Get Quote 3. Select Domestic 4. Fill Step 1 5. Click Next 6. Fill Step 2 7. Submit   | Quote submitted and confirmation displayed       |
| E2E02        | Validate data persistence across steps     | 1. Complete Step 1 2. Go to Step 2 3. Click Back 4. Return to Step 2                                       | All previously entered data should be retained   |
| E2E03        | End-to-end validation handling             | 1. Start flow 2. Leave fields empty 3. Click Next 4. Fix errors 5. Complete flow 6. Submit                | Validation shown first, then successful submit   |
| E2E04        | Prevent duplicate submissions              | 1. Complete full flow 2. Click Get Quote multiple times quickly                                           | Only one submission processed                    |
| E2E05        | Full flow with page refresh in between     | 1. Complete Step 1 2. Go to Step 2 3. Refresh page 4. Refill or continue 5. Submit                        | Flow should recover gracefully and submit        |++