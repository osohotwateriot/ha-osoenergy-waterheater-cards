# OSO Energy Water Heater cards

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

This is a custom set of cards created specifically for the OSO Energy integration in Home Assistant.
It aims to provide the user with an easy way to use the OSO Energy custom actions/services over a water heater.

## Water Heater Info Card

![Info card](https://user-images.githubusercontent.com/102795312/168007735-58883ad3-d9dc-40df-8ee8-65e13a4b55a4.PNG)

The purpose of the Info Card is to provide the following functionality:

- View state of the heater
- View quantity of mixed water at 40°C
- View optimization mode for the heater
- View status for Vacation mode
- View and modify the minimum quantity of mixed water at 40°C
- Turn on/off heater with the full utilization option
  - With full utilization on the heater will be turned on/off until the maximum/minimum energy of that heater is reached
  - With full utilization off the heater will be turned on/off for one hour or until the maximum/minimum energy of that heater is reached

## Water Heater Temperature Profile Card

![Profile](https://user-images.githubusercontent.com/102795312/168003607-2592cffc-8c14-41f7-b960-0c6d78dea24a.PNG)

The purpose of the Temperature Profile card is to provide a way to control the 24 hour profile for the heater target temperatures.
