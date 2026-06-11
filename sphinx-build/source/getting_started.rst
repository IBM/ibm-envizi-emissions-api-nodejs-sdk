===============
Getting Started
===============

Prerequisites
-------------

Before using the SDK, ensure you have:

- **Node.js** installed
- Active internet connection
- An IBMid account. Sign up at the `IBMid sign up <https://www.ibm.com/account/reg/us-en/signup?formid=urx-54311>`_ page.
- Access to the Emissions API service and the required credentials
- Read the `Introduction <https://developer.ibm.com/apis/catalog/ghgemissions--ibm-envizi-emissions-api/Introduction>`_ page for an overview of the Emissions API


Installation
------------

You can install the SDK using `npm <https://www.npmjs.com/package/emissions-api-sdk>`_ or `yarn <https://yarnpkg.com/package?q=emissions-api-sdk&name=emissions-api-sdk>`_:

Using npm:

.. code-block:: bash

  npm install emissions-api-sdk


Using yarn:

.. code-block:: bash

  yarn install emissions-api-sdk


Basic Import
~~~~~~~~~~~~

After installation, you can import the SDK in your project:

.. code-block:: javascript

  // Import the entire SDK
  const enviziSDK = require('emissions-api-sdk');
  
  // Or using ES modules
  import { Client, LocationEmission } from 'emissions-api-sdk';


Authentication
--------------

The SDK supports three authentication methods:

- **Personal Access Token (PAT)**, recommended for most users
- **API key**, where the SDK retrieves and refreshes a bearer token
- **Pre-generated JWT token**, managed outside the SDK

Using Personal Access Token (PAT)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    patToken: process.env.ENVIZI_PAT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

.. note::

   When using a PAT token, do not provide ``orgId``.

Using API Key
~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    apiKey: process.env.ENVIZI_API_KEY,
    clientId: process.env.ENVIZI_CLIENT_ID,
    orgId: process.env.ENVIZI_ORG_ID
  });

Using Pre-generated JWT Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  await Client.getClient({
    token: process.env.JWT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

First API Call
--------------

After initializing the client, you can make your first API call. Here's a quick start example of calculating location-based emissions:

.. code-block:: javascript

  import { Client, Location } from 'emissions-api-sdk';

  await Client.getClient({
    patToken: process.env.ENVIZI_PAT_TOKEN,
    clientId: process.env.ENVIZI_CLIENT_ID
  });

  const result = await Location.calculate({
    "location": {
      "country": "USA",
      "stateProvince": "california"
    },
    "activity": {
      "type": "electricity",
      "value": 1,
      "unit": "kWh"
    }
  });

Example Response
----------------

The API returns emission calculation results in JSON format. Here's an example response:

.. code-block:: json

    {
      "transactionId": "95a7efe7-02ae-47a3-a7fd-831bfca7cecd",
      "totalCO2e": 0.20750174,
      "CO2": 0.20681091,
      "CH4": 0.00033022,
      "N2O": 0.00036061,
      "indirectCO2e": 0.01115131,
      "unit": "kgCO2e",
      "description": "The electricity emissions factor used to calculate this result was obtained from the  year 2022 Managed - eGRID & US Climate Leaders factor set for the area United States and the region California."
    }

Example Response with Details
------------------------------

When you need more detailed information about the emission factors used in calculations, you can request the response to include the ``details`` object. This provides comprehensive information about the factor set and specific factor used:

.. code-block:: json

    {
      "transactionId": "29df5ecd-fc3b-4797-b6fd-da03bc007f30",
      "totalCO2e": 5912000,
      "CO2": 5840000,
      "CH4": 2000.0000000000002,
      "N2O": 70000,
      "indirectCO2e": 1340000,
      "unit": "kgCO2e",
      "description": "The Freight - Cargo Ship - Bulk Carrier - 0-9999 dwt emissions factor used to calculate this result was obtained from the DEFRA factor set for the Global region year 2025.",
      "details": {
        "factorSet": {
          "name": "DEFRA",
          "description": "The UK Government and DEFRA publish GHG emission factors covering Scope 1, Scope 2, and selected Scope 3 sources. While primarily intended for UK-based reporting, many organizations apply these factors across European sites—especially for air travel-related emissions.",
          "provider": "His Majesty's Government (United Kingdom of Great Britain and Northern Ireland): Department for Energy Security and Net Zero",
          "sourceUrl": "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024"
        },
        "factor": {
          "name": "Bulk carrier - 0–9999 dwt - 2025",
          "description": "Cargo ship - tonne.km",
          "totalCO2e": 0.02956,
          "CO2": 0.0292,
          "CH4": 0.00001,
          "N2O": 0.00035,
          "indirectCO2e": 0.0067,
          "inputUnit": "t-km",
          "unit": "tonne.km",
          "conversionRatio": "1:1",
          "activityType": "Freight - Cargo Ship - Bulk Carrier - 0-9999 dwt",
          "activitySubtype": "Default Factor",
          "factorId": 190405,
          "methodology": "activity-based",
          "scopes": [
            "3.4",
            "3.9"
          ],
          "areaName": "Earth",
          "areaType": "Planet",
          "publishedFrom": "2025-01-01",
          "source": "2025 Greenhouse Gas Reporting: Conversion Factors 2025 (DEFRA) provided by gov.uk, license - https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
        }
      }
    }

Response Structure Details
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The response includes the following key components:

**Top-level Fields:**

- ``transactionId``: Unique identifier for the calculation
- ``totalCO2e``: Total CO2 equivalent emissions
- ``CO2``: Carbon dioxide emissions
- ``CH4``: Methane emissions
- ``N2O``: Nitrous oxide emissions
- ``indirectCO2e``: Indirect CO2 equivalent emissions
- ``unit``: Unit of measurement (typically kgCO2e)
- ``description``: Human-readable description of the calculation

**Details Object (when requested):**

The ``details`` object provides comprehensive information about the emission factors:

*Factor Set Information:*

- ``name``: Name of the factor set (e.g., DEFRA, EPA)
- ``description``: Detailed description of the factor set
- ``provider``: Organization that provides the factor set
- ``sourceUrl``: URL to the source documentation

*Factor Information:*

- ``name``: Specific name of the emission factor
- ``description``: Description of the factor
- ``totalCO2e``, ``CO2``, ``CH4``, ``N2O``, ``indirectCO2e``: Emission values per unit
- ``inputUnit``: Unit for input values
- ``unit``: Unit of the factor
- ``conversionRatio``: Conversion ratio applied
- ``activityType``: Type of activity (e.g., transportation, energy)
- ``activitySubtype``: Subtype classification
- ``factorId``: Unique identifier for the factor
- ``methodology``: Calculation methodology used
- ``scopes``: Applicable GHG Protocol scopes
- ``areaName``: Geographic area name
- ``areaType``: Type of geographic area
- ``publishedFrom``: Date from which the factor is valid
- ``source``: Source citation and license information
