import { Client } from "../Client";
import { PHYSICAL_ACTIVITY_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";

/**
 * Performs scope 3 Physical activity emission calculations by making a POST request to the physical activity API endpoint.
 * Supports attribution for private companies using equity/debt based calculations or EVIC (Enterprise Value Including Cash).
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Basic physical activity request
 * const request = {
    "time": {
      "date": "2025-01-23"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "commercial real estate",
      "value": 0.1,
      "unit": "km2"
    },
    "includeDetails": true
  };
 * const result = await calculate(request);
 *
 * @example
 * // Physical activity request with attribution (equity/debt based for private companies)
 * const requestWithEquityDebt = {
    "time": {
      "date": "2025-01-23"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "commercial real estate",
      "value": 0.1,
      "unit": "km2"
    },
    "attribution": {
      "outstandingAmount": 1000000,
      "totalEquity": 3000000,
      "totalDebt": 2000000
    },
    "includeDetails": true
  };
 * const resultWithEquityDebt = await calculate(requestWithEquityDebt);
 *
 * @example
 * // Physical activity request with attribution (EVIC based)
 * const requestWithEVIC = {
    "time": {
      "date": "2025-01-23"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "commercial real estate",
      "value": 0.1,
      "unit": "km2"
    },
    "attribution": {
      "outstandingAmount": 1000000.0,
      "evic": 10000000.0
    },
    "includeDetails": true
  };
 * const resultWithEVIC = await calculate(requestWithEVIC);
 */

export async function calculate(
  payload: CommonRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url =  client.getDomain() + PHYSICAL_ACTIVITY_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}
