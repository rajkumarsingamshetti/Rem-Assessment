# 🐞 Bug Report

| Bug ID | Title | Steps to Reproduce | Expected Result | Actual Result | Severity | Screenshot |
|--------|------|--------------------|-----------------|---------------|----------|------------|
| BUG-ST-01 | Incorrect state transition on Return | Open site<br>Click Get Quote<br>Select Domestic<br>Complete Step 1<br>Click Return | Navigate to “Choose Skip Type” | Navigates to home page | High | <a href="./screenshots/State%20Trasition%20Bug.jpg"><img src="./screenshots/State%20Trasition%20Bug.jpg" width="120"/></a> |
| BUG01 | Multiple skip sizes selectable | Go to Domestic<br>Select multiple skip sizes | Only one selectable | Multiple selectable | High | <a href="./screenshots/BUG-01.jpg"><img src="./screenshots/BUG-01.jpg" width="120"/></a> |
| BUG02 | Multiple placement selectable | Select both options<br>Proceed | Only one selectable | Both selectable | High | <a href="./screenshots/Bug-02.png"><img src="./screenshots/Bug-02.png" width="120"/></a> |
| BUG03 | Multiple waste types selectable | Select multiple types<br>Proceed | Only one selectable | Multiple selectable | High | <a href="./screenshots/BUG-03.png"><img src="./screenshots/BUG-03.png" width="120"/></a> |
| BUG04 | Future date validation missing | Select date >10 years<br>Click Next | Restrict future dates | User proceeds | High | <a href="./screenshots/Bug-04.jpg"><img src="./screenshots/Bug-04.jpg" width="120"/></a> |
| BUG05 | Past date allowed | Select past date<br>Click Next | Block past dates | Accepted | High | <a href="./screenshots/BUG-05.jpg"><img src="./screenshots/BUG-05.jpg" width="120"/></a> |
| BUG06 | Name validation missing | Enter 1 or >50 chars<br>Submit | Enforce limits | Accepted | High | <a href="./screenshots/BUG-06.png"><img src="./screenshots/BUG-06.png" width="120"/></a> |
| BUG07 | Invalid email accepted | Enter invalid email<br>Submit | Validate format | Accepted | High | <a href="./screenshots/BUG-07.png"><img src="./screenshots/BUG-07.png" width="120"/></a> |
| BUG08 | Invalid postcode accepted | Enter invalid postcode<br>Submit | Validate format | Accepted | High | <a href="./screenshots/BUG-08.jpg"><img src="./screenshots/BUG-08.jpg" width="120"/></a> |
| BUG09 | Invalid phone accepted | Enter letters<br>Submit | Only numbers allowed | Accepted | High | <a href="./screenshots/BUG-09.jpg"><img src="./screenshots/BUG-09.jpg" width="120"/></a> |
| BUG10 | Form submits invalid data | Enter invalid data<br>Click Get Quote | Block submission | Form submits | Critical | <a href="./screenshots/BUG-10.jpg"><img src="./screenshots/BUG-10.jpg" width="120"/></a> |